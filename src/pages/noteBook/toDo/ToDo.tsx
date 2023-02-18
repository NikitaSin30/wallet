import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputTask } from 'features/addTasks/InputTask';
import { ToDoStore } from 'shared/store/ToDoStore';
import { ToDoItem } from '../../../widgets/todoItem/TodoItem';
import { Link } from 'react-router-dom';
import ErrorModal from 'widgets/modals/ErrorModal';
import Modal from 'widgets/modals/Modal';


export const ToDo = observer(()=>{
    const [isModalActive, setIsModalActive] = React.useState<boolean>(false);
    const [err, setErr] = React.useState<boolean>(false);

    function onSwitchModal(): void {
        onChangeActive();
        onChangeErr();
    }

    function onChangeActive() {
        setIsModalActive((prev) => !prev);
    }
    function onChangeErr() {
        setErr((prev) => !prev);
    }


    const ContentModal = () => {
        return err ? (
            <ErrorModal onSwitchModal={onSwitchModal}>
                <h2 className="text-xl font-bold text-center">
              Категрии должны быть уникальны <br /> Попробуйте ещё раз
                </h2>
            </ErrorModal>
        ) : null;
    };

    return (
        <div className=" flex-1 flex-col px-3 text-black bg-gray-100   rounded-md w-full shadow-lg">
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
                    {ToDoStore.tasks.length > 0 && (
                        <button
                            onClick={() => ToDoStore.removeAllTasks()}
                            className=" text-orange-800 font-semibold text-sm
                border-solid border-slate-900 border-2 py-1 px-2 rounded-lg mb-2 hover:text-red-900 hover:bg-slate-800"
                        >
                Очистить список
                        </button>
                    )}
                </div>
                <div className="flex flex-col h-full gap-2">
                    {ToDoStore.tasks.map((item) => {
                        return <ToDoItem key={item.id} task={item.task} isDone={item.isDone} id={item.id} />;
                    })}
                </div>
                <InputTask isActive={isModalActive} onChangeErr={onChangeErr} onChangeIsModalActive={onChangeActive}></InputTask>
            </div>
            <Modal isActive={isModalActive} onSwitchModal={onSwitchModal}>
                <ContentModal />
            </Modal>
        </div>
    );
});
