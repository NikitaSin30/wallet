import React from 'react';
import AccumulationModal from 'features/add-accumulation/AccumulationModal';
import ErrorModal from 'widgets/modals/ErrorModal';
import { AccumulationIcon } from 'pages/main/assets/AccumulationIcon';
import { observer } from 'mobx-react-lite';
import { CardItem } from '../CardItem/CardItem';
import { ETitleModalErr } from 'shared/enums/enums';
import { ETitleCard } from 'shared/enums/enums';
import { accumulationStore } from 'shared/store/cashFlowStore/AccumulationStore';


export const AccumulationCard = observer(() => {
    const [isModalActive, setIsModalActive] = React.useState<boolean>(false);
    const [isErrModalActive, setIsErrModalActive] = React.useState<boolean>(false);
    const { accumulation } = accumulationStore;
    const { accumulationCard } = ETitleCard;

    const { accumulationErr } = ETitleModalErr;

    function switchisModalActive() {
        setIsModalActive((IsModalActive) => !IsModalActive);
    }
    function switchShowModalErr() {
        setIsErrModalActive((prev) => !prev);
    }



    return (
        <>
            <CardItem title={accumulationCard} money={accumulation} iconCard={AccumulationIcon} switchShowModal={switchisModalActive} />
            <AccumulationModal isModalActive={isModalActive} switchShowModal={switchisModalActive} switchShowModalErr={switchShowModalErr} />
            {isErrModalActive && <ErrorModal title={accumulationErr} switchShowModalErr={switchShowModalErr} />}
        </>
    );
});
