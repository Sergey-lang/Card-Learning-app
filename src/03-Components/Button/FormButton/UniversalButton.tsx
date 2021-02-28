import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './UniversalButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const UniversalButton: React.FC<SuperButtonPropsType> = React.memo((
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
})
