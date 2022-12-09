import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import css from "./ResetPassword.module.scss";
import { Description } from "../../components/LoginPageComponents";
import { Notice, ResetPasswordForm } from "../../components/ResetPageComponents";
import { RegistrationComponent } from "../../components/RegistrationComponent/RegistrationComponent";

const ResetPassword: FC = () => {
    const [ noticeVisible, setNoticeVisible ] = useState<boolean>(false);
    let { search } = useLocation();
    const { token } = queryString.parse(search);

    const hideForm = (): void => {
        setNoticeVisible(true)
    }

    return (
        <RegistrationComponent>
            <Description
                title={'Enter a new password'}
                text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.'}
            />
            {!noticeVisible && (
                <ResetPasswordForm token={token} hideForm={hideForm} />
            )}
            {noticeVisible && (
                <Notice title={'Password successfully changed, click "Done" to finish'} />
            )}
            <Link
                to=""
                style={{ display: noticeVisible ? 'flex' : '' }}
                className={css.link}
            ><p>Done</p></Link>
        </RegistrationComponent>
    )
}

export { ResetPassword };