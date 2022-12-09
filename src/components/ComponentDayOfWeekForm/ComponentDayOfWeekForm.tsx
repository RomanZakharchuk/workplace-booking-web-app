import { FC, ReactNode } from "react";

import css from './ComponentDayOfWeekForm.module.scss';

type PropsType = {
    children?: ReactNode;
    isSelected: boolean;
    setIsSelected: any;
    day: string;
    register: any
}

const ComponentDayOfWeekForm: FC<PropsType> = (props) => {
    const {
        setIsSelected,
        isSelected,
        day,
        register
    } = props;

    return (
        <div
            className={css.dayOfWeekContainer}
            style={{ border: isSelected ? '2px solid #498AFE' : '' }}
        >
            <label
                className={css.dayOfWeek}
                onClick={setIsSelected}
                htmlFor={day}>{day}</label>
            <input
                {...register(day)}
                id={day}
                type="checkbox"
                defaultValue={day}
                style={{ display: 'none' }}
            />
        </div>
    )
}

export { ComponentDayOfWeekForm };