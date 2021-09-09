import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
    @Input() id!: number;
    modalForm!: FormGroup;
    modalRef!: any;

    constructor(
        private todoService: TodoService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.modalForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.pattern('[a-zA-Z ]*'),
            ]),
            startDate: new FormControl(null, Validators.required),
            startTime: new FormControl(null, Validators.required),
            endDate: new FormControl(null, Validators.required),
            endTime: new FormControl(null, Validators.required),
        });
    }
    editTodoItem(): void {
        this.todoService.todoItems[this.id] = {
            title: this.modalForm.value.title,
            start: new Date(
                Date.parse(
                    `${this.modalForm.value.startDate} ${this.modalForm.value.startTime}`
                )
            ).toLocaleString(),
            end: new Date(
                Date.parse(
                    `${this.modalForm.value.endDate} ${this.modalForm.value.endTime}`
                )
            ).toLocaleString(),
            timeStamp: Date.now(),
            isDone: false,
        };
        this.modalForm.reset();
        this.closeModal();
    }
    closeModal(): void {
        this.modalService.dismissAll();
    }
}
