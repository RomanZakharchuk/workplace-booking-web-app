import { ActionCreator, ActionGroupCreator, PickAction, PickRequestAction } from "../../../../store/types";

export enum BookingActions {
    GET_BOOKING_LIST = 'GET_BOOKING_LIST',
    SET_BOOKING_LIST = 'SET_BOOKING_LIST',
    POST_BOOKING = 'POST_BOOKING',
    GET_BOOKING_BY_ID = 'GET_BOOKING_BY_ID',
    CANCEL_BOOKING_BY_ID = 'CANCEL_BOOKING_BY_ID'
}

export type Actions =
    | ActionGroupCreator<BookingActions.GET_BOOKING_LIST, any, any>
    | ActionCreator<BookingActions.SET_BOOKING_LIST, any>
    | ActionGroupCreator<BookingActions.POST_BOOKING, any, any>
    | ActionGroupCreator<BookingActions.GET_BOOKING_BY_ID, any, any>
    | ActionGroupCreator<BookingActions.CANCEL_BOOKING_BY_ID, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;