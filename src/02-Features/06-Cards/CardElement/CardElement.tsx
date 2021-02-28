import React, {useState} from 'react';
import {CardType} from '../cards-reducer';
import Button from '../../../03-Components/Button/Button';
import {useSelector} from 'react-redux';

import s from './CardElement.module.css'
import {AppStoreType} from '../../../00-App/store';
import {ModalForDelete} from '../../../03-Components/Modal/ModalForCards/ModalForDelete';
import {ModalForUpdateCard} from '../../../03-Components/Modal/ModalForCards/ModalForUpdateCard';
import {authSelectors} from '../../01-Login/00-index';

type CardPropsType = {
    card: CardType
    updateCard: (card: CardType) => void
    removeCard: (id: string) => void
}

export const CardElement: React.FC<CardPropsType> = React.memo((
    {
        card,
        updateCard,
        removeCard
    }) => {

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [questionCard, setQuestionCard] = useState<string>('')
    const [answerCard, setAnswerCard] = useState<string>('')

    //for disabled
    const userId = useSelector<AppStoreType, string | undefined>(authSelectors.selectorUserId)

    //for delete
    const deleteModalHandlerYes = () => {
        removeCard(card._id)
    }

    //for update
    const updateModalHandler = () => {
        updateCard({
            _id: card._id,
            type: 'Java',
            question: questionCard,
            answer: answerCard,
            cardsPack_id: card.cardsPack_id,
            grade: 4.54654,
            rating: 0
        })
        setActiveModalUpdate(false)
    }

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }

    const onRemoveHandler = () => {
        setActiveModalDelete(true)
    }

    return (
        <div className={s.card}>
            <h5>{card.question ? card.question : 'empty question'}</h5>
            <p>{card.answer ? card.answer : 'empty answer'}</p>
            <p>type of card: {card.type ? card.type : 'empty type'} </p>
            <p>grade: </p>
            <p>{card.grade}</p>
            <Button onClick={onUpdateHandler} disabled={card.user_id !== userId}>Update</Button>
            <Button onClick={onRemoveHandler} disabled={card.user_id !== userId}>Delete</Button>

            <ModalForDelete active={activeModalDelete}
                            setActive={setActiveModalDelete}
                            deleteModalHandlerYes={deleteModalHandlerYes}/>

            <ModalForUpdateCard active={activeModalUpdate}
                                setActive={setActiveModalUpdate}
                                setQuestionCard={setQuestionCard}
                                setAnswerCard={setAnswerCard}
                                updateModalHandler={updateModalHandler}/>
        </div>
    )
})
