import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
    FilterOptions,
    FilterSettings,
    TodoItem,
    TodoService,
} from './todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    elements!: TodoItem[];
    constructor(private todoService: TodoService) {}
    ngOnInit() {
        this.todoService.filters$
            .pipe(
                switchMap((filters: FilterSettings) => {
                    return this.todoService.todoItems$.pipe(
                        map((items: TodoItem[]) => {
                            return items.filter((item: TodoItem) => {
                                if (filters.filterType === FilterOptions.ALL) {
                                    return item;
                                }
                                if (
                                    filters.filterType === FilterOptions.TITLE
                                ) {
                                    return item.title.includes(
                                        filters.filterValue!
                                    );
                                }
                                if (
                                    filters.filterType ===
                                    FilterOptions.HIDE_DONE
                                ) {
                                    return !item.isDone;
                                }
                                return;
                            });
                        })
                    );
                })
            )
            .subscribe((res) => {
                this.elements = res;
                console.log(res);
            });
    }
}
