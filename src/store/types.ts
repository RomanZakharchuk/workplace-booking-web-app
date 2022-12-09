import { Action } from "redux";

export interface ActionCreator<T = string, P = unknown> extends Action {
    type: `${T & string}`;
    payload: P;
}

export type ActionGroupCreator<T, R, S = null, F = string> =
    | ActionCreator<`${T & string}_REQUEST`, R>
    | ActionCreator<`${T & string}_SUCCESS`, S>
    | ActionCreator<`${T & string}_FAILURE`, F>;

export type PickRequestAction<Actions, ActionName> = Extract<Actions,
    { type: `${ActionName & string}_REQUEST` }>;

export type PickAction<Actions, ActionName> = Extract<Actions,
    { type: ActionName }>;

export interface PaginationResponse {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}

export type RequestNone = null;
export type RequestFailure = string | null;
