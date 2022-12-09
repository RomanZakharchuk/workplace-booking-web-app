import { put, takeLatest } from "typed-redux-saga";
import { requestAction } from "../../../../helpers/StoreHelpers";
import { CompanyActions, RequestAction } from "./company.types";
import { axiosService } from "../../../../services/axios.service";
import { baseURL, urls } from "../../../../constants";
import * as Actions from "./company.actions";

function* getCompany(action: RequestAction<CompanyActions.GET_COMPANY>): any {
    try {
        const { id } = action.payload;
        const response = yield axiosService.get(`${baseURL}${urls.companies}/${id}/metadata`);

        yield put(Actions.getCompany.success(response.data));
    } catch (error) {
        console.log('error get company saga', error);
    }
}

function* updateCompany(action: RequestAction<CompanyActions.UPDATE_COMPANY>): any {
    try {
        const { name, specification, employeesCapacity, file, id, callback } = action.payload;
        const response = yield axiosService.put(`${baseURL}${urls.companies}/${id}`,
            { name, specification, employeesCapacity, file },
            { headers: { "Content-Type": "multipart/form-data" } });

        yield* put(Actions.updateCompany.success(response.data));
        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error update company saga', error);
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* getCompanySocialMedia(action: RequestAction<CompanyActions.GET_COMPANY_SOCIAL_MEDIA>): any {
    try {
        const { id } = action.payload;
        const response = yield axiosService.get(`${baseURL}${urls.companies}/${id}/social-media`);

        yield put(Actions.getCompanySocialMedia.success(response.data));
    } catch (error) {
        console.log('error get company social media saga', error);
    }
}

function* updateCompanySocialMedia(action: RequestAction<CompanyActions.UPDATE_COMPANY_SOCIAL_MEDIA>): any {
    try {
        const { facebookUrl, twitterUrl, linkedinUrl, instagramUrl, id, callback } = action.payload;
        const response = yield axiosService.put(`${baseURL}${urls.companies}/${id}/social-media`,
            { facebookUrl, twitterUrl, linkedinUrl, instagramUrl });

        yield* put(Actions.updateCompanySocialMedia.success(response.data));
        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error update company social media saga', error)
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* companySaga() {
    yield* takeLatest(
        requestAction(CompanyActions.GET_COMPANY),
        getCompany
    );
    yield* takeLatest(
        requestAction(CompanyActions.UPDATE_COMPANY),
        updateCompany
    );
    yield* takeLatest(
        requestAction(CompanyActions.GET_COMPANY_SOCIAL_MEDIA),
        getCompanySocialMedia
    );
    yield* takeLatest(
        requestAction(CompanyActions.UPDATE_COMPANY_SOCIAL_MEDIA),
        updateCompanySocialMedia
    );
}

export default companySaga;