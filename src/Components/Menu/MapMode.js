import React from 'react';
import {Text, ChoiceGroup, Stack} from '@fluentui/react';
import {useSelector,useDispatch} from "react-redux";
import Type from "../../Redux/Type";

const contentExplanation =
    'Khi thay đổi chế độ bản đồ, lớp bản đồ nền sẽ thay đổi, các lớp bản đồ này đều được lấy từ nguồn Google Map.';
const options = [
    { key: 'hybrid', text: 'Xem bằng ảnh vệ tinh'},
    { key: 'roadmap', text: 'Xem bằng bản đồ' }
];

const MapMode = () =>{

    const {typeMapId} = useSelector(state=>state.mapView);
    const dispatch = useDispatch();
    const onChangeSatellite = (_,option)=>{
        dispatch({type:Type.SET_TYPE_MAP,value:option.key})
    };


    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Text variant='xLarge' className='title'>Chế độ bản đồ</Text>
                <div>
                    <Text>{contentExplanation}</Text>
                    <br/>
                    <br/>
                </div>
                <Stack tokens={{childrenGap:10}}>
                    <ChoiceGroup
                        selectedKey={typeMapId}
                        options={options}
                        onChange={onChangeSatellite}
                        label="Chọn chế độ xem"
                        required={true} />
                </Stack>
            </div>
        </div>
    )
}

export default MapMode;

