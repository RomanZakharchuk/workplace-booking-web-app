import { createAction, createApiAction } from "../../../../store/redux";
import { RoomActions } from "./room.types";

export const getAllRoomsByOfficeId = createApiAction(RoomActions.GET_ALL_ROOMS_BY_OFFICE_ID);
export const setRooms = (items: any, meta: any) =>
    createAction(RoomActions.SET_ROOMS, { items, meta });
export const createRoom = createApiAction(RoomActions.CREATE_ROOM);
export const getRoomById = createApiAction(RoomActions.GET_ROOM_BY_ID);
export const updateRoomById = createApiAction(RoomActions.UPDATE_ROOM_BY_ID);
export const removeRoomById = createApiAction(RoomActions.REMOVE_ROOM_BY_ID);
