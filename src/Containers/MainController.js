import Axios from 'axios';
import CryptoJS from 'crypto-js';
import { store } from '../Redux/Store';
import Type from "../Redux/Type";
import setup from "./setup";
const apiLink = setup.apiDebug;

const apiLinkEnterprise = 'https://ilis-sso.vnpt.vn/'
const apiLinkEnterpriseBody = 'https://ilis-cadas-api.vnpt.vn/'

const secretKey = '123456qwertyasdfghzxcvbn!@#$%^';

const URL = {
    login: `${apiLink}Users/SignIn`,
    changePassWord: `${apiLink}Users/ChangePassword`,
    //getPolygonByDistance: `${apiLink}BanDo/GetPolygonByCoord`,
    getPolygonByDistance2: `${apiLink}BanDo/GetPolygonByDistance`,
    getPolygonByToThua: `${apiLink}BanDo/GetPolygonByThuaDat`,
    getTreeDVHC: (maTinh, capDo) =>
        `${apiLink}HanhChinh/GetDVHC?maTinh=${maTinh}&CapDo=${capDo}`,
    searchByToThua: `${apiLink}HienTrang/SearchThuaDatByToThua`,
    searchByName: `${apiLink}HienTrang/SearchThuaDatByTenChu`,
    getGiaDat: `${apiLink}HienTrang/SearchThuaDatByToThuaV1`,
    getQuyHoachInfo: `${apiLink}QuyHoach/GetThongTinQuyHoach`,
    getKhaoSatQuyHoach: `${apiLink}QuyHoach/GetThongKeKhaoSatQuyHoach`,
    getPolygonQuyHoach: key => `${apiLink}QuyHoach/GetPolygonQuyHoach?type=${key}`,
    getMenuQuyHoach: `${apiLink}QuyHoach/GetMenuQuyHoach`,
    getQuyHoachLayer: `${apiLink}ilis/wsilis_getDSPolygonQHTheoKhoangCach`,
    checkPermissionAddNote: `${apiLink}ghichu/checkPermissionAddNote`,
    uploadHinhAnh: (thuadat) =>
        `${apiLink}ghichu/uploadHinhAnh?soto=${thuadat.soto}&sothua=${thuadat.sothua}&madvhc=${thuadat.madvhc}`,
    loadListNoteByThuaDat: `${apiLink}ghichu/getListGhiChuByThuaDat`,
    loadListNoteByAccount: `${apiLink}ghichu/getListGhiChuByAccount`,
    createGhiChu: `${apiLink}ghichu/createGhiChu`,
    xoaGhiChu: `${apiLink}ghichu/xoaGhiChu`,
    root: apiLink,
    token: '@DataUser',
    serverSelected: '@Server',

   
    loginEnterPrise: `${apiLinkEnterprise}connect/token`,
    ForgetPassWordEnter: `${apiLinkEnterprise}Account/ForgotPassword`,
    getPolygonByDistanceEnter: (X, Y, khoangCach) => `${apiLinkEnterpriseBody}api/ThuaDat/GetThuaDatAndPolygonByDistanceAsync?pointX=${Y}&pointY=${X}&size=${khoangCach}`,
    getPolygonByToThuaEnter: `${apiLinkEnterpriseBody}api/ThuaDat/GetByDSThuaDat`,
    getDVHCEnterprise: (id) => `${apiLinkEnterpriseBody}api/Authorize/parent/${id}`,
    searchSoToDVHC: (soTo, dvhc) => `${apiLinkEnterpriseBody}api/ToBanDo/SoTo/${soTo}/${dvhc}`,
    searchSoThuaDVHC: (soThua, idBanDo) => `${apiLinkEnterpriseBody}api/DangKyQSDD/SearchViewDangKyDemo?PageSize=1000&CurentPage=1&tukhoa=${soThua}&searchExactly=true&idtobando=${idBanDo}`,
    searchByNameEnter: (name, iddvhc) => `${apiLinkEnterpriseBody}api/DangKyQSDD/SearchViewDangKyDemo?PageSize=1000&CurentPage=1&iddvhc=${iddvhc}&tukhoa=${name}`,
    tokenEnterPrise: '@DataUserEnterprise',
    getInfo: `${apiLinkEnterprise}connect/userinfo`,
   
  
    
    
   

    //https://ilis-cadas-api.vnpt.vn/api/ThuaDat/GetThuaDatAndPolygonByDistanceAsync?pointY=1277766.1424327954&pointX=571971.5451021092&size=422.55
    //https://ilis-cadas-api.vnpt.vn/api/ThuaDat/GetThuaDatAndPolygonByDistanceAsync?pointX=587531.1701&pointY=1290527.7089&size=100
    //getPolygonByToThuaEnter:(soTo, soThua, idbando) => `${apiLinkEnterpriseBody}/api/ThuaDat/GetPolygonBySoToAndSoThuaAndMaTinh?soTo=${soTo}&soThua=${soThua}&maTinh=72&idtobando=${idbando}`,
};

export default URL;

export const isObject = obj => obj && obj.constructor && obj.constructor === Object;

export function onPostRequest(url, onSuccess, payload) {
    let dataResponse = {
        statusCode: null,
        response: null,
    },
        rawDataHeader = payload,
        token = store.getState().token,
        dataHeader = '';
    if (isObject(payload)) {
        let rawToken = token;
        if (token) {
            token = decodeResponse(token);
            token = JSON.parse(token);
        }
        payload = {
            Username: token.Username || '',
            Token: rawToken || '',
            ...payload,
        };
    }

    dataHeader = encodeResponse(payload);
    Axios.post(encodeURI(url), null, {
        headers: {
            'Content-Type': 'application/json',
            Data: dataHeader,
        }
    })
        .then((res) => {
            dataResponse.statusCode = res.status;
            dataResponse.response = res.data;
            onSuccess(dataResponse);
        })
        .catch((error) => {
            let callBack = () => onPostRequest(url, onSuccess, rawDataHeader);
            handlerError(error, onSuccess, callBack);
        });
}

export function onRequestEnterPrise(url, onSuccess, payload) {
    let dataResponse = {
        statusCode: null,
        response: null,
    },
        rawDataHeader = payload,
        token = store.getState().token
    if (isObject(payload)) {
        let rawToken = token;
        if (token) {
            token = decodeResponse(token);
            token = JSON.parse(token);
        }
        payload = {
            Username: token.Username || '',
            Token: rawToken || '',
            ...payload,
        };
    }
    Axios.post(encodeURI(url), payload
    )
        .then((res) => {
            dataResponse.statusCode = res.status;
            dataResponse.response = res.data;
            onSuccess(dataResponse);
        })
        .catch((error) => {
            let callBack = () => onPostRequest(url, onSuccess, rawDataHeader);
            handlerError(error, onSuccess, callBack);
        });
}

export function onGetRequestEnterPriseBody(url, onSuccess, payload) {
    let dataResponse = {
        statusCode: null,
        response: null,
    },
        rawDataHeader = payload,
        token = store.getState().TokenEnter;
    if (isObject(payload)) {
        if (token) {
            token = decodeResponse(token);
            token = JSON.parse(token);
        }
    }
    Axios.get(url,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }
    )
        .then((res) => {
            dataResponse.statusCode = res.status;
            dataResponse.response = res.data;
            onSuccess(dataResponse);

        })
        .catch((error) => {
            let callBack = () => onPostRequest(url, onSuccess, rawDataHeader);
            handlerError(error, onSuccess, callBack);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('@DataUserEnterprise');
            }
        });

}

export function onPostRequestEnterPriseBody(url, onSuccess, payload) {
    let dataResponse = {
        statusCode: null,
        response: null,
    },
        rawDataHeader = payload,
        token = store.getState().TokenEnter;
    const config = {
        method: 'post',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        data: payload
    };
    Axios(config)
        .then((res) => {
            dataResponse.statusCode = res.status;
            dataResponse.response = res.data;
            onSuccess(dataResponse);
        })
        .catch((error) => {
            let callBack = () => onPostRequest(url, onSuccess, rawDataHeader);
            handlerError(error, onSuccess, callBack);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('@DataUserEnterprise');
            }
        });
}

export function formatFLetter(inputString) {
    if (inputString) {
        inputString = inputString.split(' ');
        inputString = inputString.map(e => capitalizeFLetter(e));
        inputString = inputString.filter(e => !!e);
        return inputString.join(' ');
    }
    return ""
}

function capitalizeFLetter(inputStr) {
    if (inputStr) {
        inputStr = inputStr.toLowerCase();
        return inputStr.charAt(0).toUpperCase() +
            inputStr.slice(1)
    }
    return ""
}

export const encodeResponse = (body) => {
    body = JSON.stringify(body);
    let key = CryptoJS.enc.Utf8.parse(secretKey);
    key = CryptoJS.MD5(key);
    key.words.push(key.words[0], key.words[1]);
    let options = { mode: CryptoJS.mode.ECB },
        textWordArray = CryptoJS.enc.Utf8.parse(body),
        encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, options);
    return encrypted.toString();
};

export const decodeResponse = (encryptedText) => {
    let key = CryptoJS.enc.Utf8.parse(secretKey);
    key = CryptoJS.MD5(key);
    key.words.push(key.words[0], key.words[1]);
    let options = { mode: CryptoJS.mode.ECB },
        decrypted = CryptoJS.TripleDES.decrypt(
            // @ts-ignore
            {
                ciphertext: CryptoJS.enc.Base64.parse(encryptedText),
            },
            key,
            options,
        );
    return decrypted.toString(CryptoJS.enc.Utf8);
};

const handlerError = (error, onSuccess, callBack) => {
    let payload = {
        statusCode: 'Error',
        response: '',
    };
    if (error.response) {
        payload.response = error.response.data;
        payload.statusCode = error.response.status;
        if (error.response.status === 401) {
            onRefreshToken(callBack);
        }
        else
            onSuccess(payload);
    } else if (error.request) {
        payload.response = error.request;
        onSuccess(payload);
    } else {
        // Something happened in setting up the request that triggered an Error
        payload.response = error.message;
        onSuccess(payload);
    }
};

const onRefreshToken = (onSuccess) => {
    let token = store.getState().token;
    if (token) {
        token = decodeResponse(token);
        token = JSON.parse(token);
        let payload = {
            Username: token.Username,
            Password: token.Password,
        },
            strPayload = encodeResponse(payload);
        Axios.post(encodeURI(URL.login), null, {
            headers: {
                'Content-Type': 'application/json',
                Data: strPayload,
            },
        })
            .then((res) => {
                if (res.status === 200 && !!res.data) {
                    localStorage.setItem(URL.token, res.data)
                    store.dispatch({ type: Type.SET_TOKEN, token: res.data });
                    onSuccess();
                }
            })
            .catch((error) => {
                store.getState().signOut();
                if (error.response) {
                    console.log('response', error.response);
                } else if (error.request) {
                    console.log('req', error.request);
                } else {
                    console.log('Message', error.message);
                }
            });
    } else {
        store.getState().signOut();
    }
};


export const formatNumber = number => {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export const QD_GiaDat = {
    'QD': '(Số 35/2020/QĐ-UBND)',
    'HIEULUC': '01/09/2020',
}

