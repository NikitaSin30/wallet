import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputTask } from 'features/addTasks/InputTask';
import { ToDoStore } from 'shared/store/toDoStore/ToDoStore';
import { TodoList } from 'widgets/todo/todoList/TodoList';
import { Link } from 'react-router-dom';
import ErrorModal from 'widgets/modals/ErrorModal';
import { GlobalContext } from 'shared/context/context';
import { Context } from 'shared/context/context';
import { Navigate } from 'react-router-dom';
import { ETitleModalErr } from 'shared/enums/enums';



export const ToDo = observer(()=>{
    const { isLogin } = React.useContext<GlobalContext>(Context);

    if (!isLogin) return <Navigate to="/login" />;

    const [isErrModalActive, setIsErrModalActive] = React.useState<boolean>(false);

    const { tasks } = ToDoStore;
    const isHasTask = tasks.length > 0;
    const { uniqueCategorie } = ETitleModalErr;


    function switchShowModalErr() {
        setIsErrModalActive((isErrModalActive) => !isErrModalActive);
    }

    return (
        <div className=" flex flex-1 flex-col px-3 text-black bg-card   rounded-md w-full shadow-lg">
            <div className="flex-1 flex flex-col h-full w-full ">
                <h2 className="flex self-center mb-2 text-lg font-semibold">Список дел</h2>
                <div className="flex justify-between items-center">
                    <Link
                        to="/notebook/shoplist"
                        className="text-orange-800 font-semibold text-sm
                border-solid border-slate-900 border-2 py-1 px-2 rounded-lg mb-2 hover:text-green-900 hover:bg-slate-800"
                    >
              ShopList
                    </Link>
                    {isHasTask && (
                        <button
                            onClick={() => ToDoStore.removeAllTasks()}
                            className=" text-orange-800 font-semibold text-sm
                border-solid border-slate-900 border-2 py-1 px-2 rounded-lg mb-2 hover:text-red-900 hover:bg-slate-800"
                        >
                Очистить список
                        </button>
                    )}
                </div>
                <TodoList />
                <InputTask switchShowModalErr={switchShowModalErr} />
            </div>
            {isErrModalActive && <ErrorModal title={uniqueCategorie} switchShowModalErr={switchShowModalErr} />}
        </div>
    );
});
