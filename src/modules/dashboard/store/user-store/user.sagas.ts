import { put, takeLatest } from "typed-redux-saga";

import { RequestAction, UserActions } from "./user.types";
import { axiosService } from "../../../../services/axios.service";
import { baseURL, urls } from "../../../../constants";
import * as Actions from "./user.actions";
import { requestAction } from "../../../../helpers/StoreHelpers";

function* getUserProfile(action: RequestAction<UserActions.GET_USER_PROFILE>): any {
    try {
        const { firstName, lastName, email, imageUrl } = action.payload
        yield* put(Actions.getUserProfile.success({ firstName, lastName, email, imageUrl }));
    } catch (error) {
        console.log('error get user profile saga', error);
    }
}

function* updateUserProfile(action: RequestAction<UserActions.UPDATE_USER_PROFILE>): any {
    try {
        const { firstName, lastName, password, file, callback } = action.payload;
        const response = yield axiosService.put(baseURL + urls.usersProfile,
            { firstName, lastName, password, file },
            { headers: { "Content-Type": "multipart/form-data" } });

        yield* put(Actions.updateUserProfile.success(response.data));

        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error change user profile saga', error);
    }
}

function* getAllUsers(action: RequestAction<UserActions.GET_USERS>): any {
    try {
        const { page, perPage = 10, sortBy, direction, callback } = action.payload;
        const response = yield axiosService.get(baseURL + urls.users +
            `?page=${page}&limit=${perPage}&direction=${direction || 'DESC'}&sortBy=${sortBy || 'createdAt'}`);
        const { items, meta } = response?.data;
        const { currentPage } = meta;
        if (currentPage > 1) {
            yield put(Actions.getUsers.success({ items, meta }));
        } else {
            yield put(Actions.setUsers(items, meta));
        }
        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error get users saga', error);
    }
}

function* inviteUser(action: RequestAction<UserActions.INVITE_USER>): any {
    try {
        const { email, firstName, lastName, status, role, file } = action.payload
        const response = yield axiosService.post(baseURL + urls.users,
            { email, firstName, lastName, status, role, file },
            { headers: { "Content-Type": "multipart/form-data" } });
        const data = response.data;

        yield* put(Actions.inviteUser.success({ data }));

    } catch (error) {
        console.log('error invite user saga', error);
    }
}

function* updateUser(action: RequestAction<UserActions.UPDATE_USER>): any {
    try {
        const { email, firstName, lastName, status, role, file, id, callback } = action.payload;
        const response = yield axiosService.put(baseURL + urls.users + '/' + id,
            { id, email, firstName, lastName, status, role, file, },
            { headers: { "Content-Type": "multipart/form-data" } });

        yield* put(Actions.updateUser.success(response.data))

        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error update user saga', error);
    }
}

function* importUsers(action: RequestAction<UserActions.IMPORT_USERS>): any {
    try {
        const { file } = action.payload;
        yield axiosService.post(baseURL + urls.usersImport, { file },
            { headers: { "Content-Type": "multipart/form-data" } });
    } catch (error) {
        console.log('error update import saga', error);
    }
}

function* exportUsers(action: RequestAction<UserActions.EXPORT_USERS>): any {
    try {
        yield axiosService.get(baseURL + urls.usersExport)
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([ data ]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'users.csv'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    } catch (error) {
        console.log('error export users saga', error);
    }
}

function* getUserById(action: RequestAction<UserActions.GET_USER_BY_ID>): any {
    try {
        const { id } = action.payload;
        const response = yield axiosService.get(`${baseURL}${urls.users}/${id}`);
        const data = response?.data;

        yield* put(Actions.getUserById.success(data));
    } catch (error) {
        console.log('error get user by id saga', error);
    }
}

function* userSaga() {
    yield* takeLatest(
        requestAction(UserActions.GET_USER_PROFILE),
        getUserProfile
    );
    yield* takeLatest(
        requestAction(UserActions.UPDATE_USER_PROFILE),
        updateUserProfile
    );
    yield* takeLatest(
        requestAction(UserActions.GET_USERS),
        getAllUsers
    );
    yield* takeLatest(
        requestAction(UserActions.INVITE_USER),
        inviteUser
    );
    yield* takeLatest(
        requestAction(UserActions.UPDATE_USER),
        updateUser
    );
    yield* takeLatest(
        requestAction(UserActions.IMPORT_USERS),
        importUsers
    );
    yield* takeLatest(
        requestAction(UserActions.EXPORT_USERS),
        exportUsers
    );
    yield* takeLatest(
        requestAction(UserActions.GET_USER_BY_ID),
        getUserById
    );
}

export default userSaga;