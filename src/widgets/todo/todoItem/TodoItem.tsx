import { DeleteIcon } from 'widgets/todo/assets/DeleteIcon';
import { ToDoStore } from 'shared/store/toDoStore/ToDoStore';
import { ITodoItem } from '../interfaces/interfaces';



export const ToDoItem =  ( props:ITodoItem ) =>{
    const { task, isDone, id, onToggleStatus } = props;

    const completed = isDone ? 'border-green-600' : 'border-red-900';

    return (
        <div className="flex  w-full justify-between items-center border-solid bg-slate-700 rounded-md py-2 px-2  border-2 border-orange-400">
            <h2 className="text-md font-bold px-2">
                {task} {isDone && <span className="text-green-600 font-extrabold underline mx-2">Выполнено</span>}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={onToggleStatus}
                    className={`flex items-center justify-center w-6 h-6 border-solid rounded-full cursor-pointer
                border-4 ${completed}`}
                >
                    {isDone && <div className="bg-green-500 h-2 w-2 rounded-full"></div>}
                </button>
                <button className="cursor-pointer hover:scale-110" onClick={() => ToDoStore.removeTask(id)}>
                    {DeleteIcon}
                </button>
            </div>
        </div>
    );
};
