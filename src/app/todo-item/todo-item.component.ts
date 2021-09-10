import { Component, Input, OnInit } from '@angular/core';
import {
    NgbModal,
    NgbModalOptions,
    NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { TodoItem, TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
    @Input() element!: TodoItem;
    @Input() id!: number;
    @Input() itemIsDone!: boolean;
    modalRef!: NgbModal;

    model = {
        left: false,
        middle: false,
        right: true,
    };
    constructor(
        private todoService: TodoService,
        private modalService: NgbModal
    ) {}

    deleteItem(id: number): void {
        this.todoService.deleteTodoItem(id);
    }
    editItem(id: number): void {
        console.log(id);
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.id = id; //passing id of element to modal window
    }
    setAsDone(): void {
        this.itemIsDone = this.element.isDone;
        this.todoService.changeItemStatus(this.id);
    }
}
