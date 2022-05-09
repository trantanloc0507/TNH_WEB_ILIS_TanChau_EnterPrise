import React, {useState} from 'react';
import {Text, ChoiceGroup, Stack} from '@fluentui/react';
import {onMoveToMap} from "../../Containers/MapView";
import setup from '../../Containers/setup'

const contentExplanation =
    'Bản đồ sẽ chuyển đến khu vực bạn chọn, chức năng này nhằm giúp bạn định hình khu vực hành chính của địa bàn.';

const Location = () =>{

    const [routeKey,setRouteKey]= useState(1);

    const onChangeLocation = (_,option)=>{
        let center = {
            lat:option.latitude,
            lng:option.longitude
        };
        onMoveToMap(center)
        setRouteKey(option.key)
    };


    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Text variant='xLarge' className='title'>Chuyển vị trí</Text>
                <div>
                    <Text>{contentExplanation}</Text>
                    <br/>
                    <br/>
                </div>
                <Stack styles={styles.container}>
                    <ChoiceGroup
                        selectedKey={routeKey}
                        options={setup.location}
                        onChange={onChangeLocation}
                        label="Chuyển vị trí đến :"
                    />
                </Stack>
            </div>
        </div>
    )
};

export default Location;

const styles = {
    container:{
        root:{
            paddingBottom:20,
            flex:1,
            overflowY:'scroll',
            maxHeight:'calc(100% - 230px)',
            marginRight:-16,
            paddingRight:16,
        }
    }
};




