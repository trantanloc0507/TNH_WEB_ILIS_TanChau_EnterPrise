import Type from "../Type";

const initState = {
    menu:[],
    showQuyHoach:false,
    typeActive:{},
    isLoading:false,
    errorMessage:'',
    labelActive:[],
    listLabel:[],
    polygons:[],
    polyline:[],
    points:[],
    selected:{}
}

const QuyHoachReducer = (state = initState,{type,route,value})=>
{
    if (type === Type.SET_STATE_QUY_HOACH)
        return {
            ...state,
            [route]:value
        }
    else if (type === Type.SELECTED_QUYHOACH)
        return  {
            ...state,
            selected: value || {}
        }
    return state;
}

export const QuyHoachInfo = (state = [], {type,add}) => {

    if (type === Type.SET_QUY_HOACH_ON_THUA_DAT) {
        if (add.SoTo && add.SoThua && add.MaDvhc)
            return [...state,add]

    }
    return state;
};

export default QuyHoachReducer
