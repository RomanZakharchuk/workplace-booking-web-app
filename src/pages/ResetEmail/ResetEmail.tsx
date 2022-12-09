import { FC, useState } from "react";

import { Description } from "../../components/LoginPageComponents";
import { Notice, ResetEmailForm } from "../../components/ResetPageComponents";
import { RegistrationComponent } from "../../components/RegistrationComponent/RegistrationComponent";

const ResetEmail: FC = () => {
    const [ noticeVisible, setNoticeVisible ] = useState<boolean>(false);

    const hideForm = (): void => {
        setNoticeVisible(true)
    }

    return (
        <RegistrationComponent>
            <Description
                title={'Reset your password'}
                text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.'}
            />
            {!noticeVisible && (
                <ResetEmailForm hideForm={hideForm} />
            )}
            {noticeVisible && (
                <Notice title={'A link to change your password was sent to your email'} />
            )}
        </RegistrationComponent>
    )
}

export { ResetEmail };