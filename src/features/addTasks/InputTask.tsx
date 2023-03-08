import { useForm } from 'react-hook-form';
import { ITaskForm , IInputTask } from './interfaces/interfaces';
import { ToDoStore } from 'shared/store/toDoStore/ToDoStore';



export const InputTask = (props:IInputTask) =>{
    const { switchShowModalErr } = props;
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors,isValid },
    } = useForm<ITaskForm>({ mode: 'onBlur' });


    function onModifyNewUser({ task }: ITaskForm): void {

        const validaitedTask = task.trim().toLowerCase();
        const newValidaitedTask = validaitedTask[0].toUpperCase() + validaitedTask.slice(1);

        addTask(newValidaitedTask);
    }

    function addTask(task:string):void {
        const isHasInStore = ToDoStore.onCheckUnique(task);

        if (isHasInStore) return showErrorModal();

        const newTask = {
            task   : task,
            isDone : false,
            id     : task,
        };

        ToDoStore.addTask(newTask);
        reset();
    }

    function showErrorModal() {
        switchShowModalErr();
        reset();
    }

    return (
        <>
            <div className="flex justify-between w-full mt-4">{errors?.task && <span className="text-red-700">{errors?.task?.message || 'Errors'}</span>}</div>
            <form className="flex  w-full" onSubmit={handleSubmit(onModifyNewUser)}>
                <div className="w-full">
                    <input
                        placeholder="Введите задачу"
                        className=" flex-1 rounded-l-md w-full h-full placeholder-slate-900 text-black font-semibold
                         outline-none border-solid border-slate-900 border-b-4
                     px-2 py-1 focus:shadow-lg shadow-gray-50"
                        type="text"
                        {...register('task', {
                            minLength : {
                                value   : 2,
                                message : 'Минимум 2 символа',
                            },
                            pattern : {
                                value   : /[А-Яа-я]{3}/,
                                message : 'Используйте кириллицу',
                            },
                        })}
                    />
                </div>
                <button
                    disabled={!isValid }
                    className="  placeholder-slate-900 px-4 text-white cursor-pointer bg-slate-900 font-semibold py-3
                    rounded-r-md shadow-lg hover:text-green-600"
                    type="submit"
                >
            Создать
                </button>
            </form>
        </>
    );
};
