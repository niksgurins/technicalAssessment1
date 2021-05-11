import { configureStore } from "@reduxjs/toolkit"
import commentReducer from "./reduxSlices/commentSlice"
import graphViewReducer from "./reduxSlices/graphViewSlice"

export default configureStore({
    reducer: {
        comment: commentReducer,
        graphViews: graphViewReducer
    },
})