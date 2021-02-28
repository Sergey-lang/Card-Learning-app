import React from 'react';

import s from './Preloader.module.css';

export const Preloader: React.FC = (props) => {

    return (
        <div className={s.fullOverlay}>
            <div className={s.loader}>Loading...</div>
        </div>
    )
}

export default Preloader;
