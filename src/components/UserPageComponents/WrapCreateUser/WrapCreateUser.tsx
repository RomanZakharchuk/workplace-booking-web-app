import { FC } from "react";

import css from './WrapCreateUser.module.scss';
import UnknownAvatar from '../../../assets/png/uncnown-avatar.png';
import { DotsSvg } from "../../SvgComponents";
import { SILVER_ALTO_COLOR, ACTIVE, INACTIVE } from "../../../constants";

type PropsType = {
    inviteUserFormFields: any;
    previewIconUser: undefined;
}

const WrapCreateUser: FC<PropsType> = ({ inviteUserFormFields, previewIconUser }) => {
    const { firstName, lastName, email, role, status } = inviteUserFormFields;

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
        <div className={css.userContainer}>
            <div className={css.imageBlock}>
                <div className={css.avatarContainer}>
                    <img src={!previewIconUser ? UnknownAvatar : previewIconUser} alt="user avatar" />
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

            <div>
                <DotsSvg color={SILVER_ALTO_COLOR} />
            </div>
        </div>
    )
}

export { WrapCreateUser };