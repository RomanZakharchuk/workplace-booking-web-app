import { FC } from "react";

type PropsType = {
    colorIconDelete: string;
}

const DeleteSvg: FC<PropsType> = ({colorIconDelete}) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.593 6.36938C12.593 11.7154 13.3625 14.1319 8.18661 14.1319C3.0101 14.1319 3.7955 11.7154 3.7955 6.36938"
                stroke={colorIconDelete} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5766 4.3199H2.80957" stroke={colorIconDelete} strokeWidth="1.3" strokeLinecap="round"
                  strokeLinejoin="round" />
            <path
                d="M10.4762 4.3198C10.4762 4.3198 10.8286 1.80933 8.19242 1.80933C5.55686 1.80933 5.90924 4.3198 5.90924 4.3198"
                stroke={colorIconDelete} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export { DeleteSvg };