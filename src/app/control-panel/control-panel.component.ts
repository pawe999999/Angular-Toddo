import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
    todoItemForm!: FormGroup;
    data: any;
    timeStamp!: number;
    start!: string;
    end!: string;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.todoItemForm = new FormGroup({
            title: new FormControl('', [
                Validators.required,
                this.invalidTitleName,
            ]),
        });
    }

    addItem() {
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
        };
        this.todoService.addTodoItem(this.data);
    }

    invalidTitleName(control: AbstractControl): any {
        const letters = /^[A-Za-z]+$/;
        if (control.value.match(letters)) {
            return null;
        }
        return { invalidProjectName: true };
    }
}
