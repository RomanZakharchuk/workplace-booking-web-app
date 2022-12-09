import { FC } from "react";
import { useDispatch } from "react-redux";

import css from './UserContainer.module.scss';
import UnknownAvatar from "../../../assets/png/uncnown-avatar.png";
import { DotsSvg } from "../../SvgComponents";
import { BLUE_COLOR, ACTIVE, INACTIVE } from "../../../constants";
import { IUser } from "../../../interfaces/user.interface";
import { getUserById } from "../../../modules/dashboard/store/user-store/user.actions";

type PropsType = {
    editUser: string;
    setToggleForm: (value: string) => void;
    user: IUser;
    isActiveUserItem: null | number;
    setIsActiveUserItem: (value: number) => void;
}

const UserContainer: FC<PropsType> = (props) => {
    const dispatch = useDispatch();

    let { editUser, setToggleForm, user, setIsActiveUserItem, isActiveUserItem } = props;

    const { id, email, firstName, imageUrl, lastName, status, role } = user;

    const checkStatus = (status: string) => {
        switch (status) {
            case ACTIVE:
                return css.available;
            case INACTIVE:
                return css.notAvailable;
            default:
                return null;
        }
    };

    return (
        <div
            className={css.userContainer}
            style={{ border: isActiveUserItem === id ? `2px solid ${BLUE_COLOR}` : '' }}
        >
            <div className={css.imageBlock}>
                <div className={css.avatarContainer}>
                    <img src={!imageUrl ? UnknownAvatar : imageUrl} alt="user avatar" />
                </div>
            </div>
            <div className={css.emailBlock}>
                <p className={css.text}>{email}</p>
            </div>
            <div className={css.firstNameBlock}>
                <p className={css.text}>{firstName}</p>
            </div>
            <div className={css.lastNameBlock}>
                <p className={css.text}>{lastName}</p>
            </div>
            <div className={css.organizationBlock}>
                <p className={css.text}>{role}</p>
            </div>
            <div className={css.statusBlock}>
                <p className={`${css.status} ${checkStatus(status)}`}>{status}</p>
            </div>

            <div
                onClick={() => {
                    setToggleForm(editUser);
                    setIsActiveUserItem(id);
                    dispatch(getUserById.request({id}))
                }}
                className={css.dotsBtn}
            >
                <DotsSvg color={BLUE_COLOR} />
            </div>
        </div>
    )
}

export { UserContainer };