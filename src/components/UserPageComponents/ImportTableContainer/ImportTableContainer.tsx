import css from './ImportTableContainer.module.scss';

const ImportTableContainer = () => {
    return (
        <div className={css.importTableContainer}>
            <h3 className={css.title}>Instruction</h3>
            <p className={css.text}>This tool will only import users. Make sure to include your full students list.</p>
            <h3 className={css.title}>Example import sheets:</h3>
            <a href="" className={css.link}>Desired Student Import Template Example</a>
            <a href="" className={css.link}>Student Blank Template Import</a>
        </div>
    )
}

export { ImportTableContainer };