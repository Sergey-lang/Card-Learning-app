import {applyMiddleware, combineReducers, createStore} from 'redux';
import {authReducer} from '../02-Pages/01-Login/auth-reducer';
import {registrationReducer} from '../02-Pages/02-Registration/registration-reducer';
import {appReducer} from './app-reducer';
import {cardPacksReducer} from '../02-Pages/05-CardPacks/cardPacks-reducer';
import {cardsReducer} from '../02-Pages/06-Cards/cards-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    app: appReducer,
    cardsPack: cardPacksReducer,
    cards: cardsReducer,
})

export type AppStoreType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
