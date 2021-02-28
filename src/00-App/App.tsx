import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './store';
import {Header} from '../02-Features/00-Header/Header';
import Routes from './Routes/Routes';
import ErrorSnackBar from '../03-Components/ErrorSnackBar/ErrorSnackBar';
import {appSelectors} from './00-index';
import {getAuthUserData} from '../02-Features/01-Login/auth-reducer';
import s from '../02-Features/05-CardPacks/CardPacks.module.css';
import Preloader from '../03-Components/Preloader/Preloader';
import './App.css';

export const App: React.FC = () => {
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)
    const finalStyle = appStatus === 'loading' ? `${s.fullOverlay} ${s.activeFullOverlay}` : s.fullOverlay

    const error = useSelector<AppStoreType, string | null>(appSelectors.selectorError)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAuthUserData())
    }, []);

    return (
        <div className='App'>
            <div className={finalStyle}></div>
            <Header/>
            <Routes/>
            {error && <ErrorSnackBar errorMessage={error}/>}
            {appStatus === 'loading' && <Preloader/>}
        </div>
    )
}
