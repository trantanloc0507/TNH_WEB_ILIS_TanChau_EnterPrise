import React, { useEffect, useState } from 'react';
import { Text, Stack, Label, Checkbox, DefaultButton, Spinner, Dropdown, MessageBar, MessageBarType, PrimaryButton } from '@fluentui/react';
import { useDispatch, useSelector } from "react-redux";
import Type from "../../Redux/Type";
import { onLoadQuyHoachPolygon, onLoadQHChiTietTanChau } from '../../Containers/QuyHoach'
import { onOpenRightPanel } from "../../Containers/RightPanelAction";
import URL from "../../Containers/MainController";
import { ModalView } from "../ModalView";

const Layer = () => {
    const { showThuaDat } = useSelector(state => state.hienTrang);
    const { showQuyHoach, typeActive, isLoading, errorMessage, listLabel, menu } = useSelector(state => state.quyHoach);
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    const typeServer = localStorage.getItem(URL.serverSelected)
    const isShow = (typeServer === 'tnh' && userInfo) || (typeServer !== 'tnh' && userInfoEnter);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isShow) {
            dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'showThuaDat', value: false });
        }
    }, [])

    const onChangeShowQuyHoachStatus = () => {
        dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'showQuyHoach', value: !showQuyHoach });
    };

    const onChangeShowThuaDatStatus = () => {
        if (!isShow) {
            // alert('Vui lòng đăng nhập đễ xem lớp thửa đất')
            setIsOpen(true)

            dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'showThuaDat', value: false });
        } else {
            dispatch({ type: Type.SET_STATE_HIEN_TRANG, route: 'showThuaDat', value: !showThuaDat });
        }

    };

    const onChangeTypeQuyHoach = (_, typeActive) => {
        dispatch({ type: Type.SET_STATE_QUY_HOACH, route: 'typeActive', value: typeActive });
    }

    const onLoadPress = () => {
        if (typeActive.key) {
            if (typeActive.key === 'CTSDDTTCT') {
                onLoadQHChiTietTanChau();
                onOpenRightPanel('zone')
            }
            else
                onLoadQuyHoachPolygon(typeActive.key);
        }
    }

    const onNextPress = () => {
        onOpenRightPanel('zone')
    }
    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <ModalView
                    isOpen={isOpen}
                    onDismiss={() => { setIsOpen(false) }}
                    title={'Thông báo'}
                    mess={'Vui lòng đăng nhập đễ xem lớp thửa đất'}
                />
                <Text variant='xLarge' className='title'>Lớp bản đồ</Text>
                <Stack tokens={{ childrenGap: 20 }} style={{ flex: 1 }}>
                    <Stack tokens={{ childrenGap: 5 }}>
                        <Label>Hiển thị bản đồ</Label>
                        <Stack horizontal tokens={{ childrenGap: 20 }}>
                            <Checkbox checked={showThuaDat} onChange={onChangeShowThuaDatStatus} label="Lớp thửa đất" />
                            <Checkbox
                                label="Lớp quy hoạch"
                                onChange={onChangeShowQuyHoachStatus}
                                checked={showQuyHoach}
                            />
                        </Stack>
                    </Stack>
                    <Stack tokens={{ childrenGap: 5 }}>
                        <Label>Bản đồ quy hoạch</Label>
                        <Dropdown
                            placeholder="Chọn bản đồ quy hoạch"
                            options={menu}
                            selectedKey={typeActive.key}
                            onChange={onChangeTypeQuyHoach}
                            disabled={!showQuyHoach}
                        />
                    </Stack>
                    <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign={'space-between'}>
                        {showQuyHoach ?
                            <PrimaryButton
                                style={{ flex: 1 }}
                                text='Xem quy hoạch'
                                onClick={onLoadPress}
                            />
                            : null
                        }
                        {listLabel.length ?
                            <DefaultButton
                                style={{ flex: 1 }}
                                disabled={isLoading}
                                text='Quay lại'
                                onClick={onNextPress}
                            />
                            : null
                        }
                    </Stack>
                    {isLoading ?
                        <Spinner label="Đang tải ..." />
                        : null
                    }
                    {errorMessage ?
                        <MessageBar
                            messageBarType={MessageBarType.error}
                            isMultiline={true}
                        >
                            <Text variant={'small'}>{errorMessage}</Text>
                        </MessageBar>
                        : null
                    }
                </Stack>
            </div>
        </div>
    )
};

export default Layer;

