import Type from "../Type";

const initState = {
    // listPolygon:[],
    // showThuaDat:false,
    // shapePolygon:[],
    // lastCoordinate:'',
    // makerPosition:{},
    // pickedPolygon:[],
    // showOnZoom:true,
    // dataThuaDatPicked:{},
    giadat: null,
   // dataTrichDoPicked:null
}

const GiaDat = (state = initState,{type,route,value})=>
{
    if (type === Type.SET_STATE_GIA_DAT)
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

export default GiaDat
