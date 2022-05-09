import React from 'react';
import { Text, ChoiceGroup, Stack, Dropdown } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import Type from "../../Redux/Type";
import { onMoveToMap } from "../../Containers/MapView";
import setup from '../../Containers/setup'

const contentExplanation =
    'Bản đồ sẽ chuyển đến khu vực bạn chọn, chức năng này nhằm giúp bạn định hình khu vực hành chính của địa bàn.';

const Location = () => {

    const dispatch = useDispatch();

    const onChangeLocation = (_, option) => {
        let center = {
            lat: option.latitude,
            lng: option.longitude
        };
        onMoveToMap(center)
        dispatch({ type: Type.SET_SEARCH, route: 'districtSelectedLocationXa', value: option.key });
    };
    const { districtSelectedLocation } = useSelector(state => state.searchState);
    const { districtSelectedLocationXa } = useSelector(state => state.searchState);

    const onDistrictChange = (_, districtSelected) => dispatch({ type: Type.SET_SEARCH, route: 'districtSelectedLocation', value: districtSelected });


    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Text variant='xLarge' className='title'>Chuyển vị trí</Text>
                <div>
                    <Text>{contentExplanation}</Text>
                    <br />
                    <br />
                </div>

                <Stack styles={styles.container}>
                    <Dropdown
                        label="Chuyển vị trí đến :"
                        placeholder="Huyện/Thị xã/Thành phố"
                        options={setup.locationHuyen}
                        styles={styles.dropdownMenu}
                        selectedKey={districtSelectedLocation.key}
                        onChange={onDistrictChange}
                        disabled={!setup.locationHuyen}
                    />
                    <ChoiceGroup
                        selectedKey={districtSelectedLocationXa}
                        options={setup.locationXa.filter(e => (districtSelectedLocation.key === e.mahuyen))}
                        onChange={onChangeLocation}
                    />
                </Stack>
            </div>
        </div>
    )
};

export default Location;

const styles = {
    container: {
        root: {
            paddingBottom: 20,
            flex: 1,
            overflowY: 'scroll',
            maxHeight: 'calc(100% - 230px)',
            marginRight: -16,
            paddingRight: 16,
        }
    },
    dropdownMenu: {
        root: {
        },
        title: {
            textAlign: 'left'
        },
        errorMessage: {
            textAlign: 'left'
        }
    }
};




