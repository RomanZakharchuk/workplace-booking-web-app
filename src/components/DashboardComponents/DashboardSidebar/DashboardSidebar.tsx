import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import css from './DashboardSidebar.module.scss';
import { SILVER_COLOR, WHITE_COLOR } from "../../../constants";
import { BigDocumentSvg, BigSettingSvg, BigUserSvg } from "../../SvgComponents/BasePageSvgs";

const DashboardSidebar: FC = () => {
    const [documentSvg, setDocumentSvg] = useState<string>(null as unknown as string);
    const [userSvg, setUserSvg] = useState<string>(null as unknown as string);
    const [settingSvg, setSettingSvg] = useState<string>(null as unknown as string);
    let location = useLocation();

    const iconDocument = 'icon-document';
    const iconUser = 'icon-user';
    const iconSetting = 'icon-setting'

    const colorIconDocument = location.pathname === '/dashboard/office' || documentSvg ? WHITE_COLOR : SILVER_COLOR;
    const colorIconUser = location.pathname === '/dashboard/user' || userSvg ? WHITE_COLOR : SILVER_COLOR;
    const colorIconSetting = location.pathname === '/dashboard/setting' || settingSvg ? WHITE_COLOR : SILVER_COLOR;

    return (
        <nav className={css.sidebar}>
            <ul className={css.nav}>
                <Link
                    to={'/dashboard/office'}
                    className={`${css.list} ${location.pathname === '/dashboard/office' ? css.active : null}`}
                    style={{ background: documentSvg ? '#81adfc' : '' }}
                    onMouseEnter={() => setDocumentSvg(iconDocument)}
                    onMouseLeave={() => setDocumentSvg('')}
                >
                    <BigDocumentSvg
                        currentInputFocused={colorIconDocument} />
                </Link>
                <Link
                    to={'/dashboard/user'}
                    className={`${css.list} ${location.pathname === '/dashboard/user' ? css.active : null}`}
                    style={{ background: userSvg ? '#81adfc' : '' }}
                    onMouseEnter={() => setUserSvg(iconUser)}
                    onMouseLeave={() => setUserSvg('')}
                >
                    <BigUserSvg
                        currentInputFocused={colorIconUser} />
                </Link>
                <Link
                    to={'/dashboard/setting'}
                    className={`${css.list} ${location.pathname === '/dashboard/setting' ? css.active : null}`}
                    style={{ background: settingSvg ? '#81adfc' : '' }}
                    onMouseEnter={() => setSettingSvg(iconSetting)}
                    onMouseLeave={() => setSettingSvg('')}
                >
                    <BigSettingSvg
                        currentInputFocused={colorIconSetting} />
                </Link>
            </ul>
        </nav>
    )
}

export { DashboardSidebar };