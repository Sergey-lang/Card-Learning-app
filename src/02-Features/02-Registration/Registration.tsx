import React, {ChangeEvent, useCallback, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {registrationTC} from './registration-reducer';
import {path} from '../../00-App/Routes/Routes';
import stylesContainer from '../../assets/css/container.module.css';
import {InputText} from '../../03-Components/InputText/InputText';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';

import s from '../01-Login/Login.module.css';
import {CheckBox} from '../../03-Components/Checkbox/CheckBox';
import {appSelectors} from '../../00-App/00-index';

export const Registration: React.FC = React.memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isRedirectProfile = useSelector<AppStoreType, boolean>(state => state.registration.isRedirect)
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)
    const onChangeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [])
    const onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [])

    const dispatch = useDispatch()
    const onClickHandler = () => (dispatch(registrationTC({email, password})))

    if (isRedirectProfile) {
        return <Redirect to={path.LOGIN}/>
    }

    return (
        <div className={stylesContainer.container}>
            <h4>CREATE A NEW ACCOUNT</h4>
            <div className={stylesContainer.inner}>
                <InputText type={'text'}
                           value={email}
                           onChange={onChangeHandlerEmail}
                           placeholder={'Email'}/>
                <InputText type={'password'}
                           value={password}
                           onChange={onChangeHandlerPassword}
                           placeholder={'Password'}/>
                <CheckBox>I agree to the Terms of Service and Privacy Policy</CheckBox>
                <UniversalButton onClick={onClickHandler}
                                 disabled={appStatus === 'loading'}> SIGN UP </UniversalButton>
                <hr/>
                <p>Already registered? <NavLink to={path.LOGIN}
                                                activeClassName={stylesContainer.activeLink}
                                                className={s.inactive}>Sign in to your account.</NavLink></p>
            </div>
        </div>
    )
})
