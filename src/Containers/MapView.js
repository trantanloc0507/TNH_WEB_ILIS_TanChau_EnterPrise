import LinkAPI, { onPostRequest, onGetRequestEnterPriseBody, onPostRequestEnterPriseBody } from './MainController';
import { convertXYToLatLon, convertLatLonToXY, convertXYPolygon, getDistance } from './Converter';
import { getShapeColor } from '../Styles/Colors';
import setup from "./setup";
import { store } from "../Redux/Store";
import Type from "../Redux/Type";
import WKT from "./WKT";
import { mapGeoType } from "./QuyHoach";
import { v4 as uuidv4 } from 'uuid';
import { dataConfig } from "./quyhoachCofigEnter";

export function getPolygonByToThua({ SoTo, SoThua, MaDvhc, TenChu }) {
    store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataTrichDoPicked', value: null });
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            if (response.length) {
                // response = processResponseGeometry(response,true);
                response = response[0]
                let polygon = processPolygon(response.polygon, "POLYGON", true)
                response = {
                    ...response,
                    polygon,
                    center: getCenterPoint(polygon[0])
                };
                let centerPoint = getCenterPoint(response.polygon[0])
                onMoveToMap(centerPoint)
                store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'makerPosition', value: centerPoint });
                store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'pickedPolygon', value: response.polygon });
                store.dispatch({
                    type: Type.SET_STATE_HIEN_TRANG,
                    route: 'dataTrichDoPicked',
                    value: convertXYPolygon(response.polygon[0])
                });
            } else
                store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy dữ liệu bản đồ' })
        } else {
            store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy dữ liệu bản đồ' })
        }
    };
    onPostRequest(LinkAPI.getPolygonByToThua, onProcess, { SoTo, SoThua, MaDvhc, TenChu });
}

export function getPolygonByToThuaEnter({ SoTo, SoThua, idbando, idThuaDat }) {

    store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataTrichDoPicked', value: null });
    const payload = [
        idThuaDat
    ]
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            if (response.length) {
                let responseThua = null;
                response.forEach(e => {
                    if (e.idthuadat == idThuaDat) {
                        responseThua = e;
                    }
                });
                if (responseThua) {
                    let polygon = processPolygon(responseThua.geojson, "POLYGON", true)
                    responseThua = {
                        ...responseThua,
                        polygon,
                        center: getCenterPoint(polygon[0])
                    };
                    let centerPoint = getCenterPoint(responseThua.polygon[0])
                    onMoveToMap(centerPoint)
                    store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'makerPosition', value: centerPoint });
                    store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'pickedPolygon', value: responseThua.polygon });
                    store.dispatch({
                        type: Type.SET_STATE_HIEN_TRANG,
                        route: 'dataTrichDoPicked',
                        value: convertXYPolygon(responseThua.polygon[0])
                    });
                } else {
                    store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy dữ liệu bản đồ' })
                }
            } else
                store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy dữ liệu bản đồ' })
        } else {
            store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy dữ liệu bản đồ' })
        }
    };
    onPostRequestEnterPriseBody(LinkAPI.getPolygonByToThuaEnter, onProcess, payload);
}

export function getPolygonByDistance({ lat, lng }) {
    let { lastCoordinate } = store.getState()['hienTrang'],
        distance = 0;


    // lấy khoảng cách giữa lần load trước và hiện tại
    if (lastCoordinate) {
        let loadCoordinate = {
            latitude: lat,
            longitude: lng,
        };
        distance = getDistance(lastCoordinate, loadCoordinate);
    }

    if (!distance || distance >= 120) {
        let pointXY = {
            latitude: lat,
            longitude: lng
        };
        pointXY = convertLatLonToXY(pointXY);
        let payload = {
            Px: pointXY.x.toString(),
            Py: pointXY.y.toString(),
            Di: setup.distanceLoad,
        },
            onProcess = ({ statusCode, response }) => {
                if (statusCode === 200) {
                    try {
                        response = response.map(e => {
                            return {
                                ...e,
                                ...getShapeColor(e.LOAIDAT),
                                polygon: processPolygon(e.polygon, 'POLYGON', true)
                            }
                        });
                        response = response.filter(e => !!e.polygon.length);
                        store.dispatch({
                            type: Type.SET_STATE_HIEN_TRANG,
                            route: 'lastCoordinate',
                            value: { latitude: lat, longitude: lng }
                        });
                        store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'listPolygon', value: response })
                    } catch (e) {
                        console.log(e);
                    }
                }
            };
        onPostRequest(LinkAPI.getPolygonByDistance, onProcess, payload);
    }
}

export function getPolygonByDistance2({ topRightPoint, bottomLeftPoint, centerPoint, zoom }) {
    centerPoint = {
        latitude: centerPoint.lat,
        longitude: centerPoint.lng
    };
    centerPoint = convertLatLonToXY(centerPoint);
    let distance = getDistance(topRightPoint, bottomLeftPoint) / 2,
        payload = {
            Latitude: centerPoint.x,
            Longitude: centerPoint.y,
            Distance: distance,
            Zoom: zoom
        },
        onProcess = ({ statusCode, response }) => {
            if (statusCode === 200) {
                try {
                    response = response.map(e => {
                        return {
                            ...e,
                            polygon: processPolygon(e.polygon, 'POLYGON', true)
                        }
                    });
                    response = response.filter(e => !!e.polygon.length);
                    store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'listPolygon', value: response })
                } catch (e) {
                    console.log(e);
                }
            }
        };
    onPostRequest(LinkAPI.getPolygonByDistance2, onProcess, payload);
}

export function getPolygonByDistance2Enter({ topRightPoint, bottomLeftPoint, centerPoint, zoom }) {
    centerPoint = {
        latitude: centerPoint.lat,
        longitude: centerPoint.lng
    };
    centerPoint = convertLatLonToXY(centerPoint);
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            try {
                response = response.map(e => {
                    const colorThuaDat = dataConfig.mapping[e.loaidat] ? dataConfig.mapping[e.loaidat] : 'gray';
                    return {
                        ...e,
                        ID: e.objectid,
                        SOTO: e.soto,
                        SOTHUA: e.sothua,
                        LOAIDAT: e.loaidat,
                        DIENTICH: e.dientich,
                        StokeColor: dataConfig.strokeColor[colorThuaDat],
                        FillColor: dataConfig.fillColor[colorThuaDat],
                        WeightLine: dataConfig.weightLine[colorThuaDat],
                        Icon: dataConfig.icon[colorThuaDat],
                        polygon: processPolygonEnter(e.polygons[0], 'MULTIPOLYGON', true)
                    }
                });
                response = response.filter(e => !!e.polygon.length);
                store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'listPolygon', value: response })
            } catch (e) {
                console.log(e);
            }
        }
    };
    onGetRequestEnterPriseBody(LinkAPI.getPolygonByDistanceEnter(centerPoint.x, centerPoint.y, (getDistance(topRightPoint, bottomLeftPoint) / 2) ? (getDistance(topRightPoint, bottomLeftPoint) / 2).toFixed(0) : 0), onProcess);
}

export function processPolygon(strPoly, geoType, isConvert) {
    let polygon = [];
    strPoly = strPoly.replace(geoType, "")
    strPoly = strPoly.split("(");
    strPoly = strPoly.filter(e => e.trim())
    strPoly = strPoly.map(e => e.trim().replace("),", "").replace("))", "").trim());

    strPoly.forEach((e, i) => {
        let coordinateArray = e.split(","),
            _p = [];
        coordinateArray.forEach(e => {
            let _e = e.trim(),
                _list = _e.split(" ");

            if (_list.length === 2) {
                let x = _list[1].replace(/[()]/g, '').trim(),
                    y = _list[0].replace(/[()]/g, '').trim();
                if (!isNaN(x) && !isNaN(y)) {
                    x = parseFloat(x);
                    y = parseFloat(y);
                    let coordinate = isConvert ?
                        convertXYToLatLon({ x, y })
                        :
                        { lat: x, lng: y }
                    _p = [..._p, coordinate]
                }
            }
        });
        if (_p.length)
            polygon = [...polygon, _p]
    });
    return polygon
}

export function processPolygonEnter(strPoly, geoType, isConvert) {
    let polygon = [];
    strPoly = strPoly.replace(geoType, "")
    strPoly = strPoly.split("(");
    strPoly = strPoly.filter(e => e.trim())
    strPoly = strPoly.map(e => e.trim().replace("),", "").replace("))", "").trim());

    strPoly.forEach((e, i) => {
        let coordinateArray = e.split(","),
            _p = [];
        coordinateArray.forEach(e => {
            let _e = e.trim(),
                _list = _e.split(" ");

            if (_list.length === 2) {
                let x = _list[1].replace(/[()]/g, '').trim(),
                    y = _list[0].replace(/[()]/g, '').trim();
                if (!isNaN(x) && !isNaN(y)) {
                    x = parseFloat(x);
                    y = parseFloat(y);
                    // let coordinate = isConvert ?
                    //     convertXYToLatLon({ x, y })
                    //     :
                    //     { lat: x, lng: y }
                    _p = [..._p, { lat: x, lng: y }]
                }
            }
        });
        if (_p.length)
            polygon = [...polygon, _p]
    });
    return polygon
}

export const processResponseGeometry = (response, isConvert) => {
    if (Array.isArray(response)) {
        let nextResponse = [],
            listID = [];
        response.forEach((e) => {
            let nextGeo = WKT.parse(e.polygon, isConvert),
                isIdInclude = listID.includes(e.ID)
            if (!isIdInclude)
                listID = [...listID, e.ID];

            // if (e.ID === 9608)
            //     console.log(e)

            nextGeo.geometry.forEach((elem, index) => {

                let item = {
                    ...e,
                    k: e.ID,
                    ID: e.ID,
                    geoType: nextGeo.geoType,
                    polygon: elem
                };
                if (item.polygon.length) {
                    if (nextGeo.geoType === mapGeoType.POLYGON)
                        nextResponse = [...nextResponse, item];
                    else {
                        item.polygon.forEach((line) => {
                            let itemLine = {
                                ...item,
                                polygon: line,
                                ID: uuidv4()
                            };
                            nextResponse = [...nextResponse, itemLine];
                        })
                    }
                }
            })
        })
        return nextResponse
    }
    return []
}

function getCenterPoint(arr) {
    let x = arr.map(e => e.lat);
    let y = arr.map(e => e.lng);
    let cx = (Math.min(...x) + Math.max(...x)) / 2;
    let cy = (Math.min(...y) + Math.max(...y)) / 2;
    return { 'lat': cx, 'lng': cy };
}

export const onMoveToMap = ({ lat, lng }) => {
    let map = store.getState()['mapView']['refMapView'];
    if (map) {
        map.panTo({ lat, lng })
    }
}

