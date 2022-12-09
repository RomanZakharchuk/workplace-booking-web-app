import React from 'react';
import { Dashboard } from '../../pages/Dashboard/Dashboard';

const DashboardModule = {
    routeProps: [
        {
            path: '/dashboard',
            page: <Dashboard />,
            guarded: true,
        },
    ],
    name: 'Dashboard',
};

export default DashboardModule;