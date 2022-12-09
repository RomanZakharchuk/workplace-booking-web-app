import { ActionGroupCreator, PickAction, PickRequestAction } from "../../../store/types";

export enum AuthActions {
    LOGIN = "LOGIN",
    SIGN_UP = "SIGN_UP",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    SUBMIT_NEW_PASSWORD = "SUBMIT_NEW_PASSWORD",
    CREATE_PASSWORD = 'CREATE_PASSWORD'
}

export type Actions =
    | ActionGroupCreator<AuthActions.LOGIN, any, any>
    | ActionGroupCreator<AuthActions.SIGN_UP, any, any>
    | ActionGroupCreator<AuthActions.FORGOT_PASSWORD, any, any>
    | ActionGroupCreator<AuthActions.CREATE_PASSWORD, any, any>
    | ActionGroupCreator<AuthActions.SUBMIT_NEW_PASSWORD, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;

export interface IDefaultResponse {
    success: boolean;
    message: string | null;
}
