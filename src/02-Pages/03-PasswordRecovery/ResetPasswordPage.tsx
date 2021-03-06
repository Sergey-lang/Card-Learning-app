import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {SendingForm} from '../../03-Components/SendingForm/SendingForm';
import {resetPassword} from './resetPassword-thunks';
import {PATH} from '../../00-App/Routes/Routes';
import {appSelectors} from '../../00-App/00-index';
import {AppStoreType} from '../../00-App/store';
import {setAppStatus} from '../../00-App/app-reducer';

const ResetPasswordPage: React.FC = React.memo(() => {
    const {token} = useParams<Record<string, string | undefined>>();
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)
    const tokenName = token ? token : ''

    const resetOldPassword = (password: string) => {
        dispatch(resetPassword(password, tokenName))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setAppStatus({status: 'idle', error: null}))
        }
    }, [])

    return (
        <div>
            <SendingForm formName={'RESET PASSWORD'}
                         formDescription={`Create a new, strong password that you don't use for other websites`}
                         callback={resetOldPassword}
                         inputPlaceholder={'enter your new password'}
                         inputType={'password'}
                         buttonName={'Reset'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={PATH.LOGIN}
            />
        </div>
    )
})

export default ResetPasswordPage
