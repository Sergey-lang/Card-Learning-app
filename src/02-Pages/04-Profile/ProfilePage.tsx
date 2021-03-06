import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../00-App/store';
import {authSelectors} from '../01-Login/00-index';
import {Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../00-App/Routes/Routes';
import s from './Profile.module.scss'
import {updateProfileData, UserDataType} from '../01-Login/auth-reducer';
import FileInput from './FileInput';
import {useForm} from 'react-hook-form';
import Button from '../../03-Components/Button/Button';

export const ProfilePage: React.FC = React.memo(() => {

    const {register, handleSubmit, errors, setError, reset} = useForm();

    const [editMode, setEditMode] = useState<boolean>(false)

    const isAuth = useSelector<AppStoreType, boolean>(authSelectors.selectorIsAuth)
    const profileData = useSelector<AppStoreType, UserDataType | null>(authSelectors.selectorUserData)

    const {token} = useParams<Record<string, string | undefined>>();
    const tokenName = token ? token : ''

    const dispatch = useDispatch()
    const onSubmit = (data: { name: string }, e: any) => {
        dispatch(updateProfileData(data.name, '', tokenName))
        setEditMode(false)
    }

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profile_header}>
            <div className={s.profile_header_cover}/>
            <div className={s.profile_header_info}>
                <div className={s.profile_header_info__description}>
                    <div className={s.user_avatar}>
                        <img className={s.user_avatar__img}
                             src={profileData! && profileData.avatar}
                             width={'200px'}
                        />
                        <FileInput/>
                    </div>
                    <div className={s.profile_name}>
                        {
                            editMode
                                ? <form className={s.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
                                    <input name='name'
                                           type="text"
                                           placeholder={'Enter name'}
                                           autoFocus
                                           className={s.profile_name__input}
                                           ref={register({
                                               required: true,
                                               validate: value => value.length >= 2
                                           })}
                                    />
                                    <Button className={s.save_name_btn}>Save</Button>
                                    <Button className={s.cancel_btn} onClick={() => setEditMode(false)}>Cancel</Button>
                                </form>
                                : <div className={s.profile_settings}>
                                    <span className={s.verified}/>
                                    <span>{profileData && profileData.name}</span>
                                    <Button className={s.edit_name_btn} onClick={() => setEditMode(true)}
                                    >Edit Name</Button>
                                </div>
                        }
                    </div>
                    <div className={s.profile_email}
                    > {errors.name && 'Your last name is less than 2 characters'}
                    </div>
                </div>
                <div className={s.social_links}>
                    <a href="#" className={s.link}>Link</a>
                    <a href="#" className={s.link} style={{backgroundColor: '#1abcff'}}>Link</a>
                    <a href="#" className={s.link} style={{backgroundColor: '#f8468d'}}>Link</a>
                    <a href="#" className={s.link} style={{backgroundColor: '#7b5dfa'}}>Link</a>
                    <a href="#" className={s.link} style={{backgroundColor: '#fd434f'}}>Link</a>
                    <a href="#" className={s.link} style={{backgroundColor: '#00e194'}}>Link</a>
                </div>
                <div className={s.user_state}>
                    <div className={s.user_state__item}>
                        <p className={s.title}>{profileData && profileData.publicCardPacksCount}</p>
                        <p className={s.text}>PACKS</p>
                    </div>
                    <div className={s.user_state__item}>
                        <p className={s.title}>{profileData && profileData.publicCardPacksCount}</p>
                        <p className={s.text}>PACKS</p>
                    </div>
                    <div className={s.user_state__item}>
                        <p className={s.title}>{profileData && profileData.publicCardPacksCount}</p>
                        <p className={s.text}>PACKS</p>
                    </div>
                </div>
            </div>
        </div>
    )
})
