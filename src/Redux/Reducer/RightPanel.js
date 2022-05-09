import Type from "../Type";

const initState = {
    isShow:false,
    className:'',
    routeContent:'',
    routeFrom:'',
}

const RightPanelReducer = (state=initState,{type,route,value})=>
{
    if (type === Type.SET_STATE_RIGHT_PANEL)
        return {
            ...state,
            [route]:value
        }
    return state;
}

export default RightPanelReducer
