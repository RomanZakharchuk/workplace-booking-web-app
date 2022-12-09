import { ActionCreator, ActionGroupCreator, PickAction, PickRequestAction } from "../../../../store/types";

export enum UserActions {
    UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
    GET_USER_PROFILE = 'GET_USER_PROFILE',
    SET_USERS = 'SET_USERS',
    GET_USERS = 'GET_USERS',
    INVITE_USER = 'INVITE_USER',
    UPDATE_USER = 'UPDATE_USER',
    IMPORT_USERS = 'IMPORT_USERS',
    EXPORT_USERS = 'EXPORT_USERS',
    GET_USER_BY_ID = 'GET_USER_BY_ID'
}

export type Actions =
    | ActionGroupCreator<UserActions.GET_USER_PROFILE, any, any>
    | ActionGroupCreator<UserActions.UPDATE_USER_PROFILE, any, any>
    | ActionGroupCreator<UserActions.GET_USERS, any, any>
    | ActionCreator<UserActions.SET_USERS, any>
    | ActionGroupCreator<UserActions.INVITE_USER, any, any>
    | ActionGroupCreator<UserActions.UPDATE_USER, any, any>
    | ActionGroupCreator<UserActions.IMPORT_USERS, any, any>
    | ActionGroupCreator<UserActions.EXPORT_USERS, any, any>
    | ActionGroupCreator<UserActions.GET_USER_BY_ID, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;