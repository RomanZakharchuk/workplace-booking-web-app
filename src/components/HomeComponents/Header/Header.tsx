import { FC, useState } from "react";

import { WrapperNav } from "./WrapperNav";
import { HeaderInfo } from "./HeaderInfo";
import css from './Header.module.scss';
import { Sidebar } from "./Sidebar";

const Header: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpen(!open);
    }

    return (
        <header id={'home'}>
            <div className={'container'}>
                <div className={css.header}>
                    <Sidebar toggleMenu={toggleMenu} open={open}/>
                    <WrapperNav toggleMenu={toggleMenu}/>
                    <HeaderInfo/>
                </div>
            </div>
        </header>
    )
}

export { Header };