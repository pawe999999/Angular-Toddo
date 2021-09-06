import { Subject } from 'rxjs';

export class TodoService {
    modalOpen = new Subject<any>();
    itemAdded = new Subject<any>();
    //test elements
    elements = [
        { title: 'test', start: '1', end: '2', timeStamp: 1 },
        { title: 'test', start: '1', end: '2', timeStamp: 1 },
    ];

    addTodoItem(data: {
        title: string;
        start: string;
        end: string;
        timeStamp: number;
    }) {
        this.elements.push(data);
        this.itemAdded.next(this.elements.slice());
    }
    deleteTodoItem(id: number) {
        this.elements.splice(id, 1);
        this.itemAdded.next(this.elements.slice());
    }
    openModal(id: any) {
        console.log(id);
        this.modalOpen.next(id);
    }
    getElements() {
        return this.elements.slice();
    }
}
