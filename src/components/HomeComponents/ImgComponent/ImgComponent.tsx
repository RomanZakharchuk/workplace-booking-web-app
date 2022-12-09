import { FC } from "react";

type PropsType = {
    src: string;
    alt: string;
}

const ImgComponent: FC<PropsType> = ({alt,src}) => {
    return (
        <div>
            <img src={src} alt={alt}/>
        </div>
    )
}

export { ImgComponent };
