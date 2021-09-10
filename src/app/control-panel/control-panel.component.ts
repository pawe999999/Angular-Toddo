import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { concatMap, filter, map, toArray } from 'rxjs/operators';
import { FilterOptions, TodoItem, TodoService } from '../todo.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
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
            id: Math.floor(Math.random() * (100000 - 0 + 1) + 0),
        };
        this.todoService.addTodoItem(this.data);
    }

    onFilterDoneItems(): void {
        this.todoService.updateFilters({ filterType: FilterOptions.HIDE_DONE });
    }
    onShowAll(): void {
        this.todoService.updateFilters({ filterType: FilterOptions.ALL });
    }
    onFilterTitle(title: string): void {
        this.todoService.updateFilters({
            filterType: FilterOptions.TITLE,
            filterValue: title,
        });
    }
    onSortItems(): void {
        this.todoService.todoItems.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        this.todoService.render();
    }
}
