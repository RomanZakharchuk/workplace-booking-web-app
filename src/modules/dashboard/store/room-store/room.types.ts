import { ActionCreator, ActionGroupCreator, PickAction, PickRequestAction } from "../../../../store/types";

export enum RoomActions {
    GET_ALL_ROOMS_BY_OFFICE_ID = 'GET_ALL_ROOMS_BY_OFFICE_ID',
    SET_ROOMS = 'SET_ROOMS',
    CREATE_ROOM = 'CREATE_ROOM',
    GET_ROOM_BY_ID = 'GET_ROOM_BY_ID',
    UPDATE_ROOM_BY_ID = 'UPDATE_ROOM_BY_ID',
    REMOVE_ROOM_BY_ID = 'REMOVE_ROOM_BY_ID'
}

export type Actions =
    | ActionGroupCreator<RoomActions.GET_ALL_ROOMS_BY_OFFICE_ID, any, any>
    | ActionCreator<RoomActions.SET_ROOMS, any>
    | ActionGroupCreator<RoomActions.CREATE_ROOM, any, any>
    | ActionGroupCreator<RoomActions.GET_ROOM_BY_ID, any, any>
    | ActionGroupCreator<RoomActions.UPDATE_ROOM_BY_ID, any, any>
    | ActionGroupCreator<RoomActions.REMOVE_ROOM_BY_ID, any, any>;

export type RequestAction<ActionName> = PickRequestAction<Actions, ActionName>;
export type Action<T extends Actions["type"]> = PickAction<Actions, T>;