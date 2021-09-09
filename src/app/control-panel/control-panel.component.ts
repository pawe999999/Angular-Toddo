import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem, TodoService } from '../todo.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
    @Output() hiddeItems: EventEmitter<any> = new EventEmitter();
    todoItemForm!: FormGroup;
    data!: TodoItem;
    timeStamp!: number;
    start!: string;
    end!: string;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.todoItemForm = new FormGroup({
            title: new FormControl('', [
                Validators.required,
                Validators.pattern('[a-zA-Z ]*'),
            ]),
        });
    }

    addItem(): void {
        if (!this.todoItemForm.valid) {
            throw new Error('Error');
        }
        this.timeStamp = Date.now();
        this.start = new Date(this.timeStamp).toLocaleString();
        this.end = new Date(this.timeStamp + 86400000).toLocaleString();

        this.data = {
            title: this.todoItemForm.value.title!,
            start: this.start,
            end: this.end,
            timeStamp: this.timeStamp,
            isDone: false,
        };
        this.todoService.addTodoItem(this.data);
    }

    onFilterDoneItems() {
        this.hiddeItems.emit(this.todoService.todoItems);
    }
    onShowAll() {
        this.todoService.showAll();
    }
}
