import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from './InputText.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
};

export const InputText: React.FC<SuperInputTextPropsType> = React.memo((
    {
        value,
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
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

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
    const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className ? className : ''}`

    return (
        <>
            <input
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                type={type}
                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
})
