import React from 'react';
import { Text, Stack, } from '@fluentui/react';
import { useSelector, useDispatch } from "react-redux";
import Type from "../../Redux/Type";
import { CommandButton } from "../Accessary";
import { onOpenRightPanel, onCloseRightPanel } from "../../Containers/RightPanelAction";
import URL from "../../Containers/MainController";


const Menu = () => {

    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    const typeServer = localStorage.getItem(URL.serverSelected)
    const isShow = (typeServer === 'tnh' && userInfo) || (typeServer !== 'tnh' && userInfoEnter);

    const dispatch = useDispatch();

    const onButtonPress = (route) => () => onOpenRightPanel(route)
    const onDrawingPress = () => {
        dispatch({ type: Type.SHOW_ON_DRAWING });
        dispatch({ type: Type.START_DRAWING })
        onCloseRightPanel()
    }

    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Text variant='xLarge' className='title'>Menu</Text>

                <Stack tokens={{ childrenGap: 10 }}>
                    {
                        isShow ?
                            <CommandButton
                                title='Vẽ quy hoạch'
                                iconName='EditCreate'
                                onClick={onDrawingPress}
                            />
                            : null
                    }
                    <CommandButton
                        title='Tìm kiếm'
                        iconName='search'
                        onClick={onButtonPress('search')}
                    />

                    <CommandButton
                        title='Quy hoạch'
                        iconName='MapLayers'
                        onClick={onButtonPress('layer')}
                    />

                    <CommandButton
                        title='Chế độ xem'
                        iconName='Nav2DMapView'
                        onClick={onButtonPress('satellite')}
                    />

                    <CommandButton
                        title='Chuyển vị trí'
                        iconName='MapPin'
                        onClick={onButtonPress(typeServer === 'tnh' ? 'location' : 'locationEnter')}
                    />

                    <CommandButton
                        title='Chuyển server'
                        iconName='ServerProcesses'
                        onClick={onButtonPress('server')}
                    />

                    {
                        isShow ?

                            <CommandButton
                                title={'Tài khoản'}
                                iconName='ContactCard'
                                onClick={onButtonPress('account')}
                            />
                            :
                            <CommandButton
                                title='Đăng nhập'
                                iconName='Contact'
                                onClick={onButtonPress('login')}
                            />

                    }
                </Stack>
            </div>
        </div>
    )
}

export default Menu;
