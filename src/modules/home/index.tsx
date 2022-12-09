import React from "react";
import { Home } from "../../pages/Home/Home";

const LandingModule = {
    routeProps: [
        {
            path: '/',
            page: <Home />
        },
        {
            path: '/home',
            page: <Home />
        }
    ],
    name: 'landing'
};

export default LandingModule;
