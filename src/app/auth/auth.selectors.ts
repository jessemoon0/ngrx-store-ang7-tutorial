import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(selectAuthState, authState => authState.loggedIn);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
