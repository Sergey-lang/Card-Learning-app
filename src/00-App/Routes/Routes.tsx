import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ProfilePage} from '../../02-Pages/04-Profile/ProfilePage';
import {Login} from '../../02-Pages/01-Login/Login';
import {Registration} from '../../02-Pages/02-Registration/Registration';
import {CardsPage} from '../../02-Pages/06-Cards/CardsPage';
import {LearningPage} from '../../02-Pages/07-Learning/LearningPage';

import s from './Routes.module.css'
import AuthRedirectPage from '../../helpers/AuthRedirectPage';
import {withSuspense} from '../../helpers/withSuspence';
import { CardPacksPage } from '../../02-Pages/05-CardPacks/CardPacksPage';

export const PATH = {
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD_POST: '/newPassword/:token?',
    PASS_REC: '/passwordRecovery',
    PROFILE: '/profile',
    CARD_PACKS: '/card_packs',
    CARDS: '/cards',
    LEARNING: '/learning',
    ALL_COMPONENTS: '/allComponents',
}

const PasswordRecovery = React.lazy(() => import('../../02-Pages/03-PasswordRecovery/PasswordRecoveryPage'))
const ResetPassword = React.lazy(() => import('../../02-Pages/03-PasswordRecovery/ResetPasswordPage'))
const Page404 = React.lazy(() => import('../../02-Pages/08-Page404/Page404'))

function Routes() {
    return (
        <div className={s.app_container}>
            <Switch>
                <Route path='/' exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} exact render={() => <Login/>}/>
                <Route path={PATH.REG} exact render={() => <Registration/>}/>
                <Route path={PATH.PASSWORD_POST} exact render={withSuspense(ResetPassword)}/>
                <Route path={PATH.PASS_REC} exact render={withSuspense(PasswordRecovery)}/>
                <Route path={PATH.PROFILE} exact render={() => <AuthRedirectPage><ProfilePage/></AuthRedirectPage>}/>
                <Route path={PATH.CARD_PACKS} exact render={() => <AuthRedirectPage><CardPacksPage/></AuthRedirectPage>}/>
                <Route path={PATH.CARDS + '/:id'} exact render={() => <CardsPage/>}/>
                <Route path={PATH.LEARNING + '/:id'} exact render={() => <AuthRedirectPage><LearningPage/></AuthRedirectPage>}/>
                <Route path={'/404'} render={withSuspense(Page404)}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    )
}

export default Routes;
