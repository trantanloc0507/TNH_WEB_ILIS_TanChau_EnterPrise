import React from 'react';
import MapView from "./MapView";
import LopQuyHoach from '../QuyHoach/LopQuyHoach';
import LopHienTrang from "../HienTrang/LopHienTrang";
import Drawing from "../Drawing";
import setup from "../../Containers/setup";
import RightPanel from "./RightPanel";
import { useSelector } from "react-redux";
import PanelQuyHoachInfo from "../QuyHoach/PanelQuyHoachInfo";

const Container = () => {
    const { typeMapId } = useSelector(state => state.mapView)
    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    return (
        <div style={styles.container}>
            <div style={styles.mapContainer}>
                <MapView
                    googleMapURL={setup.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={styles.mapView} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    zoomControl={false}
                    defaultCenter={setup.startCoordinate}
                    mapTypeId={typeMapId}
                >
                    <LopQuyHoach />
                    {
                        (userInfo || userInfoEnter) ? <LopHienTrang /> : null
                    }
                    <Drawing />
                </MapView>
            </div>
            <RightPanel />
            <PanelQuyHoachInfo />
        </div>
    )
}

export default Container;

const styles = {
    container: {
        position: 'fixed',
        top: 48,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    mapContainer: {
        flex: 1, backgroundColor: '#eee', display: 'flex', position: 'relative'
    },
    mapView: {
        top: 0, right: 0,
        bottom: 0,
        left: 0,
        position: "absolute"
    },
};
