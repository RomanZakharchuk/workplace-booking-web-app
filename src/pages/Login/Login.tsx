import { Description, ForgotPassword, LoginForm } from "../../components/LoginPageComponents";
import { RegistrationComponent } from "../../components/RegistrationComponent/RegistrationComponent";

export const Login = () => {
    return (
        <RegistrationComponent>
            <Description
                title={'Best manegment system'}
                text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.'}
            />
            <LoginForm />
            <ForgotPassword />
        </RegistrationComponent>
    )
};