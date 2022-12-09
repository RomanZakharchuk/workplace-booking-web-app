import { all } from "redux-saga/effects";
import authSaga from "../modules/auth/store/auth.sagas";
import userSagas from "../modules/dashboard/store/user-store/user.sagas";
import officeSagas from "../modules/dashboard/store/office-store/office.sagas";
import companySagas from "../modules/dashboard/store/company-store/company.sagas";
import roomSagas from "../modules/dashboard/store/room-store/room.sagas";
import bookingSaga from "../modules/dashboard/store/booking-store/booking.sagas";

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSagas(),
        officeSagas(),
        companySagas(),
        roomSagas(),
        bookingSaga()
    ]);
}
