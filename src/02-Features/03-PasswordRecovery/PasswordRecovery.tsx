import React, {useEffect} from 'react';
import {AppStoreType} from '../../00-App/store';
import {useDispatch, useSelector} from 'react-redux';
import {SendingForm} from '../../03-Components/SendingForm/SendingForm';
import {sendRecoveryEmail} from './resetPassword-thunks';
import {setAppStatus} from '../../00-App/app-reducer';
import {path} from '../../00-App/Routes/Routes';
import stylesContainer from '../../assets/css/container.module.css';
import {appSelectors} from '../../00-App/00-index';

export const PasswordRecovery: React.FC = React.memo(() => {
    const appStatus = useSelector<AppStoreType, string>(appSelectors.selectorAppStatus)

    const sendEmail = (email: string) => {
        dispatch(sendRecoveryEmail(email))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setAppStatus({status: 'idle', error: null}))
        }
    }, [])

    return (
        <div className={stylesContainer.container}>
            <SendingForm formName={'RECOVERY PASSWORD'}
                         formDescription={`Enter the email address you used to register and we'll send you the instruction`}
                         callback={sendEmail}
                         inputPlaceholder={'enter your email address'}
                         inputType={'email'}
                         buttonName={'Send'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={path.LOGIN}
            />
        </div>
    )
})
