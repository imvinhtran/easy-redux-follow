import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";

interface Post {
    userId: number;
    id: number;

    title: string;

    body: string;
}

interface PostState {
    posts: Post[];

    loading: boolean;

    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
}

const postSlice = createSlice ({
    name: 'post',
    initialState,
    reducers: {
        fetchPostStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostSuccess(state, action: PayloadAction<Post[]>) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchPostStart, fetchPostSuccess, fetchPostFailure} = postSlice.actions;



export const fetchPosts = () : AppThunk => async (dispatch) => {
    try {
        dispatch(fetchPostStart());
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        dispatch(fetchPostSuccess(data))
    } catch (error: any) {
        dispatch(fetchPostFailure(error.message))
    }
}
export default postSlice.reducer