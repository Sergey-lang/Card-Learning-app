import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './CheckBox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
};

export const CheckBox: React.FC<SuperCheckboxPropsType> = React.memo((
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`;

    return (
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
})
