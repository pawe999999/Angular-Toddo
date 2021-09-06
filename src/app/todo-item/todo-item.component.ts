import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
    @Input() element!: {
        title: string;
        start: string;
        end: string;
        timeStamp: number;
    };
    @Input() id!: number;
    constructor(private todoService: TodoService) {}

    ngOnInit(): void {}
    deleteItem(id: number) {
        this.todoService.deleteTodoItem(id);
    }
    editItem(id: any) {
        this.todoService.openModal(id);
    }
}
