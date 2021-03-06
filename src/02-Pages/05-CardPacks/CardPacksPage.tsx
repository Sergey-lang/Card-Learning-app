import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import s from './CardPacks.module.css'
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks,
    showMode,
    updateCardPacks
} from './cardPacks-reducer';
import {AppStoreType} from '../../00-App/store';
import {Paginator} from '../../03-Components/Paginator/Paginator';
import DoubleRange from '../../03-Components/DoubleRange/DoubleRange';
import {PATH} from '../../00-App/Routes/Routes';
import {ModalForAddPack} from '../../03-Components/Modal/ModalForPack/ModalForAddPack';
import {CardPacksElement} from './CardPaksElement/CardPacksElement';
import {UniversalButton} from '../../03-Components/Button/FormButton/UniversalButton';
import {Input} from '../../03-Components/Input/Input';
import {CheckBox} from '../../03-Components/Checkbox/CheckBox';
import {
    selectorCardPacks,
    selectorCurrentPage,
    selectorEditMode,
    selectorFilter,
    selectorPacksTotalCount,
    selectorPageSize
} from './01-selectors';
import {selectorUserData} from '../01-Login/01-selectors';
import {authSelectors} from '../01-Login/00-index';
import {UserDataType} from '../01-Login/auth-reducer';

export const CardPacksPage: React.FC = React.memo(() => {

    const isAuth = useSelector<AppStoreType, boolean>(authSelectors.selectorIsAuth)
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(selectorCardPacks)

    //filter data
    const packsTotalCount = useSelector<AppStoreType, number>(selectorPacksTotalCount)
    const filter = useSelector<AppStoreType, CardPacksFilterType>(selectorFilter)
    const currentPage = useSelector<AppStoreType, number>(selectorCurrentPage)
    const pageSize = useSelector<AppStoreType, number>(selectorPageSize)
    const editMode = useSelector<AppStoreType, boolean>(selectorEditMode)

    const userData = useSelector<AppStoreType, UserDataType | null>(selectorUserData)

    //filter state
    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    //modal
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [namePack, setNamePack] = useState<string>('')
    const [typeNewPack, setTypeNewPack] = useState<string>('undefined')

    const dispatch = useDispatch()

    const onPageChanged = useCallback((currentPage: number) => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }, [currentPage])

    const onSearch = () => dispatch(getCardPacks(currentPage, pageSize, filtered))
    const showOwnPack = (e: ChangeEvent<HTMLInputElement>) => dispatch(showMode(e.target.checked))
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const filtered: CardPacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
        userId: editMode && userData ? userData._id : ''
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const cardTestObj: CardPacksType = {
        _id: genID(5),
        name: namePack,
        type: typeNewPack
    }

    const onAddCardPacks = () => {
        setActiveModalAdd(true)
    }
    const addPackHandler = () => {
        dispatch(addCardPacks(cardTestObj))
        setActiveModalAdd(false)
    }
    const changeCardPacks = (cardsPack: CardPacksType) => {
        dispatch(updateCardPacks(cardsPack))
    }
    const removeCardPacks = (_id: string) => {
        dispatch(deleteCardPacks(_id))
    }

    const mappedPacks = cardPacks.map((p: CardPacksType) =>
        <CardPacksElement key={p._id}
                          pack={p}
                          updateCardPacks={changeCardPacks}
                          removeCardPacks={removeCardPacks}/>)

    useEffect(() => {
        dispatch(getCardPacks(currentPage, pageSize, filter))
    }, [])

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <>
            <div className={s.dataForm}>
                <div className={s.search}>
                    <h4>FORM FOR SEARCH</h4>
                    <DoubleRange range={range} setRange={setRange}/>
                    <Input onChange={inputHandler} placeholder={'search...'}/>
                    <CheckBox checked={editMode}
                              onChange={showOwnPack}> Show only mine pack </CheckBox>
                    <UniversalButton onClick={onSearch}>Search</UniversalButton>
                    <UniversalButton onClick={onAddCardPacks}>Add new CardPack</UniversalButton>
                </div>
                <div className={s.cardsBlock}>
                    <Paginator currentPage={currentPage}
                               onPageChanged={onPageChanged}
                               pageSize={pageSize}
                               totalItemsCount={packsTotalCount}/>
                    <div className={s.cardPacksTable}>
                        {
                            mappedPacks
                        }
                    </div>
                </div>
            </div>
            <ModalForAddPack active={activeModalAdd}
                             setActive={setActiveModalAdd}
                             addPackHandler={addPackHandler}
                             setNamePack={setNamePack}
                             setTypeNewPack={setTypeNewPack}/>
        </>
    )
})
