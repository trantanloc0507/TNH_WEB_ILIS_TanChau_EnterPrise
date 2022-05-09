import React from 'react';
import COLOR from "../../Styles/Colors";
import { TooltipHost, Persona, PersonaSize, Stack, Image, ImageFit } from '@fluentui/react';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { AppButton } from "../Accessary";
import { useSelector, useDispatch } from 'react-redux';
import Type from "../../Redux/Type";
import { onOpenRightPanel } from "../../Containers/RightPanelAction";
import URL from "../../Containers/MainController";

const HeaderBar = () => {
    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    const typeServer = localStorage.getItem(URL.serverSelected)
    const isShow = (typeServer === 'tnh' && userInfo) || (typeServer !== 'tnh' && userInfoEnter);

    const { showTool } = useSelector(state => state.drawingTool);
    const { routeContent } = useSelector(state => state.rightPanel);

    const dispatch = useDispatch();


    const onButtonPress = (route) => () => onOpenRightPanel(route)
    const onDrawingPress = () => {
        if (showTool) {
            dispatch({ type: Type.CLEAR_PATH_DRAWING });
            dispatch({ type: Type.SHOW_OFF_DRAWING });
        }
        else {
            dispatch({ type: Type.SHOW_ON_DRAWING });
            dispatch({ type: Type.START_DRAWING })
        }
    }
    if (window.innerWidth < 1000) {
        return (
            <div className=' position-fixed container-fluid d-flex row m-0 align-items-center p-0' style={styles.topBar(typeServer)}>
                <TooltipHost
                    content={'Cổng thông tin địa chính VNPT - iLIS'}
                    styles={{ root: { display: 'inline-block', marginLeft: 10 } }}
                >
                    <Stack horizontal verticalAlign={"center"}>
                        <Image
                            src={require("../../Assets/icon.png")}
                            imageFit={ImageFit.contain}
                            width={32}
                            height={32}
                        />
                        <a style={styles.title}>Cổng thông tin VNPT iLIS</a>
                    </Stack>
                </TooltipHost>

                <div style={{ flex: 1 }} />
                <AppButton
                    iconName={'CollapseMenu'}
                    tooltip={'Menu'}
                    active={showTool}
                    onClick={onButtonPress('menu')}
                />
            </div>
        )
    }
    else {
        return (
            <div className=' position-fixed container-fluid d-flex row m-0 align-items-center p-0' style={styles.topBar(typeServer)}>
                <TooltipHost
                    content={'Cổng thông tin địa chính VNPT - iLIS'}
                    styles={{ root: { display: 'inline-block', marginLeft: 10 } }}
                >
                    <Stack horizontal verticalAlign={"center"}>
                        <Image
                            src={require("../../Assets/icon.png")}
                            imageFit={ImageFit.contain}
                            width={32}
                            height={32}
                        />
                        <a style={styles.title}>Cổng thông tin VNPT iLIS</a>
                    </Stack>
                </TooltipHost>

                <div style={{ flex: 1 }} />
                {isShow ?
                    <AppButton
                        iconName={'EditCreate'}
                        tooltip={'Vẽ quy hoạch'}
                        active={showTool}
                        onClick={onDrawingPress}
                    />
                    : null
                }
                {
                    typeServer === 'tnh' ?
                        appButton.map(item => (
                            <AppButton
                                key={item.key}
                                iconName={item.iconName}
                                tooltip={item.tooltip}
                                active={routeContent === item.key}
                                onClick={onButtonPress(item.key)}
                            />
                        ))
                        :
                        appButtonEnter.map(item => (
                            <AppButton
                                key={item.key}
                                iconName={item.iconName}
                                tooltip={item.tooltip}
                                active={routeContent === item.key}
                                onClick={onButtonPress(item.key)}
                            />
                        ))
                }
                {/* 
                {
                    typeServer === 'tnh' ?
                        appButton.map(item => (
                            <AppButton
                                key={item.key}
                                iconName={item.iconName}
                                tooltip={item.tooltip}
                                active={routeContent === item.key}
                                onClick={onButtonPress(item.key)}
                            />
                        ))
                        :
                        appButtonEnter.map(item => (
                            <AppButton
                                key={item.key}
                                iconName={item.iconName}
                                tooltip={item.tooltip}
                                active={routeContent === item.key}
                                onClick={onButtonPress(item.key)}
                            />
                        ))
                } */}
                <div>
                    {isShow ?
                        <TooltipHost
                            content={'Tài khoản'}
                        >
                            <div style={styles.accountBtn} className='btn-custom' onClick={onButtonPress('account')}>
                                <Persona hidePersonaDetails size={PersonaSize.size32} />
                            </div>
                            {/* <AppButton
                            iconName={'Contact'}
                            tooltip={'Đăng nhập'}
                            active={routeContent === 'login'}
                            onClick={onButtonPress('account')}
                        /> */}
                        </TooltipHost>
                        :
                        <AppButton
                            iconName={'Contact'}
                            tooltip={'Đăng nhập'}
                            active={routeContent === 'login'}
                            onClick={onButtonPress('login')}
                        />
                    }
                </div>
                {/* <div>
                    <TooltipHost
                        content={'Tài khoản'}
                    >
                        <div style={styles.accountBtn} className='btn-custom' onClick={onButtonPress('account')}>
                            <Persona hidePersonaDetails size={PersonaSize.size32} />
                        </div>
                    </TooltipHost>
                        :
                        
                </div> */}

                <AppButton
                    iconName={'ServerProcesses'}
                    tooltip={'Chuyển server'}
                    active={routeContent === 'server'}
                    onClick={onButtonPress('server')}
                />
            </div>
        )
    }

};

const appButton = [
    { key: 'search', iconName: 'Search', tooltip: 'Tìm kiếm' },
    { key: 'layer', iconName: 'MapLayers', tooltip: 'Quy hoạch' }, //layer
    { key: 'satellite', iconName: 'Nav2DMapView', tooltip: 'Chế độ xem' },
    { key: 'location', iconName: 'MapPin', tooltip: 'Chuyển vị trí' },
    // {key:'help',iconName:'Help',tooltip:'Hướng dẫn'}
];
const appButtonEnter = [
    { key: 'search', iconName: 'Search', tooltip: 'Tìm kiếm' },
    { key: 'layer', iconName: 'MapLayers', tooltip: 'Quy hoạch' }, //layer
    { key: 'satellite', iconName: 'Nav2DMapView', tooltip: 'Chế độ xem' },
    { key: 'locationEnter', iconName: 'MapPin', tooltip: 'Chuyển vị trí' },
    // {key:'help',iconName:'Help',tooltip:'Hướng dẫn'}
];


export default HeaderBar;

const styles = {
    topBar: (e) => ({
        backgroundColor: e === 'tnh' ? COLOR.blue : '#013ADF',
        marginTop: -10
    }),
    appName: {
        fontSize: FontSizes.size14,
        fontWeight: 600,
        color: COLOR.blue,
        marginLeft: 10
    },
    accountBtn: {
        height: 48,
        width: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    title: {
        fontSize: 14,
        color: COLOR.white,
        paddingLeft: 10,
        fontWeight: 700,
        cursor: 'pointer'
    }
};


