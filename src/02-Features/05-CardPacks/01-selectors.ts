import {AppStoreType} from '../../00-App/store';

export const selectorCardPacks = (state: AppStoreType) => state.cardsPack.cardPacks
export const selectorFilter = (state: AppStoreType) => state.cardsPack.filter
export const selectorPacksTotalCount = (state: AppStoreType) => state.cardsPack.packsTotalCount
export const selectorCurrentPage = (state: AppStoreType) => state.cardsPack.currentPage
export const selectorPageSize = (state: AppStoreType) => state.cardsPack.pageSize
export const selectorEditMode = (state: AppStoreType) => state.cardsPack.showAll
