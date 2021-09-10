import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs/operators';
import {
    FilterOptions,
    FilterSettings,
    TodoItem,
    TodoService,
} from '../todo.service';

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
        this.todoService.editItem(this.modalForm, this.id);
        this.modalForm.reset();
        this.closeModal();
    }
    closeModal(): void {
        this.modalService.dismissAll();
    }
}
