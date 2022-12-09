import { put, takeLatest } from "typed-redux-saga";
import axios from "axios";

import { requestAction } from "../../../helpers/StoreHelpers";
import { AuthActions, RequestAction } from "./auth.types";
import * as Actions from "./auth.actions";
import { baseURL, urls } from "../../../constants";

function* login(action: RequestAction<AuthActions.LOGIN>): any {
    try {
        const { email, password, callback } = action?.payload;
        const response: any = yield axios.post(baseURL + urls.login, { email, password });
        const { accessToken: token, role, companyId } = response?.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('companyId', companyId);
        yield* put(Actions.login.success({ token, role }));
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === 'Request failed with status code 400') {
                sessionStorage.setItem('loginErrorMessage', 'The email address or password you entered is invalid!')
            }
            console.log("error login saga", e);
        }

    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* forgotPassword(action: RequestAction<AuthActions.FORGOT_PASSWORD>): any {
    try {
        const { email, callback } = action.payload;
        yield axios.post(baseURL + urls.forgotPassword, { email });
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        console.log("error forgot password saga", e);
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* submitNewPassword(action: RequestAction<AuthActions.SUBMIT_NEW_PASSWORD>): any {
    try {
        const { password, token, callback } = action.payload;
        yield axios.post(baseURL + urls.submitPassword, { password, token });
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        console.log("error submit new password saga", e);
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* signUp(action: RequestAction<AuthActions.SIGN_UP>): any {
    try {
        const { email, firstName, lastName, company, callback } = action.payload
        yield axios.post(baseURL + urls.signUp, { email, firstName, lastName, company });
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        console.log("error signUp saga", e);
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* createPassword(action: RequestAction<AuthActions>): any {
    try {
        const { password, token, callback } = action.payload;
        yield axios.post(baseURL + urls.signUpSubmit, { password, token });
        if (callback?.onSuccess) callback.onSuccess();
    } catch (e) {
        console.log('error create password saga', e);
    } finally {
        const { callback } = action.payload;
        if (callback?.onError) callback.onError();
    }
}

function* homeSaga() {
    yield* takeLatest(
        requestAction(AuthActions.LOGIN),
        login
    );
    yield* takeLatest(
        requestAction(AuthActions.SIGN_UP),
        signUp
    );
    yield* takeLatest(
        requestAction(AuthActions.FORGOT_PASSWORD),
        forgotPassword
    );
    yield* takeLatest(
        requestAction(AuthActions.SUBMIT_NEW_PASSWORD),
        submitNewPassword
    );
    yield* takeLatest(
        requestAction(AuthActions.CREATE_PASSWORD),
        createPassword
    );
}

export default homeSaga;
