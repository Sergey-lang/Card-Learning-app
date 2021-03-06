import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import s from './CheckBox.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    label?: string
};

export const CheckBox: React.FC<SuperCheckboxPropsType> = React.memo((
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        label,

        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    }

    const finalLabelStyle = `${s.label} ${className ? className : ''}`;
    const finalCheckboxStyle = `${className}`

    return (
        <p className={s.checkbox_wrapper}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalCheckboxStyle}

                {...restProps}
            />
            <label className={finalLabelStyle}>{label}</label>
        </p>
    )
})
