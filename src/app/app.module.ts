import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { TodoService } from './todo.service';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipe.filter';

@NgModule({
    declarations: [
        AppComponent,
        TodoItemComponent,
        ControlPanelComponent,
        ModalComponent,
        FilterPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        NgbModalModule,
        FormsModule,
    ],
    providers: [TodoService],
    bootstrap: [AppComponent],
})
export class AppModule {}
