import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {CardPacksType} from '../cardPacks-reducer';
import {path} from '../../../00-App/Routes/Routes';
import Button from '../../../03-Components/Button/Button';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../00-App/store';
import {ModalForUpdateCardsPack} from '../../../03-Components/Modal/ModalForCards/ModalForUpdateCardsPack';
import {ModalForDelete} from '../../../03-Components/Modal/ModalForCards/ModalForDelete';
import {authSelectors} from '../../01-Login/00-index';

import s from './CardPacksElement.module.css'

type PropsType = {
    pack: CardPacksType
    updateCardPacks: (cardsPack: CardPacksType) => void
    removeCardPacks: (id: string) => void
}

export const CardPacksElement: React.FC<PropsType> = React.memo((
    {
        pack,
        updateCardPacks,
        removeCardPacks,
    }) => {

    const userId = useSelector<AppStoreType, string | undefined>(authSelectors.selectorUserId)

    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [titleCard, setTitleCard] = useState<string>('')

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }
    const onRemoveHandler = () => {
        setActiveModalDelete(true)
    }
    const deleteModalHandlerYes = () => {
        removeCardPacks(pack._id)
    }
    const updateModalHandler = () => {
        updateCardPacks && updateCardPacks({_id: pack._id, name: titleCard, type: 'bla-type'})
        setActiveModalUpdate(false)
        setTitleCard('')
    }

    return (
        <>
            <div className={s.course}>
                <div className={s.coursePreview}>
                    <h6>Title</h6>
                    <h2>{pack.type}</h2>
                    <NavLink to={path.CARDS + '/' + pack._id} activeClassName={s.active}>View all cards
                        <i
                            className={`${s.fas} ${s.faChevronRight}`}>
                        </i>
                    </NavLink>
                </div>
                <div className={s.courseInfo}>
                    <div className={s.progressContainer}>
                        <h6>Cards count: {pack.cardsCount}</h6>
                    </div>
                    <h6>NAME</h6>
                    <h2>{pack.name}</h2>
                    <div className={s.btnWrapper}>
                        {
                            pack.user_id === userId
                                ? <>
                                    <Button onClick={onUpdateHandler}
                                            className={s.btn}>Update
                                    </Button>
                                    <Button onClick={onRemoveHandler}
                                            className={s.btn}>Delete
                                    </Button>
                                </>
                                : ''
                        }

                        <NavLink to={path.LEARNING + '/' + pack._id}
                                 className={s.btn}>Learn
                        </NavLink>
                    </div>
                </div>
            </div>
            <ModalForDelete active={activeModalDelete}
                            setActive={setActiveModalDelete}
                            deleteModalHandlerYes={deleteModalHandlerYes}/>
            <ModalForUpdateCardsPack active={activeModalUpdate}
                                     setActive={setActiveModalUpdate}
                                     setTitleCard={setTitleCard}
                                     updateModalHandler={updateModalHandler}/>
        </>
    )
})
