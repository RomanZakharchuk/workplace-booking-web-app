import { FC } from "react";

type PropsType = {
    color: string;
}

const DotsSvg: FC<PropsType> = ({color}) => {
    return (
        <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="2" fill={color} />
            <circle cx="2" cy="9" r="2" fill={color} />
            <circle cx="2" cy="16" r="2" fill={color} />
        </svg>
    )
}

export { DotsSvg };