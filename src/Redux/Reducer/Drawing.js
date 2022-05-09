import DrawingMode from "../../Components/Drawing/Mode";
import Type from "../Type";


const initDrawingState = {
    showTool:false,
    drawingMode:DrawingMode.STOP,
    evtPath:null
}

const Drawing = (state = initDrawingState, {type,evt})=>
{
    switch (type)
    {
        case Type.SHOW_ON_DRAWING: return {...state,showTool: true};
        case Type.SHOW_OFF_DRAWING: return initDrawingState;
        case Type.STOP_DRAWING: return {...state,drawingMode: DrawingMode.STOP};
        case Type.START_DRAWING: return {...state,drawingMode: DrawingMode.POLYGON};
        case Type.CLEAR_PATH_DRAWING: {
            if (state.evtPath)
                state.evtPath.setMap(null);
            return {...state,evtPath: null};
        }
        case Type.SET_EVT_DRAWING: return {...state,evtPath: evt}
        default: return state;
    }

}

export default Drawing
