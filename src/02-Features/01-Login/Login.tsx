import React, {ChangeEvent, useCallback, useState} from 'react';
import stylesContainer from '../../assets/css/container.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {NavLink, Redirect} from 'react-router-dom';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';
import {path} from '../../00-App/Routes/Routes';
import s from '../01-Login/Login.module.css';
import {InputText} from '../../03-Components/InputText/InputText';
import {CheckBox} from '../../03-Components/Checkbox/CheckBox';
import {appSelectors} from '../../00-App/00-index';
import {selectorIsAuth} from './01-selectors';
import {login} from './auth-reducer';

type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(selectorIsAuth)
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onclickEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    const onclickPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [setPassword])

    const dispatch = useDispatch()
    const onclickHandler = useCallback(() => {
        dispatch(login(email, password, rememberMe))
    }, [email, password, rememberMe, dispatch])

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={stylesContainer.container}>
            <h4>SIGN IN</h4>
            <p>test email: nya-admin@nya.nya</p>
            <p>test password: 1qazxcvBG</p>
            <div className={stylesContainer.inner}>
                <InputText type={'email'}
                           placeholder={'Enter email'}
                           onChange={onclickEmail}/>
                <InputText type={'password'}
                           placeholder={'Password'}
                           onChange={onclickPassword}/>
                <CheckBox onChangeChecked={setRememberMe}>Remember me</CheckBox>
                <UniversalButton disabled={appStatus === 'loading'}
                                 onClick={onclickHandler}> SUBMIT </UniversalButton>
                <hr/>
                <p>Not registered? <NavLink to={path.REG}
                                            activeClassName={stylesContainer.activeLink}
                                            className={s.inactive}>Create an Account.</NavLink></p>
                <p>Forgot password? <NavLink to={path.PASS_REC}
                                             activeClassName={stylesContainer.activeLink}
                                             className={s.inactive}>Click here to recover.</NavLink></p>
            </div>
        </div>
    )
})
