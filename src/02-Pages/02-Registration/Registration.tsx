import React, {ChangeEvent, useCallback, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {registrationTC} from './registration-reducer';
import {PATH} from '../../00-App/Routes/Routes';
import {Input} from '../../03-Components/Input/Input';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';

import s from '../01-Login/Login.module.scss';
import {CheckBox} from '../../03-Components/Checkbox/CheckBox';
import {appSelectors} from '../../00-App/00-index';
import {authSelectors} from '../01-Login/00-index';

export const Registration: React.FC = React.memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isAuth = useSelector(authSelectors.selectorIsAuth)
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)
    const onChangeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [])
    const onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [])

    const dispatch = useDispatch()
    const onClickHandler = () => (dispatch(registrationTC({email, password})))

    if (isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <>
            <h4>CREATE A NEW ACCOUNT</h4>
            <div>
                <Input type={'text'}
                       value={email}
                       onChange={onChangeHandlerEmail}
                       placeholder={'Email'}/>
                <Input type={'password'}
                       value={password}
                       onChange={onChangeHandlerPassword}
                       placeholder={'Password'}/>
                <CheckBox>I agree to the Terms of Service and Privacy Policy</CheckBox>
                <UniversalButton onClick={onClickHandler}
                                 disabled={appStatus === 'loading'}> SIGN UP </UniversalButton>
                <hr/>
                <p>Already registered? <NavLink to={PATH.LOGIN}
                                                className={s.inactive}>Sign in to your account.</NavLink></p>
            </div>
        </>
    )
})
