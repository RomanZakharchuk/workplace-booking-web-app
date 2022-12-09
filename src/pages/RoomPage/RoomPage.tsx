import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import css from './RoomPage.module.scss';
import searchButtonClose from "../../assets/svg/x.svg";
import searchButton from "../../assets/svg/searchButton.svg";
import arrowRight from "../../assets/svg/chevrons-right.svg";
import { TitleBasePage } from "../../components/TitleBasePage/TitleBasePage";
import {
    AddRoomComponent,
    AddRoomForm,
    BookingListComponent,
    CalendarComponent, RoomComponent
} from "../../components/RoomPageComponents";
import { PalygonDownSvg, PalygonUpSvg, SearchSvg } from "../../components/SvgComponents";
import { BlockNamePosition, PopupWarningRemoveItem } from "../../components/OfficePageComponents";
import { ContainerLeftForm } from "../../components/ContainerLeftForm/ContainerLeftForm";
import { EditRoomForm } from "../../components/RoomPageComponents/EditRoomForm/EditRoomForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsByOfficeId, removeRoomById } from "../../modules/dashboard/store/room-store/room.actions";
import { IRoom } from "../../interfaces/room.interface";
import { BLUE_COLOR, SILVER_COLOR, SORT_OPTIONS } from "../../constants";
import { AppState } from "../../store/store";
import { DebounceInput } from "react-debounce-input";

export interface IInitialRoomFormFields {
    name: string;
    status: string;
    seats: string;
    address: string;
    opensAt: string;
    closesAt: string;
}

const initialRoomFormFields: IInitialRoomFormFields = {
    name: 'Room #0',
    status: 'CLOSED',
    seats: '0/0',
    address: 'Lviv',
    opensAt: '8:00 am',
    closesAt: '8:00 am'
};

const RoomPage = () => {
    const bookingIsOpen = 'booking';
    const addRoomForm = 'add-room';
    const editRoomForm = 'edit-room';

    const rooms = useSelector((state: AppState) => state?.rooms.rooms);
    const meta = useSelector((store: AppState) => store.rooms.meta);
    const [ currentRooms, setCurrentRooms ] = useState(rooms);
    const [ toggleInputSearch, setToggleInputSearch ] = useState<boolean>(false);
    const [ toggleForm, setToggleForm ] = useState<string>(bookingIsOpen);
    const [ loading, setLoading ] = useState(false);
    const [ direction, setDirection ] = useState('');
    const [ sortBy, setSortBy ] = useState('');
    const [ roomFormFields, setRoomFormFields ] = useState<IInitialRoomFormFields>(initialRoomFormFields);
    const [ isActiveRoom, setIsActiveRoom ] = useState<number | null>(null);
    const [ warningModalWindow, setWarningModalWindow ] = useState<boolean>(false);
    const [ deleteRoomId, setDeleteRoomId ] = useState<number | null>(null);
    const [ search, setSearch ] = useState<string>('');
    const dispatch = useDispatch();

    const officeId = sessionStorage.getItem('officeId');
    const { currentPage = 0, totalPages } = meta;

    useEffect(() => {
        if (rooms) {
            setCurrentRooms(rooms);
        }
    }, [ rooms ]);

    const getNextUsersPage = (page: number = 0) => {
        setLoading(true);
        const nextPage = page || currentPage + 1;
        const callback = {
            onSuccess: () => {
                setLoading(false);
            }
        };
        dispatch(getAllRoomsByOfficeId.request({
            officeId,
            page: nextPage,
            direction,
            sortBy,
            searchKey: search,
            callback
        }));
    }

    useEffect(() => {
        getNextUsersPage(1);
    }, [ sortBy, direction, search ]);

    const handleColumnClick = (name: string) => {
        if (sortBy !== name) {
            setSortBy(name);
            setDirection(SORT_OPTIONS.ASC);
            return;
        }
        switch (direction) {
            case SORT_OPTIONS.ASC:
                setDirection(SORT_OPTIONS.DESC);
                return
            case SORT_OPTIONS.DESC:
                setSortBy('');
                setDirection(null as unknown as string);
                return;
            default:
                setDirection(SORT_OPTIONS.ASC);
                return;
        }
    };

    const switchSearchInput = () => {
        setToggleInputSearch(!toggleInputSearch);
    };

    const toggleComponent = (toggleForm: string) => {
        switch (toggleForm) {
            case bookingIsOpen:
                return (
                    <ContainerLeftForm title={'Booking list'}>
                        <BookingListComponent />
                    </ContainerLeftForm>
                );
            case addRoomForm:
                return (
                    <ContainerLeftForm title={'Add room'}>
                        <AddRoomForm
                            closeForm={() => setToggleForm(bookingIsOpen)}
                            initialRoomFormFields={initialRoomFormFields}
                            setRoomFormFields={setRoomFormFields}
                        />
                    </ContainerLeftForm>
                );
            case editRoomForm:
                return (
                    <ContainerLeftForm title={'Edit room'}>
                        <EditRoomForm
                            closeForm={() => setToggleForm(bookingIsOpen)}
                            setIsActiveRoom={setIsActiveRoom}
                        />
                    </ContainerLeftForm>
                );
            default:
                return null;
        }
    };

    const removeRoomByIdFromRooms = () => {
        dispatch(removeRoomById.request({ id: deleteRoomId }));
        const newList = currentRooms.filter((item: IRoom) => item.id !== deleteRoomId);
        setCurrentRooms(newList);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearch(search);
    };

    return (
        <div>
            <TitleBasePage title={'List of rooms'} />

            <div className={css.content}>
                <div className={css.contentLeft}>
                    <div className={css.wrapHeader}>
                        <div className={css.wrapPath}>
                            <p className={css.pathTitle}>List of offices</p>
                            <img src={arrowRight} alt="arrow right" />
                            <p className={css.pathTitleActive}>List of rooms</p>
                        </div>

                        <div className={css.wrapBtnAdd}>
                            <button
                                onClick={() => setToggleForm(addRoomForm)}
                                className={`${css.btnAdd} ${toggleForm === addRoomForm ? css.activeBtnAddRoom : null}`}
                            >Add room
                            </button>
                        </div>
                    </div>

                    <div className={css.line} />

                    <CalendarComponent />

                    <div className={css.wrapColumnNames}>
                        <div className={css.nameBlock}>
                            <BlockNamePosition title={'Name'} onPress={() => handleColumnClick('name')}>
                                <PalygonUpSvg color={direction === SORT_OPTIONS.ASC ? BLUE_COLOR : SILVER_COLOR} />
                                <PalygonDownSvg color={direction === SORT_OPTIONS.DESC ? BLUE_COLOR : SILVER_COLOR} />
                            </BlockNamePosition>
                        </div>
                        <div className={css.statusBlock}>
                            <BlockNamePosition title={'Status'} />
                        </div>
                        <div className={css.seatsBlock}>
                            <BlockNamePosition title={'Seats'} />
                        </div>
                        <div className={css.addressBlock}>
                            <BlockNamePosition title={'Address'} />
                        </div>
                        <div className={css.workTimeBlock}>
                            <BlockNamePosition title={'Working hours'} />
                        </div>

                        <button
                            onClick={() => switchSearchInput()}
                            className={css.btnHide}>
                            <div
                                onClick={() => setSearch('')}
                                style={{ display: toggleInputSearch ? 'block' : 'none' }}
                                className={css.crossBtnIcon}>
                                <img src={searchButtonClose} alt="x" />
                            </div>
                            <div
                                style={{ display: toggleInputSearch ? 'none' : 'block' }}
                                className={css.searchBtnIcon}>
                                <img src={searchButton} alt="search icon" />
                            </div>
                        </button>
                    </div>

                    <div
                        className={`${css.wrapperForm} ${toggleInputSearch ? css.showForm : null}`}
                    >
                        <div className={css.searchForm}>
                            <SearchSvg />
                            <DebounceInput
                                minLength={2}
                                debounceTimeout={500}
                                onChange={handleSearch}
                                className={css.searchInput}
                                value={search}
                            />
                            <button
                                type='button'
                                className={css.clearBtn}
                                onClick={() => setSearch('')}
                            >Clear
                            </button>
                        </div>
                    </div>

                    <div className={css.wrapperNewRoom}>
                        <div
                            className={`${css.blockNewRoom} ${toggleForm === addRoomForm ? css.showBlockNewRoom : null}`}
                        >
                            <AddRoomComponent room={roomFormFields} />
                        </div>
                    </div>

                    <div
                        className={css.wrapInfiniteScroll}
                        style={toggleForm === addRoomForm ? { height: '397px' } : { height: '476px' }}>
                        <div
                            style={toggleForm === addRoomForm ? {
                                pointerEvents: 'none',
                                opacity: '0.4',
                                maxHeight: '555px'
                            } : { maxHeight: "632px" }}
                            className={css.wrapOffices}>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => {
                                    if (!loading) {
                                        getNextUsersPage();
                                    }
                                }}
                                hasMore={!currentPage || (currentPage < totalPages)}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                                useWindow={false}
                            >
                                {currentRooms.map((room: IRoom, index: number) => (
                                    <RoomComponent
                                        key={index}
                                        room={room}
                                        activeRoom={() => setToggleForm(editRoomForm)}
                                        setIsActiveRoom={setIsActiveRoom}
                                        isActiveRoom={isActiveRoom}
                                        setDeleteRoomId={setDeleteRoomId}
                                        setWarningModalWindow={setWarningModalWindow}
                                    />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>

                <div className={css.contentRight}>
                    {toggleComponent(toggleForm)}
                </div>

                {warningModalWindow && (
                    <div className={css.popup}>
                        <PopupWarningRemoveItem
                            setWarningModalWindow={setWarningModalWindow}
                            removeById={removeRoomByIdFromRooms}
                            warningText={'Are you sure you want to delete an item? Once removed, it cannot be returned.'}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export { RoomPage };