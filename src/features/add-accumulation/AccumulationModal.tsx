import React from 'react';
import { useForm } from 'react-hook-form';
import { CashFlowStore } from 'shared/store/CashFlowStore';
import { IFormAccumulation } from './interfaces/interfaces';
import { Input } from 'widgets/inputs/Input';
import { Button } from 'widgets/modals/ui/button/Button';
import { CloseIcon } from 'widgets/modals/assets/CloseIcon';
import { IModal } from 'widgets/modals/interfaces/interfaces';



function AccumulationModal(props: IModal): React.ReactElement {
    const { switchShowModal, switchShowModalErr, isModalActive } = props;
    const styleModal = isModalActive ? 'w-full  h-full bg-opacity-20 bg-black  fixed top-0 left-0 flex items-center justify-center ' : 'hidden';

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormAccumulation>({ mode: 'onBlur' });

    function setNewIncome(data: IFormAccumulation) {
        const { accumulation } = data;

        checkHasMoneyForAccumulation(accumulation);
    }

    function checkHasMoneyForAccumulation(sum : number) {
        if (CashFlowStore.moneyAccount < sum) return showModalError();

        addAccumulation(sum);
    }

    function showModalError() {
        switchShowModal();
        switchShowModalErr!();
        reset();
    }

    function addAccumulation(sum:number) {
        CashFlowStore.setAccumulation(sum);
        reset();
        switchShowModal();
    }

    return (
        <>
            <div className={styleModal} onClick={switchShowModal}>
                <form
                    className="flex flex-1 w-100 gap-1 flex-col  bg text-white bg-slate-900 py-6 px-8 rounded-md shadow-lg md:w-1/2"
                    onSubmit={handleSubmit(setNewIncome)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end">
                        <button onClick={switchShowModal} className="rounded-full w-6 h-6 overflow-hidden hover:scale-110">
                            {CloseIcon}
                        </button>
                    </div>
                    <span className="text-xl font-bold text-center">Сколько хотите отложить ?</span>
                    <div className="flex justify-between">
                        <span>Cуммa </span> {errors?.accumulation && <span className="text-red-700">{errors?.accumulation?.message || 'Errors'}</span>}
                    </div>
                    <Input type="number" labelTitle="accumulation" register={register} />
                    <Button isValid={isValid} title="Добаавить " />
                </form>
            </div>
        </>
    );
}

export default AccumulationModal;
