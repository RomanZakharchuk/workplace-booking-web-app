import css from './NotFoundPage.module.scss';
import Page404 from '../../assets/png/PngItem_7659732.png';

const NotFoundPage = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <div className={css.wrapTitle}>
                    <h1 className={css.title}>404 - The page was not found.</h1>
                    <p className={css.text}>
                        Oops! We can’t find the page you are looking for. Try starting from the <a
                        className={css.link}
                        href="/home">homepage</a> or visit our
                        blog to help point you in the right direction.
                    </p>
                    <a className={css.linkBtn} href="/home">Back to home</a>
                </div>
                
                <div className={css.wrapImg}>
                    <img src={Page404} alt="404 - The page was not found" />
                </div>
            </div>
        </div>
    )
}

export { NotFoundPage };