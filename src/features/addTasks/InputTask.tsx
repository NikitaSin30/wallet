import { useForm } from 'react-hook-form';
import { ITaskForm } from './interfaces';
import { ToDoStore } from 'shared/store/ToDoStore';


export const InputTask = () =>{

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors,isValid },
    } = useForm<ITaskForm>({ mode: 'onBlur' });

    function onModifyNewUser(data: ITaskForm): void {
        const { task } = data;

        const validaitedTask = task.trim().toLowerCase();
        const newValidaitedTask = validaitedTask[0].toUpperCase() + validaitedTask.slice(1);
        const unique = ToDoStore.onCheckUnique(newValidaitedTask);

        if (!unique) {
            const newTask = {
                task   : newValidaitedTask,
                isDone : false,
                id     : task,
            };

            ToDoStore.setNewTask(newTask);
            reset();
        }
        else {
            reset();
        }

    }

    return (
        <>
            <p className="flex justify-between w-full mt-4">{errors?.task && <h2 className="text-red-700">{errors?.task?.message || 'Errors'}</h2>}</p>

            <form className="flex  flex-1 w-full" onSubmit={handleSubmit(onModifyNewUser)}>
                <label htmlFor="task" className="w-full">
                    <input
                        placeholder="Введите задачу"
                        className=" flex-1 rounded-l-md w-full h-full placeholder-slate-900 text-black font-semibold
                         outline-none border-solid border-slate-900 border-b-4
                     px-2 py-1 focus:shadow-lg shadow-gray-50"
                        type="text"
                        {...register('task', {

                            //  required: "Обязательное Поле",
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
                </label>
                <button
                    disabled={!isValid}
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