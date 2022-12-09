import { FC, useEffect, useRef, useState } from "react";

import css from './ItemOffice.module.scss';
import { DeleteSvg, DotsSvg, EditSvg } from "../../SvgComponents";
import { BLUE_COLOR, PENAL_COLOR, WHITE_COLOR } from "../../../constants";
import { useDispatch } from "react-redux";
import { PopupAboutManager } from "../PopupAboutManager/PopupAboutManager";
import { Link } from "react-router-dom";
import { IOffice } from "../../../interfaces/office.interface";
import { getOfficeById } from "../../../modules/dashboard/store/office-store/office.actions";

type PropsType = {
    office: IOffice;
    closeForm: () => void;
    setWarningModalWindow: (value: boolean) => void;
    setDeleteOfficeId: (value: number) => void;
    setIsActiveOffice: (value: number) => void;
    isActiveOffice: number | null;
}

const ItemOffice: FC<PropsType> = (props) => {
    const [ editBlock, setEditBlock ] = useState<boolean>(false);
    const [ popupManagerBlock, setPopupManagerBlock ] = useState<boolean>(false)
    const [ currenSvgFocused, setCurrentSvgFocused ] = useState<string>(null as unknown as string);
    const popupEditRef = useRef(null);
    const popupManagerRef = useRef(null);
    const dispatch = useDispatch();

    const {
        office,
        closeForm,
        setWarningModalWindow,
        setDeleteOfficeId,
        setIsActiveOffice,
        isActiveOffice
    } = props;

    const { id, name, opensAt, closesAt, roomsCount, address, status, manager } = office;

    const iconEdit = 'icon-edit';
    const iconDelete = 'icon-delete';

    const toggleButton = () => {
        setEditBlock(!editBlock);
    };

    const togglePopupManager = () => {
        setPopupManagerBlock(!popupManagerBlock);
    };

    const closeEditBlock = () => {
        setEditBlock(false);
    };

    const useOutsideAlerter = (ref: any) => { // I don't know how to fix
        useEffect(() => {
            const handleClickOutside = (e: any) => { // I don't know how to fix
                if (ref.current && !ref.current.contains(e.target)) {
                    setEditBlock(false);
                    setPopupManagerBlock(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ ref ]);
    };

    useOutsideAlerter(popupEditRef);
    useOutsideAlerter(popupManagerRef);

    const checkStatus = (status: string) => {
        switch (status) {
            case 'CLOSED':
                return css.statusClose;
            case 'OPENED':
                return css.statusAvailable;
            default:
                return null;
        }
    };

    const handleBtn = (e: {preventDefault: () => void;}) => {
        e.preventDefault();
    };

    const goToOfficeById = () => {
        sessionStorage.setItem('officeId', id.toString());
    };

    return (
        <Link to={`/dashboard/office/${name}`} onClick={goToOfficeById}>
            <div
                className={css.wrapOffice}
                style={{ border: isActiveOffice === id ? '2px solid #498AFE' : '' }}
            >
                <p className={css.nameBlock}>{name}</p>
                <div className={css.wrapStatusText}>
                    <p className={`${css.statusBlock} ${checkStatus(status)}`}>{status}</p>
                </div>
                <p className={css.roomBlock}>{roomsCount}</p>
                <div className={css.wrapperManager}>
                    <p onClick={(event) => {
                        handleBtn(event);
                        togglePopupManager();
                    }} className={css.managerBlock}>{manager.fullName}</p>
                    {popupManagerBlock ?
                        <div ref={popupManagerRef}><PopupAboutManager manager={manager} /></div> : null}
                </div>
                <p className={css.addressBlock}>{address.address}</p>
                <p className={css.workTimeBlock}>{opensAt} - {closesAt}</p>
                <div className={`${css.wrapBtns} tooltipBoundary`}>
                    <div onClick={(event) => {
                        handleBtn(event);
                        toggleButton();

                    }} className={css.editBtn}>
                        <DotsSvg color={BLUE_COLOR} />
                    </div>

                    <div ref={popupEditRef} className={`${css.editBlock} ${editBlock ? css.show : css.hide}`}>
                        <div
                            onClick={(event) => {
                                closeForm();
                                closeEditBlock();
                                handleBtn(event);
                                dispatch(getOfficeById.request({ id }));
                                setIsActiveOffice(id);
                            }}
                            style={{ background: currenSvgFocused === iconEdit ? BLUE_COLOR : WHITE_COLOR }}
                            className={css.WrapBtn}
                            onMouseEnter={() => setCurrentSvgFocused(iconEdit)}
                            onMouseLeave={() => setCurrentSvgFocused('')}
                        >
                            <div className={css.wrapIcon}>
                                <EditSvg colorIconEdit={currenSvgFocused === iconEdit ? WHITE_COLOR : BLUE_COLOR} />
                            </div>
                            <p style={{ color: currenSvgFocused === iconEdit ? WHITE_COLOR : PENAL_COLOR }}
                               className={css.editText}>Edit</p>
                        </div>

                        <div
                            onClick={(event) => {
                                handleBtn(event);
                                setWarningModalWindow(true);
                                closeEditBlock();
                                setDeleteOfficeId(id);
                            }}
                            style={{ background: currenSvgFocused === iconDelete ? BLUE_COLOR : WHITE_COLOR }}
                            className={css.WrapBtn}
                            onMouseEnter={() => setCurrentSvgFocused(iconDelete)}
                            onMouseLeave={() => setCurrentSvgFocused('')}
                        >
                            <div className={css.wrapIcon}>
                                <DeleteSvg
                                    colorIconDelete={currenSvgFocused === iconDelete ? WHITE_COLOR : BLUE_COLOR} />
                            </div>
                            <p style={{ color: currenSvgFocused === iconDelete ? WHITE_COLOR : PENAL_COLOR }}
                               className={css.editText}>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export { ItemOffice };