import React from 'react';
import {Text} from '@fluentui/react';

const description = 'Các lớp này được lấy dự liệu từ hệ thống VNPT-iLIS của Tây Ninh.';

class Help extends React.PureComponent{

    render()
    {
        return(
            <div className='modal-content-container'>
                <div className='animated-panel'>
                    <Text variant='xLarge' className='title'>Hướng dẫn sử dụng</Text>
                    <div>
                        <Text>{description}</Text>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;

