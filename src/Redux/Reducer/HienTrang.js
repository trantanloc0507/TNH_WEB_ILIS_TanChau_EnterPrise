import Type from "../Type";

const initState = {
    listPolygon:[],
    showThuaDat:false,
    shapePolygon:[],
    lastCoordinate:'',
    makerPosition:{},
    pickedPolygon:[],
    showOnZoom:true,
    dataThuaDatPicked:{},
    dataThuaDatPickedKhongThuocTinh:null,
    giadat: null,
    dataTrichDoPicked:null
}

const HienTrang = (state = initState,{type,route,value})=>
{
    if (type === Type.SET_STATE_HIEN_TRANG)
        return {
            ...state,
            [route]:value
        }
    else if (type === Type.CLEAR_MAKER)
        return  {
            ...state,
            pickedPolygon:[],
            makerPosition:{}
        }
    else
        return  state;
}

export default HienTrang
