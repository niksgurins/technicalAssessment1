import { createSlice } from "@reduxjs/toolkit"

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: []
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.push({
                "buyer": action.payload.email,
                "text": action.payload.text,
                "rating": action.payload.rating,
                "createdAt": action.payload.createdAt
            })
        },
        addComments: (state, action) => {
            action.payload.forEach(comment => {
                state.comments.push({
                    "buyer": comment.email,
                    "text": comment.text,
                    "rating": comment.rating,
                    "createdAt": comment.createdAt
                })
            });
        }
    },
})

// Action creators are generated for each case reducer function
export const { addComment, addComments } = commentSlice.actions

export default commentSlice.reducer