import { ChangeEvent, FC, useEffect, useState } from "react";

import { TitleBasePage } from "../../components/TitleBasePage/TitleBasePage";
import css from './UserPage.module.scss';
import arrowRight from "../../assets/svg/chevrons-right.svg";
import {
    FormEditUser, FormExportFile, FormImportFile,
    ImportTableContainer,
    SettingWindowUsers,
    UserContainer,
    WrapCreateUser
} from "../../components/UserPageComponents";
import { ExportSvg, ImportSvg, UserInvitationSvg } from "../../components/SvgComponents/BasePageSvgs";
import { BlockNamePosition } from "../../components/OfficePageComponents";
import searchButtonClose from '../../assets/svg/x.svg';
import searchButton from '../../assets/svg/searchButton.svg';
import { PalygonDownSvg, PalygonUpSvg, SearchSvg } from "../../components/SvgComponents";
import { ContainerLeftForm } from "../../components/ContainerLeftForm/ContainerLeftForm";
import { FormAddUser } from "../../components/UserPageComponents";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import { getUsers } from '../../modules/dashboard/store/user-store/user.actions'
import { BLUE_COLOR, SILVER_COLOR, SORT_OPTIONS } from "../../constants";
import { IUser } from "../../interfaces/user.interface";
import { AppState } from "../../store/store";
import { DebounceInput } from "react-debounce-input";

export interface IDefaultInviteUserFormFields {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    status: string;
}

const defaultInviteUserFormFields: IDefaultInviteUserFormFields = {
    firstName: 'Johnny',
    lastName: 'Depp',
    role: 'USER',
    email: 'testbooking@gmaik.com',
    status: 'ACTIVE'
};

const UserPage: FC = () => {
    const settingWindow = 'setting';
    const addUser = 'add-user';
    const editUser = 'edit-user';
    const importFile = 'import-file';
    const exportFile = 'export-file';

    const [ toggleForm, setToggleForm ] = useState<string>(settingWindow);
    const [ toggleInputSearch, setToggleInputSearch ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const users = useSelector((store: AppState) => store.users.users);
    const meta = useSelector((store: AppState) => store.users.meta);
    const [ listUsers, setListUsers ] = useState(users);
    const [ loading, setLoading ] = useState(false);
    const [ sortBy, setSortBy ] = useState('');
    const [ direction, setDirection ] = useState('');
    const [ previewIconUser, setPreviewIconUser ] = useState();
    const [ inviteUserFormFields, setInviteUserFormFields ] = useState(defaultInviteUserFormFields);
    const [ isActiveUserItem, setIsActiveUserItem ] = useState<number | null>(null);
    const [ isActiveUserSortColumn, setIsActiveUserSortColumn ] = useState<string>('');
    const [ search, setSearch ] = useState<string>('');

    const colorActiveDirectionAsc = direction === SORT_OPTIONS.ASC ? BLUE_COLOR : SILVER_COLOR;
    const colorActiveDirectionDesc = direction === SORT_OPTIONS.DESC ? BLUE_COLOR : SILVER_COLOR;

    const { currentPage = 0, totalPages } = meta;

    useEffect(() => {
        if (users) {
            setListUsers(users)
        }
    }, [ users ]);

    const getNextUsersPage = (page: number = 0) => {
        setLoading(true);
        const nextPage = page || currentPage + 1;
        const callback = {
            onSuccess: () => {
                setLoading(false);
            }
        };
        dispatch(getUsers.request({ page: nextPage, direction, sortBy, searchKey: search, callback }));
    }

    useEffect(() => {
        getNextUsersPage(1);
    }, [ sortBy, direction, search ]);

    const switchSearchInput = () => {
        setToggleInputSearch(!toggleInputSearch);
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

    const toggleComponent = (toggleForm: string) => {
        switch (toggleForm) {
            case settingWindow:
                return (
                    <ContainerLeftForm title={'Settings window'}>
                        <SettingWindowUsers />
                    </ContainerLeftForm>
                );
            case addUser:
                return (
                    <ContainerLeftForm title={'Add user'}>
                        <FormAddUser
                            setPreviewIconUser={setPreviewIconUser}
                            previewIconUser={previewIconUser}
                            closeWindow={() => setToggleForm(settingWindow)}
                            setInviteUserFormFields={setInviteUserFormFields}
                            inviteUserFormFields={inviteUserFormFields}
                        />
                    </ContainerLeftForm>
                )
            case editUser:
                return (
                    <ContainerLeftForm title={'Editing a user'}>
                        <FormEditUser
                            closeWindow={() => setToggleForm(settingWindow)}
                            setIsActiveUserItem={setIsActiveUserItem}
                        />
                    </ContainerLeftForm>
                )
            case importFile:
                return (
                    <ContainerLeftForm title={'Import file'}>
                        <FormImportFile closeWindow={() => setToggleForm(settingWindow)} />
                    </ContainerLeftForm>
                )
            case exportFile:
                return (
                    <ContainerLeftForm title={'Export file'}>
                        <FormExportFile closeWindow={() => setToggleForm(settingWindow)} />
                    </ContainerLeftForm>
                )
            default:
                return null;
        }
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearch(search);
    };

    return (
        <div>
            <TitleBasePage title={'List of users'} />

            <div className={css.content}>
                <div className={css.contentLeft}>
                    <div className={css.wrapHeader}>
                        <div className={css.wrapPath}>
                            <p className={`${css.pathTitle} ${toggleForm === importFile ? null : css.underLineTitle}`}>List
                                of users</p>
                            <img src={arrowRight} alt="arrow right" className={css.arrow} />
                            {toggleForm === importFile ? <p className={`${css.pathTitle} ${toggleForm === importFile
                                ? css.underLineTitle : null}`}>Import</p> : null}

                        </div>

                        <div className={css.wrapBtnS}>
                            <div className={css.innerBtns}>
                                <div
                                    className={`${css.btnInvitationLink} ${toggleForm === addUser ? css.btnInvitationLinkDisabled : null}`}
                                    onClick={() => setToggleForm(addUser)}
                                >
                                    Invitation link
                                    <UserInvitationSvg />
                                </div>

                                <div
                                    className={`${css.btnImport} ${toggleForm === importFile ? css.btnInvitationLinkDisabled : null}`}
                                    onClick={() => setToggleForm(importFile)}
                                >
                                    Import
                                    <ImportSvg />
                                </div>

                                <div
                                    className={`${css.btnExport} ${toggleForm === exportFile ? css.btnInvitationLinkDisabled : null}`}
                                    onClick={() => setToggleForm(exportFile)}
                                >
                                    Export
                                    <ExportSvg />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.line} />

                    {toggleForm === importFile ? <ImportTableContainer /> :
                        <div>
                            <div className={css.wrapColumnNames}>
                                <div className={css.imageBlock}>
                                    <BlockNamePosition title={'Image'} />
                                </div>
                                <div className={css.emailBlock}>
                                    <BlockNamePosition title={'Email'} onPress={() => {
                                        handleColumnClick('email');
                                        setIsActiveUserSortColumn('email');
                                    }}>
                                        <PalygonUpSvg
                                            color={isActiveUserSortColumn === 'email' ? colorActiveDirectionAsc : SILVER_COLOR} />
                                        <PalygonDownSvg
                                            color={isActiveUserSortColumn === 'email' ? colorActiveDirectionDesc : SILVER_COLOR} />
                                    </BlockNamePosition>
                                </div>
                                <div className={css.firstNameBlock}>
                                    <BlockNamePosition title={'First Name'}
                                                       onPress={() => {
                                                           handleColumnClick('firstName');
                                                           setIsActiveUserSortColumn('firstName');
                                                       }}>
                                        <PalygonUpSvg
                                            color={isActiveUserSortColumn === 'firstName' ? colorActiveDirectionAsc : SILVER_COLOR} />
                                        <PalygonDownSvg
                                            color={isActiveUserSortColumn === 'firstName' ? colorActiveDirectionDesc : SILVER_COLOR} />
                                    </BlockNamePosition>
                                </div>
                                <div className={css.lastNameBlock}>
                                    <BlockNamePosition title={'Last Name'}
                                                       onPress={() => {
                                                           handleColumnClick('lastName');
                                                           setIsActiveUserSortColumn('lastName');
                                                       }}>
                                        <PalygonUpSvg
                                            color={isActiveUserSortColumn === 'lastName' ? colorActiveDirectionAsc : SILVER_COLOR} />
                                        <PalygonDownSvg
                                            color={isActiveUserSortColumn === 'lastName' ? colorActiveDirectionDesc : SILVER_COLOR} />
                                    </BlockNamePosition>
                                </div>
                                <div className={css.organizationBlock}>
                                    <BlockNamePosition title={'Role'} onPress={() => {
                                        handleColumnClick('role');
                                        setIsActiveUserSortColumn('role');
                                    }}>
                                        <PalygonUpSvg
                                            color={isActiveUserSortColumn === 'role' ? colorActiveDirectionAsc : SILVER_COLOR} />
                                        <PalygonDownSvg
                                            color={isActiveUserSortColumn === 'role' ? colorActiveDirectionDesc : SILVER_COLOR} />
                                    </BlockNamePosition>
                                </div>

                                <div className={css.statusBlock}>
                                    <BlockNamePosition title={'Status'} onPress={() => {
                                        handleColumnClick('status');
                                        setIsActiveUserSortColumn('status');
                                    }}>
                                        <PalygonUpSvg
                                            color={isActiveUserSortColumn === 'status' ? colorActiveDirectionAsc : SILVER_COLOR} />
                                        <PalygonDownSvg
                                            color={isActiveUserSortColumn === 'status' ? colorActiveDirectionDesc : SILVER_COLOR} />
                                    </BlockNamePosition>
                                </div>

                                <button onClick={() => switchSearchInput()} className={css.btnHide}>
                                    <div
                                        onClick={() => setSearch('')}
                                        style={{ display: toggleInputSearch ? 'block' : 'none' }}>
                                        <img src={searchButtonClose} alt="x" />
                                    </div>
                                    <div style={{ display: toggleInputSearch ? 'none' : 'block' }}>
                                        <img src={searchButton} alt="search icon" />
                                    </div>
                                </button>
                            </div>

                            <div className={`${css.wrapperForm} ${toggleInputSearch ? css.showForm : null}`}>
                                <div className={`${css.searchForm}`}>
                                    <SearchSvg />
                                    <DebounceInput
                                        minLength={2}
                                        debounceTimeout={500}
                                        onChange={handleSearch}
                                        className={css.searchInput}
                                        value={search}
                                    />
                                    <button
                                        onClick={() => setSearch('')}
                                        type='button'
                                        className={css.clearBtn}>Clear
                                    </button>
                                </div>
                            </div>

                            <div className={css.wrapperNewUser}>
                                <div
                                    className={`${css.blockNewUser} ${toggleForm === addUser ? css.showBlockNewUser : null}`}
                                >
                                    <WrapCreateUser
                                        previewIconUser={previewIconUser}
                                        inviteUserFormFields={inviteUserFormFields}
                                    />
                                </div>
                            </div>

                            <div
                                className={css.wrapInfiniteScroll}
                                style={toggleForm === addUser ? { height: '545px' } : { height: '624px' }}>
                                <div
                                    style={toggleForm === addUser ? {
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
                                        {listUsers.map((user: IUser, index: number) => <UserContainer
                                            key={index}
                                            editUser={editUser}
                                            setToggleForm={setToggleForm}
                                            user={user}
                                            setIsActiveUserItem={setIsActiveUserItem}
                                            isActiveUserItem={isActiveUserItem}
                                        />)}
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className={css.contentRight}>
                    {toggleComponent(toggleForm)}
                </div>
            </div>
        </div>
    )
}

export { UserPage };