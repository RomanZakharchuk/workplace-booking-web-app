import { FC } from "react";

import {
    FeaturePacked,
    Focus, FollowUs, Footer,
    Header, LandingForm,
    OurTeam,
    Platform,
    PowerAndFlexibility
} from "../../components/HomeComponents";
import css from './Home.module.scss';

const Home: FC = () => {
    return (
        <div className={css.home}>
            <Header />
            <FeaturePacked />
            <Platform />
            <Focus />
            <OurTeam />
            <PowerAndFlexibility />
            <FollowUs />
            <LandingForm />
            <Footer />
        </div>
    )
}

export { Home };