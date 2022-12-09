import { FC } from "react";

type PropsType = {
    color: string;
}

const PalygonUpSvg: FC<PropsType> = ({ color }) => {
    return (
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0L0.535898 4.5L7.4641 4.5L4 0Z" fill={color} />
        </svg>
    )
}

export { PalygonUpSvg };