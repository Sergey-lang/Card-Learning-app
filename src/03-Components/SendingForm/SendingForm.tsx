import React, {ChangeEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import s from './SendingForm.module.css';
import {UniversalButton} from '../Button/FormButton/UniversalButton';
import {Input} from '../Input/Input';

type PropsType = {
    formName: string
    formDescription?: string
    callback: (value1: string, value2?: string | undefined) => void
    status?: string
    inputPlaceholder?: string
    inputType: string

    buttonName: string
    btnDisabled: boolean

    navLinkPath?: string

    restProps?: any
}

export const SendingForm: React.FC<PropsType> = React.memo((
    {
        formName,
        formDescription,

        callback,
        status,
        inputPlaceholder,

        inputType,
        buttonName,
        btnDisabled,

        navLinkPath,

        ...restProps
    }
) => {

    const [value, setValue] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const buttonOnClick = () => {
        callback(value)
        //clear local state field
        setValue('')
    }

    return (
        <div className={s.formWrapper}>
            <h4>{formName}</h4>
            <div>
                <h3 className={s.title}>{formDescription}</h3>
                {
                    status && <span>{status}</span>
                }
                <div>
                    <div>
                        <Input type={inputType}
                               onEnter={buttonOnClick}
                               value={value}
                               placeholder={inputPlaceholder && inputPlaceholder}
                               onChange={inputHandler}/>
                        <UniversalButton onClick={buttonOnClick}
                                         disabled={btnDisabled}>{buttonName}
                        </UniversalButton>
                        <hr/>
                        <p> Let's <NavLink to={navLinkPath ? navLinkPath : ''}
                                           className={s.inactive}>
                            Sign in </NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    )
})
