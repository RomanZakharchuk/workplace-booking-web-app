import { FC, useState } from "react";

import css from './CalendarComponent.module.scss';
import Dot from '../../../assets/svg/Dot.svg';
import ArrowLeft from '../../../assets/svg/arrows/arrow-left.svg';
import ArrowRight from '../../../assets/svg/arrows/arrow-right.svg';
import { DayItemComponent } from "../DayItemComponent/DayItemComponent";

const CalendarComponent: FC = () => {
    const [activeSwitchBtn, setActiveSwitchBtn] = useState<boolean>( false );

    return (
        <div className={css.calendarComponent}>
            <div className={css.headerCalendarContainer}>
                    <div className={css.currentDataContainer}>
                        <div className={css.imageContainer}>
                            <img src={Dot} alt="Dot" />
                        </div>

                        <p className={css.dataText}>October 2022</p>
                    </div>

                    <div className={css.btnGroupHeaderContainer}>
                        <div
                            onClick={() => setActiveSwitchBtn(true)}
                            className={`${css.switchBtn} ${activeSwitchBtn ? css.isActiveBtn : css.inActiveBtn}`}>Days
                        </div>
                        <div
                            onClick={() => setActiveSwitchBtn(false)}
                            className={`${css.switchBtn} ${activeSwitchBtn ? css.inActiveBtn : css.isActiveBtn}`}>Month
                        </div>
                    </div>
                </div>

                <div className={css.calendarContainer}>
                    <div className={css.dayItemContainer}>
                        {/* DayItemComponent is a temporarily*/}
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                        <DayItemComponent />
                    </div>

                    <div className={css.calendarBtnGroupContainer}>
                        <div className={css.btnBack}>
                            <div className={css.arrowContainer}>
                                <img src={ArrowLeft} alt={"arrow"} />
                            </div>
                            <p className={css.btnText}>Back</p>
                        </div>
                        <div className={css.btnNext}>
                            <p className={css.btnText}>Next</p>
                            <div className={css.arrowContainer}>
                                <img src={ArrowRight} alt={"arrow"} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export { CalendarComponent };