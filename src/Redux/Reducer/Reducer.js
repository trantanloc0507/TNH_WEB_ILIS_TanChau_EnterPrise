import { combineReducers } from "redux";
import Type from "../Type";
import Search from "./Search";
import Drawing from "./Drawing";
import HienTrang from "./HienTrang";
import GiaDat from "./GiaDat";
import QuyHoachReducer, { QuyHoachInfo } from "./QuyHoach";
import RightPanelReducer from "./RightPanel";
import MapViewReducer from "./MapView";

export const Userinfo = (state = '', action) => {
    if (action.type === Type.SET_USER_INFO) {
        return action.userInfo;
    }
    return state;
};

export const UserInfoEnter = (state = '', action) => {
    if (action.type === Type.SET_USER_INFO_ENTER) {
        return action.userInfo;
    }
    return state;
};

export const SignOut = (state = () => { }, action) => {
    if (action.type === 'SET_SIGN_OUT') {
        return action.signOutAction;
    }
    return state;
};

export const Token = (state = '', { type, token }) => {
    if (type === Type.SET_TOKEN) {
        return token;
    }
    return state;
};
export const TokenEnter = (state = '', { type, token }) => {
    if (type === Type.SET_TOKEN_ENTER) {
        return token;
    }
    return state;
};

const MainAlertMessage = (state = '', { type, message }) => {
    if (type === Type.SET_MAIN_MESSAGE)
        return message
    return state;
}

export default combineReducers({
    userInfo: Userinfo,
    UserInfoEnter: UserInfoEnter,
    signOut: SignOut,
    token: Token,
    TokenEnter: TokenEnter,
    searchState: Search,
    quyHoachInfo: QuyHoachInfo,
    drawingTool: Drawing,
    hienTrang: HienTrang,
    quyHoach: QuyHoachReducer,
    giadat: GiaDat,
    mainAlertMessage: MainAlertMessage,
    rightPanel: RightPanelReducer,
    mapView: MapViewReducer
});
