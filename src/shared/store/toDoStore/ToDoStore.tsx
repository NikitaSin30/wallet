import { action, makeObservable, observable } from 'mobx';
import { ITodo, ITask } from './interfaces/interfaces';


class ToDo implements ITodo {
    tasks = [
        {
            task   : '',
            isDone : false,
            id     : '',
        },
    ];
    constructor() {
        this.tasks = [];
        makeObservable(this, {
            tasks                : observable,
            addTask              : action,
            onCheckUnique        : action,
            toggleStatusByIdTask : action,
            removeTask           : action,
            removeAllTasks       : action,
        });
    }
    addTask(task: ITask): void {
        this.tasks.push(task);
    }

    removeTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
    removeAllTasks(): void {
        this.tasks = [];
    }

    onCheckUnique(task: string): boolean {
        return this.tasks.some((i) => i.task === task);
    }

    toggleStatusByIdTask(id: string): void {
        this.tasks.map((i) => {
            if (i.id === id) i.isDone = !i.isDone;

            return i;
        });
    }
}

export const ToDoStore = new ToDo();
