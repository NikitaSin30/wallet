import { observer } from 'mobx-react-lite';
import { ToDoItem } from '../todoItem/TodoItem';
import { ToDoStore } from 'shared/store/toDoStore/ToDoStore';



export const TodoList = observer(() => {
    const { tasks } = ToDoStore;

    return (
        <div className="flex flex-1 flex-col h-full gap-2">
            {tasks?.map((item) => {
                return <ToDoItem key={item.id} task={item.task} isDone={item.isDone} id={item.id}
                    onToggleStatus={() => ToDoStore.toggleStatusByIdTask(item.id)} />;
            })}
        </div>
    );
});
