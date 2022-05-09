import React, { useState, useEffect } from 'react';
import { Text, SearchBox, Label, ChoiceGroup, Dropdown, PrimaryButton, Spinner, MessageBar, MessageBarType } from '@fluentui/react';
import setup from "../../Containers/setup";
import { useDispatch, useSelector } from 'react-redux';
import Type from "../../Redux/Type";
import { getListHuyen, getListXa, getSearchList, getSearchListEnter, getListHuyenEnter, getListXaEnter } from '../../Containers/Search'
import { onOpenRightPanel } from "../../Containers/RightPanelAction";
import URL from "../../Containers/MainController";
import { ModalView } from "../ModalView";


const Search = () => {
    const dispatch = useDispatch();
    const {
        searchText,
        modeSearch,

        listDistrict,
        listDistrictEnter,

        districtSelected,
        districtSelectedEnter,

        wardSelected,
        wardSelectedEnter,

        listWard,
        listWardEnter
    } = useSelector(state => state.searchState);
    const [isOpen, setIsOpen] = useState(false);
    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    //const { typeServer } = useSelector(state => state.mapView);
    const typeServer = localStorage.getItem(URL.serverSelected)
    const isShow = (typeServer === 'tnh' && userInfo) || (typeServer !== 'tnh' && userInfoEnter);
    const isTNH = typeServer === 'tnh';

    const [isLoading, setLoading] = useState(false);
    const [isDidMount, setDidMount] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [optionModeSearch] = useState([
        { key: 'byName', text: 'Theo tên chủ sử dụng', disabled: !isShow },
        { key: 'byToThua', text: 'Theo số tờ thửa' }
    ])

    useEffect(() => {
        if (!isDidMount) {
            setDidMount(true);
            if (isTNH) {
                if (!listDistrict.length) {
                    const onLoadListHuyen = () => {
                        setLoading(true)
                        let onSuccess = (statusCode, response) => {
                            if (statusCode === 200) {
                                dispatch({ type: Type.SET_SEARCH, route: 'listDistrict', value: response })
                                onLoadListXa(setup.huyenId);
                                setErrorMessage('');
                            }
                            else {
                                setErrorMessage(response);
                                setLoading(false)
                            }
                        };
                        getListHuyen(onSuccess);
                    };
                    const onLoadListXa = (huyenId) => {
                        setLoading(true)
                        let onSuccess = (statusCode, response) => {
                            setLoading(false)
                            if (statusCode === 200) {
                                dispatch({ type: Type.SET_SEARCH, route: 'listWard', value: response });
                                dispatch({ type: Type.SET_SEARCH, route: 'wardSelected', value: response[0] });
                                setErrorMessage('');
                            }
                            else
                                setErrorMessage(response);
                        };
                        getListXa(huyenId, onSuccess);
                    };
                    onLoadListHuyen();
                }
                if (!userInfo)
                    dispatch({ type: Type.SET_SEARCH, route: 'modeSearch', value: 'byToThua' });
            } else if (userInfoEnter) {
                if (!listDistrictEnter.length) {
                    const onLoadListHuyenEnter = () => {
                        setLoading(true)
                        let onSuccess = (statusCode, response) => {
                            if (statusCode === 200) {
                                const huyenSelect = response.find(({ mahuyen }) => mahuyen == districtSelectedEnter.key);
                                dispatch({ type: Type.SET_SEARCH, route: 'listDistrictEnter', value: response })
                                onLoadListXaEnter(huyenSelect.iddvhc)
                                setErrorMessage('');
                            }
                            else {
                                setErrorMessage(response);
                                setLoading(false)
                            }
                        };
                        getListHuyenEnter(onSuccess);
                    };
                    onLoadListHuyenEnter();
                }
                if (!userInfo)
                    dispatch({ type: Type.SET_SEARCH, route: 'modeSearch', value: 'byToThua' });
            }

        }
    }, [isDidMount, dispatch, listDistrict.length, listDistrictEnter.length, userInfo]);

    const onLoadListXaEnter = (parentid) => {
        setLoading(true)
        let onSuccess = (statusCode, response) => {
            setLoading(false)
            if (statusCode === 200) {
                dispatch({ type: Type.SET_SEARCH, route: 'listWardEnter', value: response });
                dispatch({ type: Type.SET_SEARCH, route: 'wardSelectedEnter', value: response[0] });
                setErrorMessage('');
            }
            else
                setErrorMessage(response);
        };
        getListXaEnter(parentid, onSuccess);
    };

    const onCallAPISearch = (route, payload) => {
        setErrorMessage('');
        setLoading(true);
        let onSuccess = (statusCode, response) => {
            setLoading(false);
            if (statusCode === 200) {
                if (response.length) {
                    dispatch({ type: Type.SET_SEARCH, route: 'listResult', value: response });
                    onOpenRightPanel('result')
                }
                else
                    setWarningMessage('Không tìm thấy kết quả nào')
            } else {
                setErrorMessage(response)
            }
        };
        getSearchList(route, payload, onSuccess);
    };

    const onCallAPISearchEnter = (route, payload) => {
        setErrorMessage('');
        setLoading(true);
        let onSuccess = (statusCode, response) => {
            setLoading(false);
            if (statusCode === 200) {
                if (response.length) {
                    dispatch({ type: Type.SET_SEARCH, route: 'listResult', value: response });
                    onOpenRightPanel('result')
                }
                else
                    setWarningMessage('Không tìm thấy kết quả nào')
            } else {
                setErrorMessage(response)
            }
        };
        getSearchListEnter(route, payload, onSuccess);
    };

    const onClearSearchText = () => {
        dispatch({ type: Type.SET_SEARCH, route: 'searchText', value: '' });
        dispatch({ type: Type.SET_SEARCH, route: 'listResult', value: [] });
    }
    const onChangeSearchText = (_, value) => dispatch({ type: Type.SET_SEARCH, route: 'searchText', value });
    const onChangeModeSearch = (_, optionChoose) => dispatch({ type: Type.SET_SEARCH, route: 'modeSearch', value: optionChoose.key });

    const onDistrictChange = (_, districtSelected) => dispatch({ type: Type.SET_SEARCH, route: 'districtSelected', value: districtSelected });
    const onDistrictChangeEnter = (_, districtSelectedTempt) => {
        if (!isTNH && districtSelectedEnter && districtSelectedEnter.key !== districtSelectedTempt.key) {
            onLoadListXaEnter(districtSelectedTempt.iddvhc)
        }
        dispatch({ type: Type.SET_SEARCH, route: 'districtSelectedEnter', value: districtSelectedTempt })
    };

    const onWardChange = (_, wardSelected) => dispatch({ type: Type.SET_SEARCH, route: 'wardSelected', value: wardSelected });
    const onWardChangeEnter = (_, wardSelectedEnter) => dispatch({ type: Type.SET_SEARCH, route: 'wardSelectedEnter', value: wardSelectedEnter });

    const onSearchPress = () => {
        if (!isShow) {
            // alert('Vui lòng đăng nhập đễ xem lớp thửa đất')
            setIsOpen(true)
        } else {
            setWarningMessage('');
            if (!searchText.trim())
                setErrorMessage('Vui lòng nhập từ khóa cần tìm')
            else if (wardSelected.searchID === "0" && !userInfo) {
                setErrorMessage('Vui lòng chọn xã/phường/thị trấn')
            }
            else if (modeSearch === 'byToThua') {
                let arraySearchText = searchText.split('/');
                if (arraySearchText.length !== 2) {
                    setErrorMessage('Vui lòng nhập đúng cú pháp tìm kiếm số tờ/số thửa. Ví dụ để tìm thửa 123 thuộc tờ 10, bạn hãy nhập 10/123');
                }
                else {
                    if (isTNH) {
                        let SOTO = arraySearchText[0].trim(),
                            SOTHUA = arraySearchText[1].trim(),
                            MADVHC = wardSelected.searchID,
                            payload = {
                                MaDvhc: MADVHC,
                                SoTo: SOTO,
                                SoThua: SOTHUA,
                                TenChu: '',
                            };
                        onCallAPISearch(modeSearch, payload);
                    } else {
                        let SOTO = arraySearchText[0].trim(),
                            SOTHUA = arraySearchText[1].trim(),
                            MADVHC = wardSelectedEnter.iddvhc,
                            payload = {
                                MaDvhc: MADVHC,
                                SoTo: SOTO,
                                SoThua: SOTHUA,
                                TenChu: '',
                            };
                        onCallAPISearchEnter(modeSearch, payload);
                    }

                }
            }
            else {
                if (isTNH) {
                    let payload = {
                        TenChu: searchText,
                        MaDvhc: wardSelected.searchID,
                        SoTo: '',
                        SoThua: '',
                    };
                    onCallAPISearch(modeSearch, payload);
                } else {
                    let payload = {
                        TenChu: searchText,
                        MaDvhc: wardSelectedEnter.searchID,
                        SoTo: '',
                        SoThua: '',
                    };
                    onCallAPISearchEnter(modeSearch, payload);
                }

            }
        }
    };

    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <ModalView
                    isOpen={isOpen}
                    onDismiss={() => { setIsOpen(false) }}
                    title={'Thông báo'}
                    mess={'Vui lòng đăng nhập đễ thực hiện tìm kiếm'}
                />
                <Text variant='xLarge' className='title'>Tìm kiếm</Text>
                <SearchBox
                    placeholder={modeSearch === 'byName' ? 'Nhập tên chủ sử dụng' : 'Nhập số tờ/số thửa (VD: 10/123)'}
                    onChange={onChangeSearchText}
                    value={searchText}
                    onClear={onClearSearchText}
                    onSearch={onSearchPress}
                    disabled={isLoading}
                />
                {warningMessage ?
                    <div style={{ marginTop: 5, marginBottom: 5 }}>
                        <MessageBar
                            messageBarType={MessageBarType.warning}
                            isMultiline={true}
                        >
                            {warningMessage}
                        </MessageBar>
                    </div>
                    : null
                }
                <div>
                    <div style={styles.subTitleRow}>
                        <Label required={true} styles={styles.labelTitle}>Tìm theo</Label>
                    </div>
                    <ChoiceGroup
                        styles={styles.chosenGroup}
                        selectedKey={modeSearch}
                        options={optionModeSearch}
                        onChange={onChangeModeSearch}
                        disabled={isLoading}
                    />
                </div>
                <div style={styles.subTitleRow}>
                    <Label required={true} styles={styles.labelTitle}>Khu vực tìm kiếm</Label>
                </div>
                {
                    isTNH ?
                        <Dropdown
                            placeholder="Huyện/Thị xã/Thành phố"
                            options={listDistrict}
                            styles={styles.dropdownMenu}
                            selectedKey={districtSelected.key}
                            onChange={onDistrictChange}
                            disabled={isLoading}
                        /> :
                        <Dropdown
                            placeholder="Huyện/Thị xã/Thành phố"
                            options={listDistrictEnter}
                            styles={styles.dropdownMenu}
                            selectedKey={districtSelectedEnter.key}
                            onChange={onDistrictChangeEnter}
                            disabled={isLoading}
                        />
                }

                {
                    isTNH ?
                        <Dropdown
                            placeholder="Xã/Phường/Thị trấn"
                            options={listWard}
                            selectedKey={wardSelected.key}
                            onChange={onWardChange}
                            styles={styles.dropdownMenu}
                            disabled={isLoading}
                        /> :
                        <Dropdown
                            placeholder="Xã/Phường/Thị trấn"
                            options={listWardEnter}
                            selectedKey={wardSelectedEnter.key}
                            onChange={onWardChangeEnter}
                            styles={styles.dropdownMenu}
                            disabled={isLoading}
                        />
                }


                {errorMessage ?
                    <div style={{ marginTop: 5, marginBottom: 5 }}>
                        <MessageBar
                            messageBarType={MessageBarType.severeWarning}
                            isMultiline={true}
                        >
                            {errorMessage}
                        </MessageBar>
                    </div>
                    : null
                }

                <PrimaryButton
                    styles={{ root: { marginTop: 20 } }}
                    onClick={onSearchPress}
                    disabled={isLoading}
                    text='Tìm'
                />
                <br />
                <Spinner
                    label="Đang tìm kiếm..."
                    labelPosition="right"
                    hidden={!isLoading}
                />
            </div>
        </div>
    )
}

export default Search


const styles = {
    subTitleRow: {
        height: 44,
        marginTop: 2,
        display: 'flex',
        alignItems: 'flex-end',
    },
    labelTitle: {
        root: {
            textAlign: 'left'
        }
    },
    chosenGroup: {
        label: {
            textAlign: 'left'
        },
        root: {
            marginBottom: -5
        }
    },
    dropdownMenu: {
        root: {
            marginTop: 7,
        },
        title: {
            textAlign: 'left'
        },
        errorMessage: {
            textAlign: 'left'
        }
    }
};
