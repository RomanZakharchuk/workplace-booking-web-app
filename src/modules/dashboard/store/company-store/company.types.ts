import { ActionGroupCreator, PickAction, PickRequestAction } from "../../../../store/types";

export enum CompanyActions {
    GET_COMPANY = 'GET_COMPANY',
    UPDATE_COMPANY = 'UPDATE_COMPANY',
    GET_COMPANY_SOCIAL_MEDIA = 'GET_COMPANY_SOCIAL_MEDIA',
    UPDATE_COMPANY_SOCIAL_MEDIA = 'UPDATE_COMPANY_SOCIAL_MEDIA'
}

export type Actions =
    | ActionGroupCreator<CompanyActions.GET_COMPANY, any, any>
    | ActionGroupCreator<CompanyActions.UPDATE_COMPANY, any, any>
    | ActionGroupCreator<CompanyActions.GET_COMPANY_SOCIAL_MEDIA, any, any>
    | ActionGroupCreator<CompanyActions.UPDATE_COMPANY_SOCIAL_MEDIA, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;