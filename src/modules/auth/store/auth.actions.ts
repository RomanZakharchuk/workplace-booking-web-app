import { createApiAction } from "../../../store/redux";
import { AuthActions } from "./auth.types";

export const login = createApiAction(AuthActions.LOGIN);
export const signUp = createApiAction(AuthActions.SIGN_UP);
export const submitToMail = createApiAction(AuthActions.FORGOT_PASSWORD);
export const submitNewPassword = createApiAction(AuthActions.SUBMIT_NEW_PASSWORD);
export const createPassword = createApiAction(AuthActions.CREATE_PASSWORD);

