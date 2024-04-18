import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    posts: {
        items: [], loading: true, error: ''
    }, tags: {
        items: [], loading: true, error: '',
    }
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
    await axios.delete(`/posts/${id}`)
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    return data;
})


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Получение статей
            .addCase(fetchPosts.pending, (state) => {
                state.posts.loading = true;
                state.posts.items = [];
                state.posts.error = '';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.loading = false;
                state.posts.items = action.payload;
                state.posts.error = '';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.posts.loading = false;
                state.posts.items = [];
                state.posts.error = action.payload;
            })
            // Получение тегов
            .addCase(fetchTags.pending, (state) => {
                state.tags.loading = true;
                state.tags.items = [];
                state.tags.error = '';
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.loading = false;
                state.tags.items = action.payload;
                state.tags.error = '';
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.tags.loading = false;
                state.tags.items = [];
                state.tags.error = action.payload;
            })
            // Удаление статьи
            .addCase(fetchRemovePost.pending, (state) => {
                state.posts.loading = true;
                state.posts.error = '';
            })
            .addCase(fetchRemovePost.fulfilled, (state, action) => {
                state.posts.loading = false;
                state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
                state.posts.error = '';
            })
            .addCase(fetchRemovePost.rejected, (state, action) => {
                state.posts.loading = false;
                state.posts.items = [];
                state.posts.error = action.payload;
            })
    }
})

export const postsReducer = postsSlice.reducer;