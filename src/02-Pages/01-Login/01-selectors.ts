import {AppStoreType} from '../../00-App/store';

export const selectorIsAuth = (state: AppStoreType) => state.auth.isLoggedIn
export const selectorUserData = (state: AppStoreType) => state.auth.user
export const selectorUserId = (state: AppStoreType) => state.auth.user._id
