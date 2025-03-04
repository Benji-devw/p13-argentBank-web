import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from '../api/call-api';

const initialState = {
    lastName: '',
    firstName: '',
    isEditing: false,
    isLoading: false,
    errorMessage: null,
    successMessage: null,
};

// Charger les données utilisateur depuis localStorage
const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : initialState;
};

/**
 * @param {string} token - Token of the user
 * @returns {Promise} - retourne user data
 * @description - Get user data
 */
export const getUserData = createAsyncThunk('user/getUserData', async (token, { rejectWithValue }) => {
    const response = await callApi('/user/profile', 'POST', {}, token);
    return response.body ? response.body : rejectWithValue(response.message);
});

/**
 * @param {object} payload - User data
 * @param {string} payload.token - Token of the user
 * @param {object} payload.userData - User data
 * @returns {Promise} - retourne user data
 * @description - Update user data
 */
export const updateUserData = createAsyncThunk('user/updateUserData', async (payload, { rejectWithValue }) => {
    const response = await callApi('/user/profile', 'PUT', payload.userData, payload.token);
    return response.body ? { body: response.body, message: response.message } : rejectWithValue(response.message);
});

// Slice pour user
const userSlice = createSlice({
    name: 'user',
    initialState: loadUserFromLocalStorage(),

    // reducers =>
    // Usage : Utilisé pour définir les reducers qui gèrent les actions synchrones créées à l'intérieur du slice.
    // Actions : Les actions sont automatiquement générées pour chaque fonction de reducer définie dans reducers.
    // Syntaxe : Les reducers sont définis comme des méthodes d'un objet.
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = !state.isLoading;
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
            // Get user data
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(getUserData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.firstName = payload.firstName;
                state.lastName = payload.lastName;
                state.errorMessage = null;
                state.successMessage = null;
                localStorage.setItem('user', JSON.stringify(state));
            })
            .addCase(getUserData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errorMessage = payload;
            })

            // Update user data
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.isEditing = false;
                state.successMessage = action.payload.message;
                localStorage.setItem('user', JSON.stringify(state));
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
                state.successMessage = null;
            });
    },
});

export const { setIsEditing, updateUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
