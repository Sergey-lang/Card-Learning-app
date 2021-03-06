import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react';
import s from './Input.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    placeholder?: string
};

export const Input: React.FC<SuperInputTextPropsType> = React.memo((
    {
        value,
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        placeholder,

        ...restProps
    }
) => {
    const [focus, setFocus] = useState<boolean>(false)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        e.key === 'Enter'
        && onEnter
        && onEnter();
    }

    const finalLabelStyle = `${s.inputLabel} ${focus ? s.active : ''}`;
    const finalInputClassName = `${className} ${s.input}`

    return (
        <p className={s.input_wrapper}>
            <label className={finalLabelStyle}>{placeholder}</label>
            <input
                onFocus={() => setFocus(true)}
                onBlur={(e) => e.currentTarget.value.length !== 0 ? '' : setFocus(false)}
                autoComplete='new-password'
                autoCapitalize='off'
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                type={type}
                {...restProps}
            />
        </p>
    )
})
