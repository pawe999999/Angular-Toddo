import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'title';
    elements!: {
        title: string;
        start: string;
        end: string;
        timeStamp: number;
    }[];
    isChange: any;
    constructor(private todoService: TodoService) {}
    ngOnInit() {
        this.elements = this.todoService.getElements();
        this.isChange = this.todoService.itemAdded.subscribe((elements) => {
            this.elements = elements;
        });
    }
}
