import { BehaviorSubject, Observable } from 'rxjs';

export class TodoService {
    private todoItemsStream = new BehaviorSubject<TodoItem[]>([
        { title: 'test', start: '1', end: '2', timeStamp: 1, isDone: false },
        { title: 'test', start: '1', end: '2', timeStamp: 1, isDone: false },
    ]);

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
            this.todoItems.filter((_: TodoItem, i: number) => index !== i)
        );
    }
    changeItemStatus(id: number): void {
        this.todoItems[id].isDone = !this.todoItems[id].isDone;
        this.todoItemsStream.next([...this.todoItems]);
    }
    filterDoneItems(): void {
        this.todoItemsStream.next(this.todoItems);
    }
    showAll() {
        this.todoItemsStream.next([...this.todoItems]);
    }
}

export interface TodoItem {
    title: string;
    start: string;
    end: string;
    timeStamp: number;
    isDone: boolean;
}
