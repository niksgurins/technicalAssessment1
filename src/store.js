import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './reduxSlices/commentSlice'

export default configureStore({
    reducer: {
        comment: commentReducer,
    },
})