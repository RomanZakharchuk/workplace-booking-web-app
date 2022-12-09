import { BookingActions, RequestAction } from "./booking-types";
import { put, takeLatest } from "typed-redux-saga";
import { requestAction } from "../../../../helpers/StoreHelpers";
import * as Actions from "./booking.actions";
import { axiosService } from "../../../../services/axios.service";
import { baseURL, urls } from "../../../../constants";

function* getBookingList(action: RequestAction<BookingActions.GET_BOOKING_LIST>): any {
    try {
        const { page, perPage = 10, sortBy, direction, callback } = action.payload;
        const response = yield axiosService.get(baseURL + urls.bookings +
            `?page=${page}&limit=${perPage}&direction=${direction || 'DESC'}&sortBy=${sortBy || 'createdAt'}`);
        const { items, meta } = response?.data;
        const { currentPage } = meta;
        if (currentPage > 1) {
            yield put(Actions.getBookingList.success({ items, meta }));
        } else {
            yield put(Actions.setBookingList(items, meta));
        }
        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error get bookings saga', error);
    }
}

function* cancelBookingById(action: RequestAction<BookingActions.CANCEL_BOOKING_BY_ID>): any {
    try {
        const { id } = action.payload;
        yield axiosService.put(`${baseURL}${urls.bookings}/${id}/cancel`);

        yield* put(Actions.cancelBookingById.success(id));
    } catch (error) {
        console.log('error cancel booking saga', error);
    }
}

function* bookingSaga() {
    yield* takeLatest(
        requestAction(BookingActions.GET_BOOKING_LIST),
        getBookingList
    );
    yield* takeLatest(
        requestAction(BookingActions.CANCEL_BOOKING_BY_ID),
        cancelBookingById
    );
}

export default bookingSaga;