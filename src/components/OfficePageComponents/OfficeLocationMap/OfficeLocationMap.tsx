import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import css from "./OfficeLocationMap.module.scss";
import { center, containerStyle, GOOGLE_API_KEY } from "./map.constants";
import { setActiveOffice } from "../../../modules/dashboard/store/office-store/office.actions";
import { AppState } from "../../../store/store";
import { IOffice } from "../../../interfaces/office.interface";

const OfficeLocationMap: FC = () => {
    const dispatch = useDispatch();
    const offices = useSelector((store: AppState) => store.offices.offices);
    const activeOffice = useSelector((store: AppState) => store.offices.activeOffice);
    const mapRef = useRef(null);
    const [currentZoom, setCurrentZoom] = useState(15);

    const officesToDisplay = activeOffice ? [activeOffice] : offices;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY
    });

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setTimeout(() => {
            setCurrentZoom(13);
        }, 500);
    }, []);

    return (
        <div className={css.wrapMap}>
            {isLoaded ? (
                <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    zoom={currentZoom}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true
                    }}
                    onClick={() => dispatch(setActiveOffice(null as unknown as any))}
                >
                    {officesToDisplay.map((office: IOffice) => {
                        return office.address.latitude ? (
                            <Marker
                                key={office.id}
                                position={{
                                    lat: Number(office.address.latitude),
                                    lng: Number(office.address.longitude),
                                }}
                                onClick={() => dispatch(setActiveOffice(office))}
                            />
                        ) : <></>
                    })}
                    <></>
                </GoogleMap>
            ) : <></>}
        </div>
    )
}

export { OfficeLocationMap };