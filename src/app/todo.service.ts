import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
export enum FilterOptions {
    ALL,
    HIDE_DONE,
    TITLE,
}
export interface FilterSettings {
    filterType: FilterOptions;
    filterValue?: string;
}

export class TodoService {
    private todoItemsStream = new BehaviorSubject<TodoItem[]>([
        {
            title: 'test',
            start: '1',
            end: '2',
            timeStamp: 1,
            isDone: true,
            id: Math.floor(Math.random() * (100000 - 0 + 1) + 0),
        },
        {
            title: 'test',
            start: '1',
            end: '2',
            timeStamp: 1,
            isDone: false,
            id: Math.floor(Math.random() * (100000 - 0 + 1) + 0),
        },
    ]);
    private filterStream = new BehaviorSubject<FilterSettings>({
        filterType: FilterOptions.ALL,
    });
    get filters$(): Observable<FilterSettings> {
        return this.filterStream.asObservable();
    }

    get todoItems$(): Observable<TodoItem[]> {
        return this.todoItemsStream.asObservable();
    }
    get todoItems(): TodoItem[] {
        return this.todoItemsStream.getValue();
    }

    addTodoItem(data: TodoItem): void {
        this.todoItemsStream.next([...this.todoItems, data]);
    }

    deleteTodoItem(index: number): void {
        this.todoItemsStream.next(
            this.todoItems.filter((item) => index !== item.id)
        );
    }
    changeItemStatus(id: number): void {
        this.todoItems.map((item) => {
            if (item.id === id) {
                item.isDone = !item.isDone;
            }
        });
        this.todoItemsStream.next([...this.todoItems]);
    }
    updateFilters(filtersSettings: FilterSettings): void {
        this.filterStream.next(filtersSettings);
    }
    editItem(modalForm: FormGroup, id: number): void {
        this.todoItems.map((item) => {
            if (item.id === id) {
                item.title = modalForm.value.title;
                (item.start = new Date(
                    Date.parse(
                        `${modalForm.value.startDate} ${modalForm.value.startTime}`
                    )
                ).toLocaleString()),
                    (item.end = new Date(
                        Date.parse(
                            `${modalForm.value.endDate} ${modalForm.value.endTime}`
                        )
                    ).toLocaleString()),
                    (item.isDone = false);
                (item.timeStamp = Date.now()), (item.id = item.id);
            }
        });
        this.todoItemsStream.next(this.todoItems);
    }
    render(): void {
        this.todoItemsStream.next(this.todoItems);
    }
}

export interface TodoItem {
    title: string;
    start: string;
    end: string;
    timeStamp: number;
    isDone: boolean;
    id: number;
}
