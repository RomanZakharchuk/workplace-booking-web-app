import { createAction, createApiAction } from "../../../../store/redux";
import { UserActions } from "./user.types";

export const updateUserProfile = createApiAction(UserActions.UPDATE_USER_PROFILE);
export const getUserProfile = createApiAction(UserActions.GET_USER_PROFILE);
export const getUsers = createApiAction(UserActions.GET_USERS);
export const setUsers = (items: any, meta: any) =>
    createAction(UserActions.SET_USERS, { items, meta });
export const inviteUser = createApiAction(UserActions.INVITE_USER);
export const updateUser = createApiAction(UserActions.UPDATE_USER);
export const importUsers = createApiAction(UserActions.IMPORT_USERS);
export const exportUsers = createApiAction(UserActions.EXPORT_USERS);
export const getUserById = createApiAction(UserActions.GET_USER_BY_ID);