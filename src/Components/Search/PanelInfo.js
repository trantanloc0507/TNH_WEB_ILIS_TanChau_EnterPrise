import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Text, Stack, Icon,  IconButton} from '@fluentui/react';
import COLOR from "../../Styles/Colors";
import PolygonTrichDo from "../Trichdo/Polygon";

const PanelInfo = forwardRef((props, ref) => {
    const [data, setData] = useState('');
    const [showIndex, setShowIndex] = useState(0);
    const [className, setClassName] = useState('animated-panel-info-off');

    useImperativeHandle(ref, () => ({
        onShowCardInfo(dataFromParent) {
            setData(dataFromParent)
            if (!data)
                setClassName('animated-panel-info')
            else if (showIndex)
                setShowIndex(0)
            else if (!showIndex)
                setShowIndex(1)
        }
    }));

    const onShowOffCardInfo = () => {
        setClassName('animated-panel-info-off');
        setTimeout(() => setData(''), 300)
    }

    return (
        data ?
            !showIndex ?
                <CardInfo1
                    onClose={onShowOffCardInfo}
                    className={className}
                    data={data}
                />
                :
                <CardInfo2
                    onClose={onShowOffCardInfo}
                    className={className}
                    data={data}
                />
            :
            <div/>
    )
})

const CardInfo1 = props => (
    <CardInfo
        onClose={props.onClose}
        className={props.className}
        data={props.data}
    />
)

const CardInfo2 = props => (
    <CardInfo
        onClose={props.onClose}
        className={props.className}
        data={props.data}
    />
)


const CardInfo = props => {
    const data = props.data;

    return (
        <div style={styles.infoView} className={props.className}>
            <div style={styles.infoHeader}>
                <Text styles={styles.infoTitle}>Thông tin thửa đất</Text>
                <IconButton
                    iconProps={{iconName: 'ChromeClose'}}
                    title="Đóng"
                    styles={styles.closeInfo}
                    onClick={props.onClose}
                />
            </div>
            <div style={styles.infoContainer}>
                <Stack tokens={{childrenGap: 10}}>
                    <Stack horizontal horizontalAlign='space-between'>
                        <Text styles={styles.text}>Tờ thửa :
                            <Text styles={{root: {fontWeight: 'bold'}}}> {data.SOTO}/{data.SOTHUA} </Text>
                        </Text>
                        <Text styles={{root: {color: COLOR.white}}}>Diện tích :
                            <Text styles={{root: {fontWeight: 'bold'}}}> {data.DienTich} </Text>
                            ㎡
                        </Text>
                    </Stack>
                    {Array.isArray(data.MucDichSDD) ?
                        <Stack>
                            {data.MucDichSDD.map((element,i)=>(
                                <Stack key = {i} horizontal verticalAlign='center'>
                                    <div style={styles.squareIcon(element.color)}/>
                                    <Text styles={styles.text}>{element.name}</Text>
                                </Stack>
                            ))}
                        </Stack>
                        : undefined
                    }
                    <Stack horizontal>
                        <Icon iconName='POI' styles={styles.titleIcon}/>
                        <Text styles={styles.text}>{data.DiaChiThuaDat}</Text>
                    </Stack>
                    <Stack horizontal>
                        <Icon iconName='Shield' styles={styles.titleIcon}/>
                        <Text styles={styles.text}>{data.TrangThaiThuaDat}</Text>
                    </Stack>
                    {data.Ten1 ?
                        <Stack horizontal>
                            <Icon iconName={'Contact'} styles={styles.infoAccount}/>
                            <Stack>
                                <Text styles={styles.infoName}>{data.Ten1}</Text>
                                <Text variant='smallPlus' styles={styles.text}>
                                    SN {data.NamSinh1}
                                    <Icon iconName='LocationDot' styles={{root: {color: COLOR.white}}}/>
                                    {data.DiaChi1}
                                </Text>
                            </Stack>
                        </Stack>
                        : null
                    }
                    {data.Ten2 ?
                        <Stack horizontal>
                            <Icon iconName={'Contact'} styles={styles.infoAccount}/>
                            <Stack>
                                <Text styles={styles.infoName}>{data.Ten2}</Text>
                                <Text variant='smallPlus' styles={styles.text}>
                                    SN {data.NamSinh2}
                                    <Icon iconName='LocationDot' styles={{root: {color: COLOR.white}}}/>
                                    {data.DiaChi2}
                                </Text>
                            </Stack>
                        </Stack>
                        :undefined
                    }
                    <Stack horizontal>
                        {/*<Icon iconName='Nav2DMapView' styles={styles.titleIcon}/>*/}
                        <Text styles={styles.text}>Bản đồ thửa đất</Text>
                    </Stack>
                    <PolygonTrichDo/>
                </Stack>
            </div>
        </div>
    )
}

export default PanelInfo;

const styles = {
    infoView: {
        display: 'flex',
        flexDirection: 'column',
    },
    infoHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 5
    },
    infoContainer: {
        maxHeight: 300,
        overflowY: 'scroll',
        paddingBottom: 30,
        marginRight: -16,
        paddingRight: 16
    },
    closeInfo: {
        root: {
            height: 40,
            width: 40,
            borderRadius: 0,
            marginRight: -16
        },
        icon: {
            color: '#fff',
            fontSize: 12,
            opacity: .8
        },
        rootHovered: {
            backgroundColor: 'transparent'
        },
        iconHovered: {
            opacity: 1
        }
    },
    infoTitle: {
        root: {
            color: COLOR.white,
            fontWeight: 'bold',
            fontSize: 14,
            flex: 1
        }
    },
    squareIcon: (color) => ({
        height: 12,
        width: 12,
        backgroundColor: color || COLOR.white,
        borderRadius: 1,
        border: '1px solid #fff',
        marginRight: 5
    }),
    text: {
        root: {
            color: COLOR.white
        }
    },
    titleIcon: {
        root: {
            color: COLOR.white,
            marginRight: 5
        }
    },
    gender: {
        root: {
            fontSize: 11,
            color: COLOR.white
        }
    },
    infoName: {
        root: {
            fontWeight: 'bold',
            color: COLOR.white
        }
    },
    infoAccount: {
        root: {
            fontSize: 14,
            color: COLOR.white,
            marginRight: 5,
        }
    }
};

