import React from 'react';
import { Text, ChoiceGroup, Stack } from '@fluentui/react';
import LinkAPI from "../../Containers/MainController";
import URL from "../../Containers/MainController";


const contentExplanation =
    'Khi thay đổi sever dữ liêụ sẽ lấy theo server bạn chọn.';
const options = [
    { key: 'tnh', text: 'TNH' },
    { key: 'enterprise', text: 'EnterPrise' }
];

const Server = () => {
    const typeServer = localStorage.getItem(URL.serverSelected)

    const onChangeSatellite = (_, option) => {
        localStorage.setItem(LinkAPI.serverSelected, option.key)
        window.location.reload();
    };

    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Text variant='xLarge' className='title'>Server</Text>
                <div>
                    <Text>{contentExplanation}</Text>
                    <br />
                    <br />
                </div>
                <Stack tokens={{ childrenGap: 10 }}>
                    <ChoiceGroup
                        selectedKey={typeServer}
                        options={options}
                        onChange={onChangeSatellite}
                        label="Chọn Server"
                        required={true} />
                </Stack>
            </div>
        </div>
    )
}

export default Server;

