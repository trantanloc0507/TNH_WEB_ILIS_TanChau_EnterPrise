import React from 'react';
import { Marker, Polygon } from "react-google-maps";
import { checkInside } from "../../Containers/Converter";
import Type from "../../Redux/Type";
import { onMoveToMap } from "../../Containers/MapView";
import { getInfoByThuaDat, getInfoByThuaDatEnter } from "../../Containers/Search";
import { useDispatch, useSelector } from "react-redux";
import URL from "../../Containers/MainController";

const LopHienTrang = () => {
    const dispatch = useDispatch();
    const { listPolygon, showThuaDat, showOnZoom, pickedPolygon, makerPosition } = useSelector(state => state.hienTrang)
    const { showQuyHoach, listLabel } = useSelector(state => state.quyHoach);
    const typeServer = localStorage.getItem(URL.serverSelected)
    const onPolygonPress = ({ latLng }) => {
        dispatch({ type: Type.SET_MAIN_MESSAGE, message: '' })
        let point = {
            lat: parseFloat(latLng.lat()),
            lng: parseFloat(latLng.lng())
        },
            shape = null,
            i, k;


        for (i = 0; i < listPolygon.length; i++) {
            let flagBreak = false,
                item = listPolygon[i];
            for (k = 0; k < item['polygon'].length; k++) {
                if (checkInside(point, item['polygon'][k])) {
                    shape = item;
                    flagBreak = true;
                    break;
                }
            }
            if (flagBreak)
                break;
        }
        if (shape) {
            dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'makerPosition', value: point });
            dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'pickedPolygon', value: shape['polygon'] })
            if (typeServer == 'tnh') {
                let payload = {
                    MaDvhc: shape.KVHC_ID.toString(),
                    SoTo: shape.SOTO,
                    SoThua: shape.SOTHUA,
                    TenChu: ''
                };
                getInfoByThuaDat(payload, shape)
            } else {
                let payload = {
                    MaDvhc: shape.madvhc,
                    SoTo: shape.SOTO,
                    SoThua: shape.SOTHUA,
                    TenChu: ''
                };
                getInfoByThuaDatEnter(payload, shape)
            }
            onMoveToMap(point)
        }
    };
    return (
        <div>
            {
                listPolygon.map((item) => (
                    <Polygon
                        key={item.ID}
                        paths={item['polygon']}
                        defaultPaths={[]}
                        options={{
                            strokeColor: (showQuyHoach && listLabel.length) ? '#FFEB3B' : item.StokeColor,
                            fillColor: (showQuyHoach && listLabel.length) ? 'transparent' : item.StokeColor,
                            strokeWeight: 1
                        }}
                        onClick={onPolygonPress}
                        visible={showThuaDat && showOnZoom}
                    />
                ))}
            <Polygon
                paths={pickedPolygon}
                defaultPath={[]}
                options={{
                    strokeColor: '#18FFFF',
                    strokeWeight: 3,
                    fillColor: '#18FFFF',
                    zIndex: 100
                }}
                visible={!!pickedPolygon.length}
            />
            <Marker
                position={makerPosition}
                defaultOptions={{}}
                visible={!!pickedPolygon.length}
            />

        </div>
    )
}
export default LopHienTrang;
