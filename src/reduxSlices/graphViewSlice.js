import { createSlice } from "@reduxjs/toolkit"

export const graphViewSlice = createSlice({
    name: "graphViews",
    initialState: {
        views: [],
        viewCount: 0
    },
    reducers: {
        addView: (state, action) => {
            ++state.viewCount;
            state.views.push({
                "title": action.payload.title,
                "span": action.payload.span,
                "data": action.payload.data,
                "type": action.payload.type,
                "id": state.viewCount,
                "key": state.viewCount
            })
        },
        changeViewSpan: (state, action) => {
            state.views[action.payload.id-1].span = action.payload.span;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addView, changeViewSpan } = graphViewSlice.actions

export default graphViewSlice.reducer