import LinkAPI, { onPostRequest, onRequestEnterPrise, decodeResponse } from './MainController';
import { store } from '../Redux/Store';
import Type from "../Redux/Type";

export function onAuthentication(payload, onSuccess) {
    console.log('payload: ', payload)
    let onProcessLogin = ({ statusCode, response }) => {
        onProcess({ statusCode, response }, onSuccess);
    };
    onPostRequest(LinkAPI.login, onProcessLogin, payload);
}

export function onAuthenticationEnterPrise(payload, temp, onSuccess) {
    let onProcessLogin = ({ statusCode, response }) => {
        if(statusCode === 200){
            onProcessEnterPrise({ statusCode, response }, temp, onSuccess);
        }else{
            const err = {
                statusCode: 400,
                response: 'Sai thông tin đăng nhập hoặc mật khẩu'
            }
            onSuccess(err);
        }
    };
    onRequestEnterPrise(LinkAPI.loginEnterPrise, onProcessLogin, payload);
}

// export function onForgetPassWord(payload, onSuccess) {
//     let onProcessLogin = ({ statusCode, response }) => {
//         console.log('statusCodestatusCodestatusCodexxxx: ', statusCode)
//         //onProcess({ statusCode, response }, onSuccess);
//         // if(statusCode === 200){
//         //     onProcessEnterPrise({ statusCode, response }, temp, onSuccess);
//         // }else{
//         //     const err = {
//         //         statusCode: 400,
//         //         response: 'Sai thông tin đăng nhập hoặc mật khẩu'
//         //     }
//         //     onSuccess(err);
//         // }
//     };
//     onRequestEnterPrise(LinkAPI.ForgetPassWordEnter, onProcessLogin, payload);
// }

export function onChangePassWord(payload, onSuccess) {
    let onProcessChangePassword = ({ statusCode, response }) => {
        onProcess({ statusCode, response }, onSuccess);
    };
    onPostRequest(LinkAPI.changePassWord, onProcessChangePassword, payload);
}

const onProcess = ({ statusCode, response }, onSuccess) => {
    if (statusCode === 200) {
        localStorage.setItem(LinkAPI.token, response)
        let userInfo = decodeResponse(response);
        userInfo = JSON.parse(userInfo);
        store.dispatch({ type: Type.SET_USER_INFO, userInfo });
        store.dispatch({ type: Type.SET_TOKEN, token: response });
        onSuccess({ statusCode, response });
    } else {
        onSuccess({ statusCode, response });
    }
};

const onProcessEnterPrise = ({ statusCode, response }, temp, onSuccess) => {
    if (statusCode === 200) {
        const token = response ? response.access_token : '';
        localStorage.setItem(LinkAPI.tokenEnterPrise, token);

        let payload = new URLSearchParams();
        payload.append('access_token', response.access_token);
        let onGetInfo = ({ statusCode, response }) => {
            if (statusCode === 200) {
                const userInfo = {
                    Expired: null,
                    FullName: response.name,
                    Organization: null,
                    Password: temp.password,
                    PhoneNumber: response.phone_number,
                    Username: temp.username
                }
                store.dispatch({ type: Type.SET_USER_INFO_ENTER, userInfo });
                store.dispatch({ type: Type.SET_TOKEN_ENTER, token: token });
            }
        };
        onRequestEnterPrise(LinkAPI.getInfo, onGetInfo, payload);
        onSuccess({ statusCode, response });
    } else {
        onSuccess({ statusCode, response });
    }
};
