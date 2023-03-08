import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { CategoriesStore } from 'shared/store/categoriesStore/CategoriesStore';
import { IFormCategorie } from './interfaces/interfaces';
import { Button } from 'widgets/modals/ui/button/Button';
import { Input } from 'widgets/inputs/Input';
import { CloseIcon } from 'widgets/modals/assets/CloseIcon';
import { IModal } from 'widgets/modals/interfaces/interfaces';



const FormModalCategories = (props: IModal) => {
    const { switchShowModal, switchShowModalErr, isModalActive } = props;
    const styleModal = isModalActive ? 'w-full  h-full bg-opacity-20 bg-black  fixed top-0 left-0 flex items-center justify-center ' : 'hidden';
    const { categories } = CategoriesStore;
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormCategorie>({ mode: 'onBlur' });

    function setNewCategorie({ categorie }: IFormCategorie): void {
        const validatedCategorie = categorie.trim().toLowerCase();
        const newCategorie = validatedCategorie[0].toUpperCase() + validatedCategorie.slice(1);

        checkUniqueNewCategorie(newCategorie);
    }

    function checkUniqueNewCategorie(categorie: string): void | Function {
        const isHasCategorie = categories.some((i) => i.categorie === categorie);

        if (isHasCategorie) return showModalError();

        const newCategorie = {
            categorie  : categorie,
            spentMoney : 0,
            id         : categorie,
        };

        CategoriesStore.setCatigorie(newCategorie);
        switchShowModal();
        reset();
    }

    function showModalError(): void {
        switchShowModal();
    switchShowModalErr!();
    reset();
    }
    function onСloseModal(e: SyntheticEvent) {
        e.stopPropagation();
        switchShowModal();
    }

    return (
        <>
            <div className={styleModal} onClick={switchShowModal}>
                <div className="flex flex-1 w-full gap-1 flex-col  bg text-white bg-slate-900  rounded-md shadow-lg md:w-1/2 p-1">
                    <button onClick={(e) => onСloseModal(e)} className="rounded-full w-6 h-6 self-end overflow-hidden hover:scale-110">
                        {CloseIcon}
                    </button>
                    <form className="flex flex-1 w-100 gap-1 flex-col  bg text-white"
                        onSubmit={handleSubmit(setNewCategorie)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-xl font-bold text-center">Новая категория</span>
                        <div className="flex justify-between">
                            <span>Введите категорию</span> {errors?.categorie && <span className="text-red-700">{errors?.categorie?.message || 'Errors'}</span>}
                        </div>
                        <Input type="text" register={register} labelTitle="categorie" />
                        <Button isValid={isValid} title="Создать" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormModalCategories;
