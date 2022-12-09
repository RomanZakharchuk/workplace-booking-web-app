import { FC } from "react";

import css from './ForgotPassword.module.scss';

const ForgotPassword: FC = () => {
    return (
        <div className={css.forgotPassword}>
            <p>Forgot your password?<a href="/reset-email">Restore!</a></p>
        </div>
    )
}

export { ForgotPassword };