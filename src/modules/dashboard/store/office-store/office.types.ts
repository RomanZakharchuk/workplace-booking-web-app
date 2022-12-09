import { ActionCreator, ActionGroupCreator, PickAction, PickRequestAction } from "../../../../store/types";


export enum OfficeActions {
    GET_OFFICES = "GET_OFFICES",
    SET_OFFICES = "SET_OFFICES",
    SET_ACTIVE_OFFICE = "SET_ACTIVE_OFFICE",
    CREATE_OFFICE = "CREATE_OFFICE",
    UPDATE_OFFICE = "UPDATE_OFFICE",
    REMOVE_ITEM_OFFICES = "REMOVE_ITEM_OFFICES",
    GET_OFFICE_BY_ID = 'GET_OFFICE_BY_ID'
}

export type Actions =
    | ActionGroupCreator<OfficeActions.CREATE_OFFICE, any, any>
    | ActionGroupCreator<OfficeActions.GET_OFFICES, any, any>
    | ActionCreator<OfficeActions.SET_OFFICES, any>
    | ActionCreator<OfficeActions.SET_ACTIVE_OFFICE, any>
    | ActionGroupCreator<OfficeActions.UPDATE_OFFICE, any, any>
    | ActionGroupCreator<OfficeActions.REMOVE_ITEM_OFFICES, any, any>
    | ActionGroupCreator<OfficeActions.GET_OFFICE_BY_ID, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;

export interface IDefaultResponse {
    success: boolean;
    message: string | null;
}