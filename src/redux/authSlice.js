import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../api/call-api';

const initialState = {
    token: localStorage.getItem('userToken') || '',
    isLoading: false,
    errorMessage: null,
};

/**
 * @param {object} formData - email et password
 * @returns {Promise} - token
 * @description - Cette fonction permet de se connecter à l'API pour l'auth
 */
export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await callApi('/user/login', 'POST', formData);
        if (response.body && response.body.token) {
            return response.body.token;
        } else {
            return rejectWithValue(response.message);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const Logout = createAsyncThunk('auth/logout', async () => {
    return '';
});

// Slice pour l'authentification
const authSlice = createSlice({
    name: 'auth',
    initialState,

    // reducers =>
    // Usage : Utilisé pour définir les reducers qui gèrent les actions synchrones créées à l'intérieur du slice.
    // Actions : Les actions sont automatiquement générées pour chaque fonction de reducer définie dans reducers.
    // Syntaxe : Les reducers sont définis comme des méthodes d'un objet.
    reducers: {
        logout: (state) => {
            state.token = '';
        },
    },
    
    // extraReducers =>
    // Usage : Utilisé pour gérer les actions définies en dehors du slice, telles que les actions asynchrones créées avec createAsyncThunk ou les actions provenant d'autres slices.
    // Actions : Les actions ne sont pas automatiquement générées. Vous devez les importer ou les définir séparément.
    // Syntaxe : Les reducers sont définis en utilisant une fonction de constructeur (builder).
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.token = payload;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errorMessage = payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
