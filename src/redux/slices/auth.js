import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    user: null,
    loading: true,
    error: ''
}

export const fetchAuth = createAsyncThunk('posts/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('posts/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/registration', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.loading = true
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.user = null;
            state.loading = true;
            state.error = '';
        })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.user = null;
                state.loading = true;
                state.error = action.payload;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.user = null;
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.user = null;
                state.loading = true;
                state.error = action.payload;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.user = null;
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.user = null;
                state.loading = true;
                state.error = action.payload;
            })
    }
})

export const selectIsAuth = state => Boolean(state.user.user)
export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions