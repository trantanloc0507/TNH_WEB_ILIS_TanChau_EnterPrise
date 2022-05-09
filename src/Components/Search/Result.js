import React, { useRef } from 'react';
import { Text, Stack, Icon, List, Link, FocusZone, FocusZoneDirection } from '@fluentui/react';
import { useSelector } from 'react-redux';
import { Card } from '@uifabric/react-cards';
import COLOR from "../../Styles/Colors";
import Layout from "../../Styles/Layout";
import PanelInfo from "./PanelInfo";
import { getPolygonByToThua, getPolygonByToThuaEnter } from "../../Containers/MapView";
import URL from "../../Containers/MainController";


const Result = () => {

    const cardInfoLayout = useRef(null);
    const { listResult } = useSelector(state => state.searchState);
    //const { typeServer } = useSelector(state => state.mapView);
    const typeServer = localStorage.getItem(URL.serverSelected)

    const _renderItem = (item, index) => {
        return (
            <CardItemPerson
                key={index}
                item={item}
                onCardItemPress={onCardItemPress(item)}
            />
        )
    };

    const onCardItemPress = (item) => () => {
        if (typeServer === 'tnh') {
            let dataLoadPolygon = {
                SoTo: item.SOTO,
                SoThua: item.SOTHUA,
                MaDvhc: item.MADVHC,
                TenChu: '',
            };
            getPolygonByToThua(dataLoadPolygon)
        } else {
            console.log(item)
            let dataLoadPolygon = {
                SoTo: item.SOTO,
                SoThua: item.SOTHUA,
                idBanDo: item.idBanDo,
                idThuaDat: item.Idthuadat
            };
            getPolygonByToThuaEnter(dataLoadPolygon)
        }
        cardInfoLayout.current.onShowCardInfo(item);
    };

    return (
        <div className='modal-content-container'>
            <div className='animated-panel position-relative'>
                <Text variant='xLarge' className='title'>Kết quả
                    <Text variant='medium'
                        styles={{ root: { color: COLOR.darkGray, marginLeft: 6 } }}>{listResult.length}</Text>
                </Text>
                <Stack styles={styles.resultStack}>
                    <FocusZone direction={FocusZoneDirection.vertical}>
                        <List
                            items={listResult}
                            onRenderCell={_renderItem}
                        />
                    </FocusZone>
                </Stack>
            </div>
            <PanelInfo
                ref={cardInfoLayout}
            />
        </div>
    )
};

const CardItemPerson = props => {
    const { item } = props;

    return (
        <Card
            tokens={{ childrenMargin: 12 }}
            styles={styles.cardContainer}
        >
            {item.Ten1 || item.Ten2 ?
                <Card.Item styles={styles.footerCardSectionStyles}>
                    <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginBottom: 10 } }}>
                        <Icon iconName={'Contact'} styles={styles.accountIcon(item.GioiTinh1)} />
                        <Stack>
                            <Text>{item.Ten1}</Text>
                            <Text variant='small' styles={{ root: { color: COLOR.darkGray } }}>
                                <Icon iconName="BirthdayCake" styles={{ root: { marginRight: 5 } }} />
                                {item.NamSinh1}
                                <Icon iconName="LocationDot" styles={{ root: { margin: '0px 5px', color: COLOR.grey } }} />
                                <Icon iconName="Home" styles={{ root: { marginRight: 5 } }} />
                                {item.DiaChi1}
                            </Text>
                        </Stack>
                    </Stack>
                    {item.Ten2 ?
                        <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginBottom: 10 } }}>
                            <Icon iconName={'Contact'} styles={styles.accountIcon(item.GioiTinh2)} />
                            <Stack>
                                <Text>{item.Ten2}</Text>
                                <Text variant='small' styles={{ root: { color: COLOR.darkGray } }}>
                                    <Icon iconName="BirthdayCake" styles={{ root: { marginRight: 5 } }} />
                                    {item.NamSinh2}
                                    <Icon iconName="LocationDot" styles={{ root: { margin: '0px 5px', color: COLOR.grey } }} />
                                    <Icon iconName="Home" styles={{ root: { marginRight: 5 } }} />
                                    {item.DiaChi2}
                                </Text>
                            </Stack>
                        </Stack>
                        : undefined
                    }
                </Card.Item>
                : null
            }
            <Card.Item styles={{ root: { paddingTop: (!item.Ten1 && !item.Ten2) ? 8 : 0 } }}>
                <Stack horizontal verticalAlign='end' horizontalAlign='space-between'>
                    <Text variant='small'>
                        <span style={styles.titleFooter}>Bản đồ : </span>
                        <Link onClick={props.onCardItemPress}>Tờ {item.SOTO}, Thửa {item.SOTHUA}</Link>
                    </Text>
                    <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 5 }}>
                        <span style={styles.titleFooter}>Diện tích:</span>
                        <span style={styles.contentFooter}>{item.DienTich}</span>
                        <span style={styles.titleFooter}>m2</span>
                    </Stack>
                </Stack>
            </Card.Item>
        </Card>
    )
};

export default Result;

const styles = {
    cardContainer: {
        root: {
            width: Layout.resultItem,
            maxWidth: Layout.resultItem,
            backgroundColor: COLOR.white,
            cursor: 'pointer',
            paddingTop: 5,
            marginBottom: 16
        }
    },
    resultStack: {
        root: {
            paddingBottom: 20,
            overflow: 'scroll',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 68,
            paddingLeft: 16
        }
    },
    footerCardSectionStyles: {
        root: {
            borderBottom: '1px solid #F3F2F1',
        },
    },
    titleFooter: {
        fontSize: 12,
        color: COLOR.darkGray
    },
    contentFooter: {
        fontSize: 13,
        color: COLOR.black
    },
    accountIcon: isFemale => ({
        root: {
            color: isFemale ? COLOR.blue : '#CB511B'
        }
    })
};

