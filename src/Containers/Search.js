import LinkAPI, { onPostRequest, onGetRequestEnterPriseBody } from './MainController';
import { getShapeColor, getUsedShapeColor } from '../Styles/Colors';
import setup from './setup';
import { getQuyHoachInfo } from "./QuyHoach";
import { store } from "../Redux/Store";
import Type from "../Redux/Type";
import { onCloseRightPanel, onOpenRightPanel } from "./RightPanelAction";

export function getListHuyen(onSuccess) {
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            response = response.map((e) => ({
                key: e.MaHuyen,
                disabled: e.MaHuyen !== setup.huyenId,
                text: e.Ten,
                searchID: e.MaDVHC,
            }));
            statusCode = 200;
        }
        onSuccess(statusCode, response);
    };
    onPostRequest(LinkAPI.getTreeDVHC(setup.tinhId, 1), onProcess);
}

export function getListXa(huyenId, onSuccess) {
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            response = response.map((e) => ({
                key: e.MaXa,
                text: e.Ten,
                searchID: e.MaDVHC.toString(),
            }));
            let allItem = [setup.allDistrict];
            response = allItem.concat(response);
        }
        onSuccess(statusCode, response);
    };
    onPostRequest(LinkAPI.getTreeDVHC(huyenId, 2), onProcess);
}

export function getListHuyenEnter(onSuccess) {
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            response = response.map((e) => ({
                ...e,
                key: e.mahuyen ? parseInt(e.mahuyen) : '',
                //disabled: e.mahuyen != setup.huyenId,
                disabled: false,
                text: e.tendvhc,
                searchID: e.iddvhc
            }));
            statusCode = 200;
        }
        onSuccess(statusCode, response);
    };
    onGetRequestEnterPriseBody(LinkAPI.getDVHCEnterprise('FB266B4FC02944AC910387C1CC3658D4'), onProcess);
}

export function getListXaEnter(huyenId, onSuccess) {
    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            response = response.map((e) => ({
                ...e,
                key: e.maxa,
                text: e.tendvhc,
                searchID: e.iddvhc.toString(),
            }));
            // let allItem = [setup.allDistrict];
            // response = allItem.concat(response);
        }
        onSuccess(statusCode, response);
    };
    onGetRequestEnterPriseBody(LinkAPI.getDVHCEnterprise(huyenId), onProcess);
}


export function getSearchList(route, { SoTo, SoThua, MaDvhc, TenChu }, onSuccess) {

    let onProcess = ({ statusCode, response }) => {
        if (statusCode === 200) {
            response = response.map((e) => ({
                ...e,
                SOTHUA: e.SOTHUA.trim(),
                MucDichSDD: getListMDSD(e.MucDichSDD),
                MADVHC: e.MaDVHC ? e.MaDVHC.toString() : '',
                ...getShapeColor(e.GhiChu_dkqsdd),
            }));
            onSuccess(200, response);
            getListGiaDat({ SoTo, SoThua, MaDvhc, TenChu });
        } else {
            onSuccess(statusCode, []);
        }
    },
        linkCallAPI =
            route === 'byName' ? LinkAPI.searchByName : LinkAPI.searchByToThua;
    onPostRequest(linkCallAPI, onProcess, { SoTo, SoThua, MaDvhc, TenChu });
    getQuyHoachInfo({ SoTo, SoThua, MaDvhc, TenChu });

}

export function getSearchListEnter(route, { SoTo, SoThua, MaDvhc, TenChu }, onSuccess) {
    if (route === 'byName') {
        let onProcess = ({ statusCode, response }) => {
            if (statusCode === 200) {
                if (response.count) {
                    getThuaByName(response, onSuccess)
                } else {
                    onSuccess(200, []);
                }
            } else if (statusCode === 204) {
                onSuccess(200, []);

            } else {
                onSuccess(statusCode, 'Đã có lỗi xãy ra vui lòng thử lại sau !');
            }
        }
        onGetRequestEnterPriseBody(LinkAPI.searchByNameEnter(TenChu, MaDvhc), onProcess)
    } else {
        let onProcess = ({ statusCode, response }) => {
            if (statusCode === 200) {
                getThuaByToThu(SoThua, response.idtobando, onSuccess);
            } else if (statusCode === 204) {
                onSuccess(200, []);

            } else {
                onSuccess(statusCode, 'Đã có lỗi xãy ra vui lòng thử lại sau !');
            }
        }
        onGetRequestEnterPriseBody(LinkAPI.searchSoToDVHC(SoTo, MaDvhc), onProcess)
    }
    getQuyHoachInfo({ SoTo, SoThua, MaDvhc, TenChu });
}

export function getThuaByToThu(SoThua, idBanDo, onSuccess) {
    if (SoThua && idBanDo) {
        let onProcessThua = ({ statusCode, response }) => {
            if (statusCode === 200) {
                if (response.items[0]) {
                    const arr = [];
                    response.items = JSON.parse(unescape(response.items));
                    response.items.forEach(e => {
                        const nguoiLienQuan = JSON.parse(unescape(response.items[0].Nguoilienquan));
                        const Dangkymdng = JSON.parse(unescape(response.items[0].Dangkymdng));
                        let nguonGocSDD = '', mucDichSDD = '';
                        Dangkymdng.forEach(e => {
                            nguonGocSDD = nguonGocSDD + (e.Nguongoc + ' - ' + e.Tennguongoc) + '| ';
                            mucDichSDD = mucDichSDD + (e.Loaidat + ' - ' + e.Tendaydu + ': ' + e.Dientich + ' m²') + '|';
                        });
                        arr.push({
                            ...e,
                            'MaDVHC': e.Iddvhc,
                            'MaThuaDat': e.Idthuadat,
                            'SOTO': e.Soto.trim(),
                            'SOTHUA': e.Sothututhua,
                            'KhuVuc': e.Khuvuc,
                            'DiaChiThuaDat': e.Diachithua + ', ' + e.Tendvhc + ', ' + e.Tenhuyen + ', ' + e.Tentinh,
                            'DienTich': e.Dientich,
                            "CongKhai": null,
                            'MaHinhThucSD': e.Hinhthucsd,
                            'TrangThaiThuaDat': e.Tentrangthai,
                            'SoVaoSo': e.Sovaoso,
                            'NguonGocSDD': nguonGocSDD,
                            'MucDichSDD': getListMDSD(mucDichSDD),
                            'Ten1': e.Hoten,
                            'GioiTinh1': !e.Gioitinh,
                            'NgaySinh1': null,
                            'NamSinh1': e.Ngaysinh,
                            'SoDinhDanh1': e.Sodinhdanh,
                            'DiaChi1': e.Diachi,
                            'Ten2': nguoiLienQuan[0] ? nguoiLienQuan[0].Hoten : null,
                            'GioiTinh2': nguoiLienQuan[0] ? !nguoiLienQuan[0].Gioitinh : null,
                            'NgaySinh2': null,
                            'NamSinh2': nguoiLienQuan[0] ? nguoiLienQuan[0].Ngaysinh : null,
                            'SoDinhDanh2': nguoiLienQuan[0] ? nguoiLienQuan[0].Sodinhdanh : null,
                            'DiaChi2': nguoiLienQuan[0] ? nguoiLienQuan[0].Diachi : null,
                            'idBanDo': idBanDo
                        });
                    });
                    onSuccess(200, arr);
                } else {
                    onSuccess(200, []);
                }
            } else {
                onSuccess(statusCode, 'Đã có lỗi xãy ra vui lòng thử lại sau !');
            }
        };
        onGetRequestEnterPriseBody(LinkAPI.searchSoThuaDVHC(SoThua, idBanDo), onProcessThua)
    }

}

export function getThuaByName(response, onSuccess) {

    if (response.items[0]) {
        const arr = [];
        response.items = JSON.parse(unescape(response.items));
        response.items.forEach(e => {
            const nguoiLienQuan = JSON.parse(unescape(response.items[0].Nguoilienquan));
            const Dangkymdng = JSON.parse(unescape(response.items[0].Dangkymdng));
            let nguonGocSDD = '', mucDichSDD = '';
            Dangkymdng.forEach(e => {
                nguonGocSDD = nguonGocSDD + (e.Nguongoc + ' - ' + e.Tennguongoc) + '| ';
                mucDichSDD = mucDichSDD + (e.Loaidat + ' - ' + e.Tendaydu + ': ' + e.Dientich + ' m²') + '|';
            });
            arr.push({
                ...e,
                'MaDVHC': e.Iddvhc,
                'MaThuaDat': e.Idthuadat,
                'SOTO': e.Soto.trim(),
                'SOTHUA': e.Sothututhua,
                'KhuVuc': e.Khuvuc,
                'DiaChiThuaDat': e.Diachithua + ', ' + e.Tendvhc + ', ' + e.Tenhuyen + ', ' + e.Tentinh,
                'DienTich': e.Dientich,
                "CongKhai": null,
                'MaHinhThucSD': e.Hinhthucsd,
                'TrangThaiThuaDat': e.Tentrangthai,
                'SoVaoSo': e.Sovaoso,
                'NguonGocSDD': nguonGocSDD,
                'MucDichSDD': getListMDSD(mucDichSDD),
                'Ten1': e.Hoten,
                'GioiTinh1': !e.Gioitinh,
                'NgaySinh1': null,
                'NamSinh1': e.Ngaysinh,
                'SoDinhDanh1': e.Sodinhdanh,
                'DiaChi1': e.Diachi,
                'Ten2': nguoiLienQuan[0] ? nguoiLienQuan[0].Hoten : null,
                'GioiTinh2': nguoiLienQuan[0] ? !nguoiLienQuan[0].Gioitinh : null,
                'NgaySinh2': null,
                'NamSinh2': nguoiLienQuan[0] ? nguoiLienQuan[0].Ngaysinh : null,
                'SoDinhDanh2': nguoiLienQuan[0] ? nguoiLienQuan[0].Sodinhdanh : null,
                'DiaChi2': nguoiLienQuan[0] ? nguoiLienQuan[0].Diachi : null,
            });
        });
        onSuccess(200, arr);
    } else {
        onSuccess(200, []);
    }
}


export function getListGiaDat({ SoTo, SoThua, MaDvhc, TenChu }) {
    if (MaDvhc && SoThua && SoTo) {
        let onProcess = ({ statusCode, response }) => {
            if (statusCode === 200) {
                if (response[0] && response[0].BangGiaDatId) {
                    response = response.map((e) => ({
                        GiaTri: e.GiaTri,
                        TenDuong: e.TENDUONG,
                        TenDoanDuong: e.TENDOANDUONG,
                        TenViTri: e.TenViTri,
                        KhuVuc: e.TenKhuVuc,
                        MaLoaiDat: e.MaLoaiDat
                    }));
                } else {
                    response = null;
                }
                store.dispatch({ type: Type.SET_STATE_GIA_DAT, route: 'giadat', value: response });
            }
        };
        onPostRequest(LinkAPI.getGiaDat, onProcess, { SoTo, SoThua, MaDvhc, TenChu })
    }

}

export const getInfoByThuaDat = ({ SoTo, SoThua, MaDvhc, TenChu }, shape) => {
    let onSuccess = (statusCode, response) => {
        if (statusCode === 200 && response.length) {
            response = response[0];
            onOpenRightPanel('info');
            store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeFrom', value: '' })
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPicked', value: response });
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPickedKhongThuocTinh', value: null });

            // onOpenRightPanel('info');
            // store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeFrom', value: '' })
            // store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPicked', value: response });
        } else {
            onOpenRightPanel('info');
            store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeFrom', value: '' })
            store.dispatch({
                type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPickedKhongThuocTinh', value: {
                    "MaDVHC": shape.madvhc,
                    "SOTO": shape.SOTO,
                    "SOTHUA": shape.SOTHUA,
                    "TenChu": '',
                    "DienTich": shape.DIENTICH,
                    "LoaiDat": shape.LOAIDAT,
                    "Color": shape.FillColor
                }
            });
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPicked', value: null });

            // store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: 'Không tìm thấy thông tin thửa đất' });
            // onCloseRightPanel()
        }
    };
    getSearchList('byToThua', { SoTo, SoThua, MaDvhc, TenChu }, onSuccess)
}

export const getInfoByThuaDatEnter = ({ SoTo, SoThua, MaDvhc, TenChu }, shape) => {
    let onSuccess = (statusCode, response) => {
        if (statusCode === 200 && response.length) {
            response = response[0];
            onOpenRightPanel('info');
            store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeFrom', value: '' })
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPicked', value: response });
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPickedKhongThuocTinh', value: null });
        } else {
            onOpenRightPanel('info');
            store.dispatch({ type: Type.SET_STATE_RIGHT_PANEL, route: 'routeFrom', value: '' })
            store.dispatch({
                type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPickedKhongThuocTinh', value: {
                    "MaDVHC": shape.madvhc,
                    "SOTO": shape.SOTO,
                    "SOTHUA": shape.SOTHUA,
                    "TenChu": '',
                    "DienTich": shape.DIENTICH,
                    "LoaiDat": shape.LOAIDAT,
                    "Color": shape.FillColor
                }
            });
            store.dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'dataThuaDatPicked', value: null });
        }
    };
    getSearchListEnter('byToThua', { SoTo, SoThua, MaDvhc, TenChu }, onSuccess)
}

function getListMDSD(strMDSD) {
    let result = [];
    if (strMDSD) {
        if (strMDSD[strMDSD.length - 1] === "|")
            strMDSD = strMDSD.slice(0, -1);
        strMDSD = strMDSD.split('|');
        if (strMDSD.length) {
            strMDSD = strMDSD.filter(e => !!e);
            strMDSD = strMDSD.filter(e => e.trim());
            strMDSD = strMDSD.filter(e => !!e);
            strMDSD = strMDSD.filter(e => e.indexOf('-') !== -1);
            result = formatListMDSD(strMDSD);
        }
    }
    return result
}

function formatListMDSD(listMDSD) {
    if (listMDSD.length) {
        listMDSD = listMDSD.map(e => {
            let type = e.split('-')[0].trim();
            type = getUsedShapeColor(type);
            return {
                name: e,
                color: type
            }
        });
        return listMDSD
    }
    return []
}
