import { put, takeLatest } from "typed-redux-saga";

import { requestAction } from "../../../../helpers/StoreHelpers";
import { OfficeActions, RequestAction } from "./office.types";
import { axiosService } from "../../../../services/axios.service";
import { baseURL, urls } from "../../../../constants";
import * as Actions from "./office.actions";


function* getOffices(action: RequestAction<OfficeActions.GET_OFFICES>): any {
    try {
        const { page, perPage = 10, sortBy, direction, searchKey, callback } = action.payload;
        const response = yield axiosService.get(baseURL + urls.offices +
            `?page=${page}&limit=${perPage}&direction=${direction || 'DESC'}&sortBy=${sortBy || 'createdAt'}&searchKey=${searchKey || ''}`
        );
        const { items, meta } = response?.data;
        const { currentPage } = meta;
        if (currentPage > 1) {
            yield put(Actions.getOffices.success({ items, meta }));
        } else {
            yield put(Actions.setOffices(items, meta));
        }
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        console.log('error get offices saga', e);
    }
}

function* createOffice(action: RequestAction<OfficeActions.CREATE_OFFICE>): any {
    try {
        const { closesAt, opensAt, address, name, workingDays } = action.payload;
        const response = yield axiosService.post(baseURL + urls.offices,
            { closesAt, opensAt, address, name, workingDays });

        yield* put(Actions.createOffice.success(response.data));
    } catch (e) {
        console.log('error create office saga', e);
    }
}

function* updateOffice(action: RequestAction<OfficeActions.UPDATE_OFFICE>): any {
    try {
        const { name, address, opensAt, closesAt, id, workingDays } = action.payload;
        const response = yield axiosService.put(`${baseURL}${urls.offices}/${id}`,
            { id, name, address, opensAt, closesAt, workingDays });

        yield* put(Actions.updateOffice.success(response.data));
    } catch (e) {
        console.log('error change office saga', e);
    }
}

function* removeItemOffices(action: RequestAction<OfficeActions.REMOVE_ITEM_OFFICES>): any {
    try {
        const { id } = action.payload;
        yield axiosService.delete(`${baseURL}${urls.offices}/${id}`);

        yield* put(Actions.removeItemOffices.success(id));
    } catch (e) {
        console.log('error delete office saga', e);
    }
}

function* getOfficeById(action: RequestAction<OfficeActions.GET_OFFICE_BY_ID>): any {
    try {
        const { id } = action.payload;
        const response = yield axiosService.get(`${baseURL}${urls.offices}/${id}`);
        const data = response?.data;

        yield* put(Actions.getOfficeById.success(data));
    } catch (error) {
        console.log('error get office by id saga', error);
    }
}


function* homeSaga() {
    yield* takeLatest(
        requestAction(OfficeActions.GET_OFFICES),
        getOffices
    );
    yield* takeLatest(
        requestAction(OfficeActions.CREATE_OFFICE),
        createOffice
    );
    yield* takeLatest(
        requestAction(OfficeActions.UPDATE_OFFICE),
        updateOffice
    );
    yield* takeLatest(
        requestAction(OfficeActions.REMOVE_ITEM_OFFICES),
        removeItemOffices
    );
    yield* takeLatest(
        requestAction(OfficeActions.GET_OFFICE_BY_ID),
        getOfficeById
    );
}

export default homeSaga;