import {AppStoreType} from './store';

export const selectorError = (state: AppStoreType) => state.app.appState.error
export const selectorAppStatus = (state: AppStoreType) => state.app.appState.status
