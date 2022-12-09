import { ChangeEvent, FC, useEffect, useState } from "react";

import css from './OfficePage.module.scss';
import arrowRight from "../../assets/svg/chevrons-right.svg";
import searchButton from '../../assets/svg/searchButton.svg';
import searchButtonClose from '../../assets/svg/x.svg';
import {
    BlockNamePosition,
    OfficeLocationMap,
    ItemOffice, WrapCreateOffice, PopupWarningRemoveItem
} from "../../components/OfficePageComponents";
import { PalygonDownSvg, PalygonUpSvg, SearchSvg } from "../../components/SvgComponents";
import InfiniteScroll from 'react-infinite-scroller';
import { getOffices, removeItemOffices } from "../../modules/dashboard/store/office-store/office.actions";
import { useDispatch, useSelector } from "react-redux";
import { TitleBasePage } from "../../components/TitleBasePage/TitleBasePage";
import { BLUE_COLOR, SILVER_COLOR, SORT_OPTIONS } from "../../constants";
import {
    AddOfficeFormComponent
} from "../../components/OfficePageComponents";
import {
    EditOfficeFormComponent
} from "../../components/OfficePageComponents";
import { ContainerLeftForm } from "../../components/ContainerLeftForm/ContainerLeftForm";
import { IOffice } from "../../interfaces/office.interface";
import { AppState } from "../../store/store";
import { DebounceInput } from "react-debounce-input";

export interface IDefaultOfficeFormFields {
    name: string,
    address: string,
    opensAt: string,
    closesAt: string,
    status: string,
    room: string,
    manager: string,
}

const defaultOfficeFormFields: IDefaultOfficeFormFields = {
    name: 'Office №1',
    address: 'Lviv, Chornovola 67',
    opensAt: '08:00 AM',
    closesAt: '08:00 AM',
    status: 'OPENED',
    room: '0',
    manager: 'Your name',
};

const OfficePage: FC = () => {
    const mapIsOpen = 'map';
    const addOfficeForm = 'add-office';
    const editForm = 'edit-form';

    const [ toggleInputSearch, setToggleInputSearch ] = useState<boolean>(false);
    const [ toggleForm, setToggleForm ] = useState<string>(mapIsOpen);
    const dispatch = useDispatch();
    const offices = useSelector((store: AppState) => store.offices.offices);
    const meta = useSelector((store: AppState) => store.offices.meta);
    const [ listOffices, setListOffices ] = useState(offices);
    const [ isActiveOffice, setIsActiveOffice ] = useState<number | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [ sortBy, setSortBy ] = useState('');
    const [ direction, setDirection ] = useState('');
    const [ officeFormFields, setOfficeFormFields ] = useState(defaultOfficeFormFields);
    const [ warningModalWindow, setWarningModalWindow ] = useState<boolean>(false);
    const [ deleteOfficeId, setDeleteOfficeId ] = useState<number | null>(null);
    const [ search, setSearch ] = useState<string>('');

    const { currentPage = 0, totalPages } = meta;

    useEffect(() => {
        if (offices) {
            setListOffices(offices)
        }
    }, [ offices ]);

    const getNextOfficesPage = (page: number = 0) => {
        setLoading(true);
        const nextPage = page || currentPage + 1;
        const callback = {
            onSuccess: () => {
                setLoading(false);
            }
        };
        dispatch(getOffices.request({ page: nextPage, direction, sortBy, searchKey: search, callback }));
    }

    useEffect(() => {
        getNextOfficesPage(1);
    }, [ sortBy, direction, search ]);

    const switchSearchInput = () => {
        setToggleInputSearch(!toggleInputSearch);
    };

    const toggleComponent = (toggleForm: string) => {
        switch (toggleForm) {
            case mapIsOpen:
                return (
                    <ContainerLeftForm title={'Office location map'}>
                        <OfficeLocationMap />;
                    </ContainerLeftForm>
                )
            case addOfficeForm:
                return (
                    <ContainerLeftForm title={'Add new office'}>
                        <AddOfficeFormComponent
                            closeForm={() => setToggleForm(mapIsOpen)}
                            setOfficeFormFields={setOfficeFormFields}
                            officeFormFields={officeFormFields}
                        />
                    </ContainerLeftForm>
                )
            case editForm:
                return (
                    <ContainerLeftForm title={'Edit office'}>
                        <EditOfficeFormComponent
                            closeForm={() => setToggleForm(mapIsOpen)}
                            setIsActiveOffice={setIsActiveOffice}
                        />
                    </ContainerLeftForm>
                )
            default:
                return null;
        }
    };

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

    const removeOfficeByIdFromOffices = () => {
        dispatch(removeItemOffices.request({ id: deleteOfficeId }));
        const newList = listOffices.filter((item: IOffice) => item.id !== deleteOfficeId);
        setListOffices(newList);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearch(search);
    };

    return (
        <div>
            <TitleBasePage title={'List of offices'} />

            <div className={css.content}>
                <div className={css.contentLeft}>
                    <div className={css.wrapHeader}>
                        <div className={css.wrapPath}>
                            <p className={css.pathTitle}>List of offices</p>
                            <img src={arrowRight} alt="arrow right" />
                        </div>

                        <div className={css.wrapBtnAdd}>
                            <button
                                onClick={() => setToggleForm(addOfficeForm)}
                                className={`${css.btnAdd} ${toggleForm === addOfficeForm ? css.activeBtnAddOffice : null}`}
                            >Add office
                            </button>
                        </div>
                    </div>

                    <div className={css.line} />

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
                        <div className={css.roomBlock}>
                            <BlockNamePosition title={'Room'} />
                        </div>
                        <div className={css.managerBlock}>
                            <BlockNamePosition title={'Manager'} />
                        </div>
                        <div className={css.creatorBlock}>
                            <BlockNamePosition title={'Address'} />
                        </div>
                        <div className={css.workTimeBlock}>
                            <BlockNamePosition title={'Working hours'} />
                        </div>

                        <button onClick={() => switchSearchInput()} className={css.btnHide}>
                            <div onClick={() => setSearch('')} style={{ display: toggleInputSearch ? 'block' : 'none' }} className={css.crossBtnIcon}>
                                <img src={searchButtonClose} alt="x" />
                            </div>
                            <div style={{ display: toggleInputSearch ? 'none' : 'block' }}
                                 className={css.searchBtnIcon}>
                                <img src={searchButton} alt="search icon" />
                            </div>
                        </button>
                    </div>

                    <div className={`${css.wrapperForm} ${toggleInputSearch ? css.showForm : null}`}>
                        <div className={css.searchForm}>
                            <SearchSvg />
                            <DebounceInput
                                minLength={2}
                                debounceTimeout={500}
                                onChange={handleSearch}
                                className={css.searchInput}
                                value={search}
                            />
                            <button onClick={() => setSearch('')}  type='button' className={css.clearBtn}>Clear</button>
                        </div>
                    </div>

                    <div className={css.wrapperNewOffice}>
                        <div
                            className={`${css.blockNewOffice} ${toggleForm === addOfficeForm ? css.showBlockNewOffice : null}`}
                        >
                            <WrapCreateOffice officeFormFields={officeFormFields} />
                        </div>
                    </div>

                    <div
                        className={css.wrapInfiniteScroll}
                        style={toggleForm === addOfficeForm ? { height: '545px' } : { height: '624px' }}>
                        <div
                            style={toggleForm === addOfficeForm ? {
                                pointerEvents: 'none',
                                opacity: '0.4',
                                maxHeight: '555px'
                            } : { maxHeight: "632px" }}
                            className={css.wrapOffices}>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => {
                                    if (!loading) {
                                        getNextOfficesPage();
                                    }
                                }}
                                hasMore={!currentPage || (currentPage < totalPages)}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                                useWindow={false}
                            >
                                {listOffices.map((office: IOffice) => <ItemOffice
                                    closeForm={() => setToggleForm(editForm)}
                                    key={office.id}
                                    office={office}
                                    setWarningModalWindow={setWarningModalWindow}
                                    setDeleteOfficeId={setDeleteOfficeId}
                                    setIsActiveOffice={setIsActiveOffice}
                                    isActiveOffice={isActiveOffice}
                                />)}
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
                            removeById={removeOfficeByIdFromOffices}
                            warningText={'Are you sure you want to delete an item? Once removed, it cannot be returned.'}
                        />
                    </div>
                )}
            </div>


        </div>
    )
}

export { OfficePage };