import { FC } from "react";

import css from './SettingWindowUsers.module.scss';

const SettingWindowUsers: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.text}>Select the parameter to display the information</p>
        </div>
    )
}

export { SettingWindowUsers };