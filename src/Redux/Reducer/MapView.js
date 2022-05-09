import Type from "../Type";
import setup from "../../Containers/setup";

const initState = {
    refMapView: null,
    currentZoom: setup.defaultZoom,
    showModal: false,
    typeMapId: 'hybrid',
    typeServer: 'tnh'
}

const MapViewReducer = (state = initState, { type, value }) => {
    switch (type) {
        case Type.REF_MAP_VIEW:
            return { ...state, refMapView: value }
        case Type.SET_CURRENT_ZOOM_SCALE:
            return { ...state, currentZoom: value }
        case Type.SET_SHOW_MAIN_MODAL:
            return { ...state, showModal: !state.showModal }
        case Type.SET_TYPE_MAP:
            return { ...state, typeMapId: value }
        case Type.SET_TYPE_SERVER:
            return { ...state, typeServer: value }
        default: return state;
    }
}

export default MapViewReducer
