import React from 'react';

import { Login } from "../../pages/Login/Login";
import { ResetEmail } from "../../pages/ResetEmail/ResetEmail";
import { ResetPassword } from "../../pages/ResetPassword/ResetPassword";
import { CreatePassword } from "../../pages/CreatePassword/CreatePassword";

const AuthModule = {
    routeProps: [
        {
            path: '/login',
            page: <Login />
        },
        {
            path: '/reset-email',
            page: <ResetEmail />
        },
        {
            path: '/reset-password',
            page: <ResetPassword />
        },
        {
            path: '/create-password',
            page: <CreatePassword />
        }
    ],
    name: 'Auth',
};

export default AuthModule;