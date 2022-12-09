import { FC } from "react";

import { ImgComponent } from "../../ImgComponent/ImgComponent";
import css from './InnerEmployee.module.scss';

type PropsType = {
  src: string;
  alt: string;
  name: string;
  position: string;
};

const InnerEmployee: FC<PropsType> = ({src,alt,position,name}) => {
    return (
        <div className={css.innerEmployee}>
            <ImgComponent src={src} alt={alt}/>
            <span className={css.name}>{name}</span>
            <span className={css.position}>{position}</span>
        </div>
    )
}

export {InnerEmployee};