import React, {ChangeEvent} from 'react';
import {ModalWindow} from '../Modal';
import {InputText} from '../../InputText/InputText';
import {UniversalButton} from '../../Button/FormButton/UniversalButton';

type ModalUpdatePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    setQuestionCard: (q: string) => void,
    setAnswerCard: (a: string) => void,
    updateModalHandler: () => void
}

export const ModalForUpdateCard: React.FC<ModalUpdatePropsType> = React.memo((
    {
        setActive,
        active,
        setQuestionCard,
        setAnswerCard,
        updateModalHandler
    }
) => {
    const handlerForUpdateQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionCard(e.currentTarget.value)
    }
    const handlerForUpdateAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerCard(e.currentTarget.value)
    }
    const updateModalHandlerCancel = () => {
        setActive(false)
    }

    return (
        <div>
            <ModalWindow active={active} setActive={setActive}>
                <h4>YOU CAN DO SOME CHANGES</h4>
                <InputText type={'text'} onChange={handlerForUpdateQuestionCard}
                                    placeholder={'Here you can update question'}/>
                <InputText type={'text'} onChange={handlerForUpdateAnswerCard}
                                    placeholder={'Here you can update answer'}/>
                <UniversalButton onClick={updateModalHandler}>Update</UniversalButton>
                <UniversalButton onClick={updateModalHandlerCancel}>Cancel</UniversalButton>
            </ModalWindow>
        </div>
    )
})

