import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
    modalForm!: FormGroup;
    private modalSub!: Subscription;
    isModalOpen: any;
    id!: number;
    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.modalForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                /*   this.invalidTitleName, */
            ]),
            startDate: new FormControl(null, Validators.required),
            startTime: new FormControl(null, Validators.required),
            endDate: new FormControl(null, Validators.required),
            endTime: new FormControl(null, Validators.required),
        });
        this.modalSub = this.todoService.modalOpen.subscribe((id) => {
            this.id = id;
            this.isModalOpen = !this.isModalOpen;
        });
    }

    editTodoItem() {
        this.todoService.elements[this.id] = {
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
        };
        this.modalForm.reset();
        this.closeModal();
    }

    closeModal() {
        this.modalForm.reset();
        this.isModalOpen = !this.isModalOpen;
    }
    invalidTitleName(control: AbstractControl): any {
        const letters = /^[A-Za-z]+$/;
        console.log(control.value);
        if (control.value.match(letters)) {
            return null;
        }
        return { invalidProjectName: true };
    }
}
