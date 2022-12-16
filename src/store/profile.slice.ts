import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteItem, getItem, saveItem } from '../helpers/storage.helper'
import { profileStorageKey } from '../constants/index.constant'


export const sliceName = 'profileSlice'
export interface ProfileState {
        id?: string,
        avater?: string,
        email?: string,
        isEmailVerified?: boolean
        username?: string,
        accessToken?: string,
        refreshToken?: string,
        [key: string]: any
}

const initialState: ProfileState = {
        ...((getItem(profileStorageKey) || {}) as ProfileState)
}

export const profileSlice = createSlice({
        name: sliceName,
        initialState,
        reducers: {
                profileLoginAction: (state, action: PayloadAction<{ [key: string]: any }>) => {
                        saveItem(profileStorageKey, JSON.stringify(action.payload))
                        return { ...state, ...action.payload }
                },
                profileLogoutAction: (state, action: PayloadAction) => {
                        deleteItem(profileStorageKey)
                        return {}
                },
                profileUpdateAction: (state, action) => {
                        saveItem(profileStorageKey, { ...state, ...action.payload });
                        return { ...state, ...action.payload }
                }
        },
})

// Action creators are generated for each case reducer function
export const { profileLoginAction, profileLogoutAction, profileUpdateAction } = profileSlice.actions

export default profileSlice.reducer