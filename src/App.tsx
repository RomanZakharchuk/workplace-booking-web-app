import { ReactElement, useEffect } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import modules from './modules';
import store from './store/store';
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { OfficePage } from "./pages/OfficePage/OfficePage";
import { UserPage } from "./pages/UserPage/UserPage";
import { SettingPage } from "./pages/SettingPage/SettingPage";
import { MyProfilePage } from "./pages/MyProfilePage/MyProfilePage";
import { RoomPage } from "./pages/RoomPage/RoomPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const GuarderElement = ({
                            component,
                            isComponentGuarded
                        }: {component: ReactElement, isComponentGuarded?: boolean}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token && isComponentGuarded) navigate('/login');
    }, [ token ]);

    return component;
};

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {modules.map(module => module.routeProps.map((route: any) => (
                        <Route {...route} key={module.name}
                               element={<GuarderElement component={route.page} isComponentGuarded={route.guarded} />} />
                    )))}
                    <Route path={'/dashboard'}
                           element={<GuarderElement component={<Dashboard />} isComponentGuarded={true} />}>
                        <Route path={'office'} element={<OfficePage />} />
                        <Route path={'office/:nameRoom'} element={<RoomPage />} />
                        <Route path={'user'} element={<UserPage />} />
                        <Route path={'setting'} element={<SettingPage />} />
                        <Route path={'my-profile'} element={<MyProfilePage />} />
                    </Route>
                    <Route path={'*'} element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
