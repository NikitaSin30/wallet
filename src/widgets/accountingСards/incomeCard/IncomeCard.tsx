import React from 'react';
import { IncomeIcon } from 'pages/main/assets/IncomeIcon';
import ModalIncome from 'features/add-income/ModalIncome';
import { observer } from 'mobx-react-lite';
import { CardItem } from '../CardItem/CardItem';
import { ETitleCard } from 'shared/enums/enums';
import { incomeStore } from 'shared/store/cashFlowStore/IncomeStore';


export const IncomeCard = observer(() => {

    const [isModalActive, setIsModalActive] = React.useState<boolean>(false);

    function switchModalActive() {
        setIsModalActive((IsModalActive) => !IsModalActive);
    }

    const { incomeCard } = ETitleCard;
    const { income } = incomeStore;


    return (
        <>
            <CardItem switchShowModal={switchModalActive} title={incomeCard} money={income} iconCard={IncomeIcon} />
            <ModalIncome isModalActive={isModalActive} switchShowModal={switchModalActive} />
        </>
    );
});
