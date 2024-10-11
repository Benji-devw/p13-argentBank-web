import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../api/call-api';

const initialState = {
    token: localStorage.getItem('userToken') || '',
    isAuthenticated: !!localStorage.getItem('userToken'),
    isLoading: false,
    errorMessage: null,
};

/**
 * @param {object} formData - email et password
 * @returns {Promise} - token
 * @description - Cette fonction permet de se connecter à l'API pour l'auth
 */
export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
    const response = await callApi('/user/login', 'POST', formData);
    if (response.body && response.body.token) {
        return { token: response.body.token, rememberMe: formData.rememberMe === 'on' ? true : false };
    } else {
        return rejectWithValue(response.message);
    }
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
            state.isAuthenticated = false;
            localStorage.removeItem('userToken');
            localStorage.removeItem('tokenExpiration');
            localStorage.setItem('isAuthenticated', 'false');
        },
        checkTokenExpiration: (state) => {
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
                state.token = '';
                state.isAuthenticated = false;
                localStorage.removeItem('userToken');
                localStorage.removeItem('tokenExpiration');
                localStorage.setItem('isAuthenticated', 'false');
            }
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
            state.token = payload.token;
            state.isAuthenticated = true;
            if (payload.rememberMe) {
                const expirationTime = new Date();
                expirationTime.setMinutes(expirationTime.getHours() + 1); // Set oken to expire in 1 hour
                localStorage.setItem('userToken', payload.token);
                localStorage.setItem('tokenExpiration', expirationTime.toISOString());
            }
            if (!payload.rememberMe) {
                const expirationTime = new Date();
                expirationTime.setMinutes(expirationTime.getMinutes() + 1); // Set token to expire in 1 minute
                localStorage.setItem('userToken', payload.token);
                localStorage.setItem('tokenExpiration', expirationTime.toISOString());
            }
        })
        .addCase(login.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.errorMessage = payload;
        });
    },
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
