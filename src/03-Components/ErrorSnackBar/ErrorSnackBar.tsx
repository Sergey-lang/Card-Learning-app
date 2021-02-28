import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {setAppStatus} from '../../00-App/app-reducer';

import s from './ErrorSnackBar.module.css'

type ErrorBarPropsType = {
    errorMessage: string
}

const ErrorSnackBar = (props: ErrorBarPropsType) => {

    const dispatch = useDispatch()
    const error = useSelector<AppStoreType, string | null>(state => state.app.appState.error)

    const onClickHandler = () => dispatch(setAppStatus({status: 'idle', error: null}))

    return (
        <div className={error ? `${s.notification}` : `: ${s.closeNotification}`}>
            <div className={s.text}> {props.errorMessage} </div>
            <div className={`${s.close}`}>
                <div className={s.text} onClick={onClickHandler}>X</div>
            </div>
        </div>
    )
}

export default ErrorSnackBar;
