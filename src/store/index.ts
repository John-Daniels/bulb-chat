import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import profileReducer, { sliceName as profileSliceName } from './profile.slice'

export const store = configureStore({
        reducer: {
                [profileSliceName]: profileReducer
        },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector<RootState>
export default store