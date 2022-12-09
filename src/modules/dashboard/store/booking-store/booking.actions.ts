import { createAction, createApiAction } from "../../../../store/redux";
import { BookingActions } from "./booking-types";
import { IBookingList } from "../../../../interfaces/bookingList.interface";
import { IMeta } from "../../../../interfaces/meta.interface";

export const getBookingList = createApiAction(BookingActions.GET_BOOKING_LIST);
export const setBookingList = (items: IBookingList, meta: IMeta) =>
    createAction(BookingActions.SET_BOOKING_LIST, { items, meta });
export const postBooking = createApiAction(BookingActions.POST_BOOKING);
export const getBookingById = createApiAction(BookingActions.GET_BOOKING_BY_ID);
export const cancelBookingById = createApiAction(BookingActions.CANCEL_BOOKING_BY_ID);