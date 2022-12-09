import { FC, useEffect, useState, useRef } from "react";

import css from './HeaderDropDown.module.scss';
import { ChevronDown, ChevronUp, LogoutSvg, ProfileSvg } from "../../SvgComponents";
import { BLUE_COLOR, SILVER_COLOR, WHITE_COLOR } from "../../../constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/user.service";
import { getUserProfile } from "../../../modules/dashboard/store/user-store/user.actions";
import UnknownAvatar from "../../../assets/png/uncnown-avatar.png";

const HeaderDropDown: FC = () => {
    const [currenSvgFocused, setCurrentSvgFocused] = useState<string>(null as unknown as string);
    const [openDrop, setOpenDrop] = useState(false);
    const profile = useSelector((store: any) => store?.users?.profile);
    let dispatch = useDispatch();
    let wrapperRef = useRef(null);

    const { firstName, lastName, imageUrl } = profile;

    useEffect(() => {
        userService.getUserProfile().then(({ data }) => dispatch(getUserProfile.request(data)))
    }, [dispatch]);

    const iconProfile = 'icon-profile';
    const iconLogout = 'icon-logout';

    const colorIconProfile = currenSvgFocused === iconProfile ? WHITE_COLOR : SILVER_COLOR;
    const colorIconLogout = currenSvgFocused === iconLogout ? WHITE_COLOR : SILVER_COLOR;

    const openDropdown = () => {
        setOpenDrop(!openDrop);
    };

    const useOutsideAlerter = (ref: any) => {
        useEffect(() => {
            const handleClickOutside = (e: any) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setOpenDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };

    useOutsideAlerter(wrapperRef);

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('companyId');
    }

    return (
        <div ref={wrapperRef} className={css.dropdownContainer} onClick={() => openDropdown()}
             style={{ background: openDrop ? BLUE_COLOR : '' }}>
            <div className={css.dropdownInner}>
                <div className={css.dropdownImage}>
                    <img src={!imageUrl ? UnknownAvatar : imageUrl} alt="User" />
                </div>
                <div className={css.textContainer}>
                    <h4 className={css.dropdownTitle}
                        style={{ color: openDrop ? WHITE_COLOR : '' }}
                    >{!firstName ? 'Johnny' : firstName}</h4>
                    <h4 className={css.dropdownTitle}
                        style={{ color: openDrop ? WHITE_COLOR : '' }}
                    >{!lastName ? 'Depp' : lastName}</h4>
                </div>
            </div>

            <div className={css.dropdownIcon}>
                {openDrop ? <ChevronUp color={'#FFFFFF'} /> : <ChevronDown />}
            </div>

            <div className={css.dropdownList} style={{ display: openDrop ? 'block' : 'none' }}>
                <Link
                    to={'/dashboard/my-profile'}
                    className={css.wrapLink}
                    onMouseEnter={() => setCurrentSvgFocused(iconProfile)}
                    onMouseLeave={() => setCurrentSvgFocused('')}
                >
                    <div className={css.imgWrap}>
                        <ProfileSvg colorIconProfile={colorIconProfile} />
                    </div>
                    <h4 className={css.dropdownTitle}>My profile</h4>
                </Link>

                <Link
                    to={''}
                    className={css.wrapLink}
                    onMouseEnter={() => setCurrentSvgFocused(iconLogout)}
                    onMouseLeave={() => setCurrentSvgFocused('')}
                    onClick={logOut}
                >
                    <div className={css.imgWrap}>
                        <LogoutSvg colorIconLogout={colorIconLogout} />
                    </div>
                    <h4 className={css.dropdownTitle}>Exit</h4>
                </Link>
            </div>
        </div>
    )
}

export { HeaderDropDown };