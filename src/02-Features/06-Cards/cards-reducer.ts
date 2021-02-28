import {Dispatch} from 'redux';
import {cardsAPI} from '../../01-API/04-cards-api';
import {ThunkDispatch} from 'redux-thunk';
import {AppStoreType} from '../../00-App/store';
import {setAppStatus} from '../../00-App/app-reducer';

type ActionsType = ReturnType<typeof setCards>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setGrade>
    | ReturnType<typeof createCard>

export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots?: number,
    type: string,
    user_id?: string,
    created?: string,
    updated?: string,
    __v?: 0,
    _id: string,
}

export type CardsFilterType = {
    packName: string
    min: number
    max: number
}

const initialState = {
    cards: [] as CardType[],
    page: 1,
    pageCount: 3,
    cardsTotalCount: 5,
    packUserId: '',
    filter: {
        packName: '',
        min: 0,
        max: 15,
    } as CardsFilterType
} as const

export type CardsInitialStateType = typeof initialState

export const cardsReducer = (state: CardsInitialStateType = initialState, actions: ActionsType): CardsInitialStateType => {
    switch (actions.type) {
        case 'CARDS/CARDS/SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'CARDS/CARDS/SET-CARDS':
            return {...state, cards: actions.cards}
        case 'CARDS/CARDS/ADD-CARD':
            return {...state, cards: [actions.newCard, ...state.cards]}
        case 'CARDS/CARDS/SET-GRADE':
            return {
                ...state,
                cards: state.cards.map(
                    (card, i) => card._id === actions.payload.id
                        ? {...card, grade: actions.payload.grade}
                        : card
                )
            }
        default:
            return state
    }
}

export const setCards = (cards: CardType[]) => ({type: 'CARDS/CARDS/SET-CARDS', cards} as const)

export const createCard = (newCard: CardType) => ({type: 'CARDS/CARDS/ADD-CARD', newCard} as const)

export const setFilter = (filter: CardsFilterType) => ({
    type: 'CARDS/CARDS/SET-FILTER', payload: {
        filter
    }
} as const)

export const setGrade = (grade: number, id: string) => ({
    type: 'CARDS/CARDS/SET-GRADE',
    payload: {
        id,
        grade
    }
} as const)


export const getCards = (cardsPackId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await cardsAPI.getCards(cardsPackId)
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(setCards(res.data.cards))
    } catch (e) {
        console.log(e)
    }
}

export const addCard = (card: CardType) => async (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        await cardsAPI.createCard(card)
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(getCards(card.cardsPack_id))
        console.log(card)
    } catch (e) {
        console.log(e)
    }
}

export const updateCard = (card: CardType) => async (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await cardsAPI.updateCard(card)
        await dispatch(setAppStatus({status: 'succeeded', error: null}))
        const packId = res.data.updatedCard.cardsPack_id
        dispatch(getCards(packId))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log(error)
    }
}

export const deleteCard = (id: string) => async (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await cardsAPI.deleteCard(id)
        await dispatch(setAppStatus({status: 'succeeded', error: null}))
        const packId = res.data.deletedCard.cardsPack_id
        dispatch(getCards(packId))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log(error)
    }
}

export const sendGrade = (grade: number, card_id: string) => async (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await cardsAPI.sendGrade(grade, card_id)
        await dispatch(setAppStatus({status: 'succeeded', error: 'Sent'}))
        const cardID = res.data._id
        const newGrade = res.data.grade
        dispatch(setGrade(newGrade, cardID))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'succeeded', error: error}))
    }
}
