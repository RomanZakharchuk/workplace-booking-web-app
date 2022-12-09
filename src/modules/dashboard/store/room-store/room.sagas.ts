import { put, takeLatest } from "typed-redux-saga";
import { requestAction } from "../../../../helpers/StoreHelpers";
import { RequestAction, RoomActions } from "./room.types";
import { axiosService } from "../../../../services/axios.service";
import { baseURL, urls } from "../../../../constants";
import * as Actions from "./room.actions";

function* getAllRoomsByOfficeId(action: RequestAction<RoomActions.GET_ALL_ROOMS_BY_OFFICE_ID>): any {
    try {
        const { officeId, page, direction, sortBy, searchKey, callback } = action.payload;
        const response = yield axiosService.get(baseURL + urls.rooms +
            `?officeId=${officeId}&page=${page}&limit=10&direction=${direction || 'DESC'}&sortBy=${sortBy || 'createdAt'}&searchKey=${searchKey || ''}`);
        const { items, meta } = response.data;
        const { currentPage } = meta;
        if (currentPage > 1) {
            yield put(Actions.getAllRoomsByOfficeId.success({ items, meta }));
        } else {
            yield put(Actions.setRooms(items, meta));
        }
        if (callback?.onSuccess) callback.onSuccess();
    } catch (error) {
        console.log('error get all rooms saga', error);
    }
}

function* createRoom(action: RequestAction<RoomActions.CREATE_ROOM>): any {
    try {
        // Temporarily. Description is empty.
        const { name, officeId, status, description } = action.payload;
        const response = yield axiosService.post(`${baseURL}${urls.rooms}`,
            { name, officeId, status, description });

        yield* put(Actions.createRoom.success(response.data));
    } catch (error) {
        console.log('error create room saga', error);
    }
}

function* getRoomById(action: RequestAction<RoomActions.GET_ROOM_BY_ID>): any {
    try {
        const { id } = action.payload;
        const response = yield axiosService.get(`${baseURL}${urls.rooms}/${id}`);

        yield* put(Actions.getRoomById.success(response.data));

    } catch (error) {
        console.log('error get room by id saga', error);
    }
}

function* updateRoomById(action: RequestAction<RoomActions.UPDATE_ROOM_BY_ID>): any {
    try {
        const { id, name, description } = action.payload;
        const response = yield axiosService.put(`${baseURL}${urls.rooms}/${id}`,
            {id, name, description });

        yield* put(Actions.updateRoomById.success(response.data));
    } catch (error) {
        console.log('error update room by id saga', error);
    }
}

function* removeRoomById(action: RequestAction<RoomActions.REMOVE_ROOM_BY_ID>): any {
    try {
        const { id } = action.payload;
        yield axiosService.delete(`${baseURL}${urls.rooms}/${id}`);

        yield* put(Actions.removeRoomById.success({ id }));
    } catch (error) {
        console.log('error delete room saga', error);
    }
}


function* roomSaga() {
    yield* takeLatest(
        requestAction(RoomActions.GET_ALL_ROOMS_BY_OFFICE_ID),
        getAllRoomsByOfficeId
    );
    yield* takeLatest(
        requestAction(RoomActions.CREATE_ROOM),
        createRoom
    );
    yield* takeLatest(
        requestAction(RoomActions.UPDATE_ROOM_BY_ID),
        updateRoomById
    );
    yield* takeLatest(
        requestAction(RoomActions.REMOVE_ROOM_BY_ID),
        removeRoomById
    );
    yield* takeLatest(
        requestAction(RoomActions.GET_ROOM_BY_ID),
        getRoomById
    );
}

export default roomSaga;