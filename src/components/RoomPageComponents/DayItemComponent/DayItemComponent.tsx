import css from './DayItemComponent.module.scss';

const DayItemComponent = () => {
    return (
        <div className={css.DayItemContainer}>
            <div className={css.wrapper}>
                <p className={css.dayOfWeek}>Sun</p>
                <p className={css.numberOfDay}>12</p>
            </div>
        </div>
    )
}

export { DayItemComponent };