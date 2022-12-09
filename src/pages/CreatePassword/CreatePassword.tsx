import { FC, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import queryString from 'query-string';

import css from './CreatePassword.module.scss';
import { Description } from "../../components/LoginPageComponents";
import { Notice } from "../../components/ResetPageComponents";
import { CreatePasswordForm } from "../../components/CreatePasswordForm";
import { RegistrationComponent } from "../../components/RegistrationComponent/RegistrationComponent";

const CreatePassword: FC = () => {
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
                <CreatePasswordForm token={token} hideForm={hideForm} />
            )}
            {noticeVisible && (
                <Notice title={'Password successfully created, click "Done" to finish'} />
            )}
            {noticeVisible && (
                <Link to="/login" className={css.link}><p>Done</p></Link>
            )}
        </RegistrationComponent>
    )
}

export { CreatePassword };