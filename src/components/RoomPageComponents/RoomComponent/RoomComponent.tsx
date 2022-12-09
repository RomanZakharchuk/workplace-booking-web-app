import { FC, useEffect, useRef, useState } from "react";

import css from './RoomComponent.module.scss'
import { DeleteSvg, DotsSvg, EditSvg } from "../../SvgComponents";
import { BLUE_COLOR, PENAL_COLOR, WHITE_COLOR } from "../../../constants";
import { IRoom } from "../../../interfaces/room.interface";
import { useDispatch } from "react-redux";
import { getRoomById } from "../../../modules/dashboard/store/room-store/room.actions";

type PropsType = {
    activeRoom: () => void;
    room: IRoom;
    setIsActiveRoom: (value: number) => void;
    isActiveRoom: number | null;
    setDeleteRoomId: (value: number) => void;
    setWarningModalWindow: (value: boolean) => void;
}

const RoomComponent: FC<PropsType> = (props) => {
    const iconEdit = 'icon-edit';
    const iconDelete = 'icon-delete';

    const [ editBlock, setEditBlock ] = useState<boolean>(false);
    const [ currenSvgFocused, setCurrentSvgFocused ] = useState<string>(null as unknown as string);
    const popupEditRef = useRef(null);
    const dispatch = useDispatch();

    const { activeRoom, room, setIsActiveRoom, isActiveRoom, setDeleteRoomId, setWarningModalWindow } = props;
    const { id, name, status, seatsCount, seatsCountAvailable, opensAt, closesAt } = room;

    const handleBtn = (e: {preventDefault: () => void;}) => {
        e.preventDefault();
    };

    const toggleButton = () => {
        setEditBlock(!editBlock);
    };

    const useOutsideAlerter = (ref: any) => { // I don't know how to fix
        useEffect(() => {
            const handleClickOutside = (e: any) => { // I don't know how to fix
                if (ref.current && !ref.current.contains(e.target)) {
                    setEditBlock(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ ref ]);
    };

    useOutsideAlerter(popupEditRef);

    return (
        <div
            className={css.roomContainer}
            style={{ border: isActiveRoom === id ? '2px solid #498AFE' : '' }}
        >
            <div className={css.nameBlock}>
                <p className={css.text}>{name}</p>
            </div>
            <div className={css.statusBlock}>
                <p className={css.text}>{status}</p>
            </div>
            <div className={css.seatsBlock}>
                <p className={css.text}>{seatsCountAvailable}/{seatsCount}</p>
            </div>
            <div className={css.addressBlock}>
                {/* Temporarily. I don't know if I need an address*/}
                <p className={css.text}>{}</p>
            </div>
            <div className={css.workTimeBlock}>
                <p className={css.text}>{opensAt} - {closesAt}</p>
            </div>

            <div className={css.wrapBtns}>
                <div
                    onClick={(event) => {
                        handleBtn(event);
                        toggleButton();
                    }}
                    className={css.dotsContainer}
                >
                    <DotsSvg color={BLUE_COLOR} />
                </div>

                {editBlock && (
                    <div ref={popupEditRef} className={css.editBlock}>
                        <div
                            onClick={(event) => {
                                handleBtn(event);
                                setEditBlock(false);
                                dispatch(getRoomById.request({ id }));
                                activeRoom();
                                setIsActiveRoom(id);
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
                                setEditBlock(false);
                                setDeleteRoomId(id);
                                setWarningModalWindow(true);
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
                )}
            </div>
        </div>
    )
}

export { RoomComponent };