import LinkAPI, { onPostRequest, formatNumber } from './MainController';
import { store } from "../Redux/Store";
import { getQuyHoachColor, getUsedShapeColor } from "../Styles/Colors";
import Type from "../Redux/Type";
import { onMoveToMap, processPolygon, processResponseGeometry } from "./MapView";
import DataQuyHoachTTTC from '../Assets/quyhoachTTTC.json';
import { labelQuyHoachChiTiet } from "../Assets/LabelQuyHoach";
import { onOpenRightPanel } from "./RightPanelAction";

export const onLoadMenu = () => {
    let onSuccess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'menu', value: response })
        }
    }
    onPostRequest(LinkAPI.getMenuQuyHoach, onSuccess)
}

export const onLoadQuyHoachPolygon = (keyType) => {
    if (store.getState()['quyHoach']['selected']['geoType'])
        onShowOffQuyHoachInfoPanel();

    store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'isLoading', value: true })
    let onSuccess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            let label = [],
                labelObj = [],
                polygons = [],
                polyline = [],
                points = [],
                { coordinate } = store.getState()['quyHoach']['typeActive'];
            console.log(processResponseGeometry(response))
            response.forEach(e => {
                let type = mapGeoType[e.geoType],
                    item = {
                        id: e.ID,
                        fillColor: e.FillColor,
                        strokeColor: e.StokeColor,
                        weightLine: e.WeightLine,
                        geoType: type,
                        label: e.kyhieu,
                        icon: e.Icon,
                        polygon: processPolygon(e.polygon, e.geoType),
                        name: e.name
                    };
                if (item.polygon.length) {
                    if (!label.includes(e.kyhieu)) {
                        label = [...label, e.kyhieu]
                        let nextLabel = {
                            key: e.kyhieu,
                            value: e.name,
                            strokeColor: e.StokeColor
                        };
                        labelObj = [...labelObj, nextLabel]
                    }

                    switch (type) {
                        case mapGeoType.POLYGON:
                            polygons = [...polygons, item]
                            break;
                        case mapGeoType.LINESTRING: {
                            let loop = item.polygon;
                            loop.forEach((element, index) => {
                                let nextItem = {
                                    ...item,
                                    polygon: element,
                                    id: item.id + index
                                };
                                polyline = [...polyline, nextItem]
                            });
                            break;
                        }

                        case mapGeoType.POINT: {
                            let nextLabel = {
                                ...item,
                                polygon: item.polygon[0][0]
                            };
                            points = [...points, nextLabel]
                        }
                            break;
                        default:
                            break
                    }
                }
            })
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'listLabel', value: labelObj });
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'labelActive', value: label });
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'polygons', value: polygons });
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'polyline', value: polyline });
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'points', value: points });
            onMoveToMap(coordinate);
            onOpenRightPanel('zone');
        } else
            store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'errorMessage', value: response });

        store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'isLoading', value: false })
    }
    onPostRequest(LinkAPI.getPolygonQuyHoach(keyType), onSuccess)
}

export const onLoadQHChiTietTanChau = () => {
    let { coordinate } = store.getState()['quyHoach']['typeActive'],
        labelLayerQuyHoach = DataQuyHoachTTTC.map(e => e.MDSD),
        geoList = DataQuyHoachTTTC.map(e => ({
            label: e.MDSD,
            polygon: e.polygon,
            ...getQuyHoachColor(e.MDSD)
        })),
        labelList = labelQuyHoachChiTiet.map(e => ({
            key: e.key,
            value: e.value,
            ...getQuyHoachColor(e.key)
        }))
    labelList = labelList.sort((a, b) => sortListObject(a, b))
    store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'listLabel', value: labelList });
    store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'polygons', value: geoList });
    store.dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'labelActive', value: labelLayerQuyHoach });
    onMoveToMap(coordinate)
}

export const onLoadStatistical = (payload, onSuccess) => {
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            if (response.length) {
                response = response.filter(e => e.DTKhaoSat);
                response = response.map((e) => ({
                    ...e,
                    tile: Math.round((e.DTKhaoSat * 100 / e.DIENTICH))
                }))
                response = response.sort((a, b) => b.tile - a.tile)
                response = response.map((e, i) => ({
                    ...e,
                    key: i + 1
                }))
                let areaTotal = formatNumber(response[0]['TongDTKhaoSat']),
                    fieldTotal = formatNumber(response.length),
                    keyMDSD = [],
                    areaMDSD = [],
                    nameMDSD = []
                response.forEach(e => {
                    let index = keyMDSD.indexOf(e.MDSD)
                    if (index === -1) {
                        keyMDSD = [...keyMDSD, e.MDSD]
                        nameMDSD = [...nameMDSD, e.Ten]
                        areaMDSD = [...areaMDSD, e.DTKhaoSat]
                    } else {
                        areaMDSD[index] = areaMDSD[index] + e.DTKhaoSat
                    }
                });
                let mdsdTotal = keyMDSD.map((e, i) => ({
                    label: e,
                    name: nameMDSD[i],
                    area: areaMDSD[i]
                }))
                mdsdTotal = mdsdTotal.sort((a, b) => b.area - a.area)
                mdsdTotal = mdsdTotal.map((e, i) => ({ ...e, key: i + 1, area: `${formatNumber(e.area)} m2` }))

                response = response.map(e => ({
                    ...e,
                    DTKhaoSat: `${formatNumber(e.DTKhaoSat)} m2`,
                    tile: `${e.tile} %`
                }))
                response = {
                    areaTotal,
                    fieldTotal,
                    mdsdTotal,
                    detail: response
                }

            } else {
                response = {
                    areaTotal: 0,
                    fieldTotal: 0,
                    mdsdTotal: [],
                    detail: []
                }
            }
        }
        onSuccess({ statusCode, response })
    }
    onPostRequest(LinkAPI.getKhaoSatQuyHoach, onProcess, payload)
}

export function getQuyHoachInfo({ SoTo, SoThua, MaDvhc, TenChu }) {

    if (MaDvhc && SoThua && SoTo) {
        let quyHoachList = store.getState()['quyHoachInfo'];

        quyHoachList = quyHoachList.filter(e => (e.SoTo === SoTo
            && e.SoThua === SoThua
            && e.MaDvhc === MaDvhc));

        if (!quyHoachList.length) {
            let onProcess = ({ statusCode, response }) => {
                if (statusCode === 200) {
                    response = response.map(e => ({
                        quyhoach: e.quyhoach,
                        color: getUsedShapeColor(e.MucDichSuDung || e.MDSD)
                    }));
                    response = {
                        SoTo,
                        SoThua,
                        MaDvhc,
                        data: response
                    };
                    store.dispatch({ type: Type.SET_QUY_HOACH_ON_THUA_DAT, add: response })
                }
            };
            onPostRequest(LinkAPI.getQuyHoachInfo, onProcess, { SoTo, SoThua, MaDvhc, TenChu })
        }
    }


}

export const onShowQuyHoachInfoPanel = () => {
    store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'className', value: 'modal-custom-off' });
    setTimeout(() => {
        store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'isShow', value: false });
        store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeContent', value: '' });
    }, 100);

    let panel = document.querySelector('.qh-panel-info-visible');
    panel.style.setProperty('animation-name', 'on-show-on-from-left');
    panel.style.setProperty('-webkit-animation-name', 'on-show-on-from-left');
    panel.style.setProperty('opacity', 1);
    panel.style.setProperty('visibility', 'visible');
}

export const onShowOffQuyHoachInfoPanel = () => {
    let panel = document.querySelector('.qh-panel-info-visible');
    panel.style.setProperty('animation-name', 'on-show-off-from-left');
    panel.style.setProperty('-webkit-animation-name', 'on-show-off-from-left');
    panel.style.setProperty('opacity', 0);
    panel.style.setProperty('visibility', 'hidden');
    store.dispatch({ type: Type.SELECTED_QUYHOACH });
}


export const mapGeoType = {
    'LINESTRING': 'polyline',
    'MULTILINESTRING': 'polyline',
    'POLYGON': 'polygon',
    "MULTIPOLYGON": 'polygon',
    'POINT': 'point'
}

const sortListObject = (a, b) => {
    let nameA = a.key.toUpperCase(),
        nameB = b.key.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
