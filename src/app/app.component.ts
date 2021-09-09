import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem, TodoService } from './todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    elements$!: Observable<TodoItem[]>;
    constructor(private todoService: TodoService) {}
    ngOnInit() {
        this.elements$ = this.todoService.todoItems$;
    }
}
