import { createApiAction } from "../../../../store/redux";
import { CompanyActions } from "./company.types";

export const getCompany = createApiAction(CompanyActions.GET_COMPANY);
export const updateCompany = createApiAction(CompanyActions.UPDATE_COMPANY);
export const getCompanySocialMedia = createApiAction(CompanyActions.GET_COMPANY_SOCIAL_MEDIA);
export const updateCompanySocialMedia = createApiAction(CompanyActions.UPDATE_COMPANY_SOCIAL_MEDIA);