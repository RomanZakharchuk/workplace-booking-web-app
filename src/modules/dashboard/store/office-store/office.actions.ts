import { createAction, createApiAction } from "../../../../store/redux";
import { OfficeActions } from "./office.types";

export const getOffices = createApiAction(OfficeActions.GET_OFFICES);
export const setOffices = (items: any, meta: any) =>
    createAction(OfficeActions.SET_OFFICES, { items , meta });
export const setActiveOffice = (office: any) =>
    createAction(OfficeActions.SET_ACTIVE_OFFICE, { office });
export const createOffice = createApiAction(OfficeActions.CREATE_OFFICE);
export const updateOffice = createApiAction(OfficeActions.UPDATE_OFFICE);
export const removeItemOffices = createApiAction(OfficeActions.REMOVE_ITEM_OFFICES);
export const getOfficeById = createApiAction(OfficeActions.GET_OFFICE_BY_ID);