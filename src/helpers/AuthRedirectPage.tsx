import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import {authSelectors} from '../02-Pages/01-Login/00-index';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {PATH} from '../00-App/Routes/Routes';
import {appSelectors} from '../00-App/00-index';
import {setAppStatus} from '../00-App/app-reducer';
import {getAuthUserData} from '../02-Pages/01-Login/auth-reducer';

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type AuthRedirectPagePropsType = DivPropsType & {}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {
        children,
        ...restProps
    }
) => {

    const user = useSelector(authSelectors.selectorUserData);
    const isLoggedIn = useSelector(authSelectors.selectorIsAuth);
    const error = useSelector(appSelectors.selectorError);
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(user._id === '0');

    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRendering) {
            if (isLoggedIn || error) dispatch(setAppStatus({status: 'succeeded', error: null}));

            if (user._id === '0') {
                dispatch(getAuthUserData());
            }
            setFirstRendering(false); // + rerender
        } else {
            if (!redirect && ((spin && error) || (!spin && user._id === '0'))) {
                setTimeout(() => setRedirect(true), 1500);
            }
            if (isLoggedIn && spin) setSpin(false);
        }
    }, [firstRendering, setFirstRendering, user._id, setRedirect, isLoggedIn, error,
        dispatch, redirect, spin, setSpin]);

    if (redirect) return <Redirect to={PATH.LOGIN}/>;
    if (spin) return <div>spin... {error}</div>;

    return (
        <>
            {/*<Log s={renderLog || "rendering AuthRedirectPage"}/>*/}
            <div style={{width: '100%'}}>
                {children}
            </div>
        </>
    );
});

export default AuthRedirectPage;
