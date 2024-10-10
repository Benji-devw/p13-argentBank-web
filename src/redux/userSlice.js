import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../api/call-api';

const initialState = {
    lastName: '',
    firstName: '',
    isEditing: false,
    isLoading: false,
    errorMessage: null,
};

/**
 * @param {object} formData - email et password
 * @returns {Promise} - token
 * @description - Cette fonction permet de se connecter à l'API pour l'auth
 */
export const getUserData = createAsyncThunk('user/getUserData', async (token, { rejectWithValue }) => {
    const response = await callApi('/user/profile', 'POST', {}, token);
    // console.log('Parsed response:--------', response);

    if (response.body) {
        return response.body;
    } else {
        return rejectWithValue(response.message);
    }
});

// Slice pour user
const userSlice = createSlice({
    name: 'user',
    initialState,

    // reducers =>
    // Usage : Utilisé pour définir les reducers qui gèrent les actions synchrones créées à l'intérieur du slice.
    // Actions : Les actions sont automatiquement générées pour chaque fonction de reducer définie dans reducers.
    // Syntaxe : Les reducers sont définis comme des méthodes d'un objet.
    reducers: {
        updateUser: (state, { payload }) => {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
        },
        setIsEditing: (state) => {
            state.isEditing = !state.isEditing;
        },
    },

    // extraReducers =>
    // Usage : Utilisé pour gérer les actions définies en dehors du slice, telles que les actions asynchrones créées avec createAsyncThunk ou les actions provenant d'autres slices.
    // Actions : Les actions ne sont pas automatiquement générées. Vous devez les importer ou les définir séparément.
    // Syntaxe : Les reducers sont définis en utilisant une fonction de constructeur (builder).
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(getUserData.fulfilled, (state, { payload }) => {
                console.log('payload', payload);
                
                state.isLoading = false;
                state.firstName = payload.firstName;
                state.lastName = payload.lastName;
            })
            .addCase(getUserData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errorMessage = payload;
            });
    },
});

export const { setIsEditing, updateUser } = userSlice.actions;
export default userSlice.reducer;
