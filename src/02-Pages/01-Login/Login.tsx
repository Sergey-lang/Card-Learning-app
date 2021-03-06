import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {NavLink, Redirect} from 'react-router-dom';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';
import {PATH} from '../../00-App/Routes/Routes';
import s from './Login.module.scss';
import {Input} from '../../03-Components/Input/Input';
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
        <div className={s.login_page}>
            <div className={s.welcome_text}>
                <div className={s.headline}>welocme to</div>
                <div className={s.title}>packs</div>
            </div>
            <div className={s.login}>
                <h1>Account Login</h1>
                <div className={s.test_data}>
                    <p>test email: nya-admin@nya.nya</p>
                    <p>test password: 1qazxcvBG</p>
                </div>
                {/*<div className={s.login_error}>*/}
                {/*    <strong>Error</strong>*/}
                {/*    :Error message this*/}
                {/*</div>*/}
                <div className={s.form_wrapper}>
                    <Input type={'email'}
                           placeholder={'Email Address'}
                           onChange={onclickEmail}/>
                    <Input type={'password'}
                           placeholder={'Password'}
                           onChange={onclickPassword}/>
                    <CheckBox onChangeChecked={setRememberMe} label='Remember me'/>
                    <button disabled={appStatus === 'loading'}
                            className={s.login_btn}
                            onClick={onclickHandler}> Log in
                    </button>
                    <p className={s.forgot_password}><NavLink to={PATH.PASS_REC}
                                                              className={s.inactive}>Lost your password?</NavLink></p>
                    <p className={s.forgot_password}><NavLink to={PATH.REG}
                                                              className={s.inactive}>Create an Account.</NavLink></p>
                </div>
            </div>
        </div>

    )
})
