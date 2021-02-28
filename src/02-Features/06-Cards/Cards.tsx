import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import s from './Cards.module.css'
import {addCard, CardType, deleteCard, getCards, updateCard} from './cards-reducer';
import {Redirect, useParams} from 'react-router-dom';
import {path} from '../../00-App/Routes/Routes';
import {ModalForAddCards} from '../../03-Components/Modal/ModalForCards/ModalForAddCard';
import {CardElement} from './CardElement/CardElement';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';
import {selectorCards} from './01-selectors';
import {authSelectors} from '../01-Login/00-index';

export const Cards: React.FC = React.memo(() => {

    const {id} = useParams<{ id: string }>();
    const cards = useSelector<AppStoreType, CardType[]>(selectorCards)

    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [newQuestionCard, setNewQuestionCard] = useState<string>('')
    const [newAnswerCard, setNewAnswerCard] = useState<string>('')
    const [typeNewCard, setTypeNewCard] = useState<string>('undefined')

    const isAuth = useSelector<AppStoreType, boolean>(authSelectors.selectorIsAuth)


    const onSearch = () => {
        // dispatch(getCards({packName: inputValue, min: range[0], max: range[1]}))
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const cardTestObj: CardType = {
        _id: genID(2),
        type: typeNewCard,
        question: newQuestionCard,
        answer: newAnswerCard,
        cardsPack_id: id,
        grade: 4.54654,
        rating: 0
    }

    const onAddCard = () => {
        setActiveModalAdd(true)
    }

    const changeCard = (card: CardType) => {
        dispatch(updateCard(card))
    }
    const addCardHandler = () => {
        dispatch(addCard(cardTestObj))
        setActiveModalAdd(false)
    }
    const removeCard = (id: string) => {
        dispatch(deleteCard(id))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCards(id))
    }, [])

    if (!isAuth) return <Redirect to={path.LOGIN}/>
    const mappedCards = cards.map((card: CardType) => <CardElement key={card._id}
                                                                   card={card}
                                                                   updateCard={changeCard}
                                                                   removeCard={removeCard}/>)
    return (
        <>
            <div className={s.cardsPage}>
                <div>
                    <h4> AVAILABLE CARDS </h4>
                </div>
                <div className={s.cardsBlock}>
                    {mappedCards}
                </div>
                <div className={s.search}>
                    <UniversalButton onClick={onSearch}>Search</UniversalButton>
                    <UniversalButton onClick={onAddCard}>Add
                        Card</UniversalButton>
                </div>
            </div>
            <ModalForAddCards active={activeModalAdd}
                              setActive={setActiveModalAdd}
                              addCardHandler={addCardHandler}
                              setNewQuestionCard={setNewQuestionCard}
                              setNewAnswerCard={setNewAnswerCard}
                              setTypeNewCard={setTypeNewCard}/>
        </>
    )
})
