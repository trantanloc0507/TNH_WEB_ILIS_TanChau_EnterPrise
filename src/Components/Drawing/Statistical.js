import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    IconButton,
    FontWeights,
    FontSizes,
    Stack,
    Text,
    DetailsList,
    DetailsListLayoutMode,
    ScrollablePane,
    SelectionMode,
    Sticky,
    Toggle
} from '@fluentui/react';
import {NeutralColors, SharedColors} from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import Type from "../../Redux/Type";
import {convertLatLonToXY} from "../../Containers/Converter";
import {Error, Loading} from "../Accessary";
import {onLoadStatistical} from "../../Containers/QuyHoach";

const Statistical = props => {
    const [isMount, setMount] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [totalField, setTotalField] = useState(0);
    const [totalArea, setTotalArea] = useState(0);
    const [totalMdsd, setTotalMdsd] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [detailMode, setDetailMode] = useState(true);
    const {evtPath} = useSelector(state => state.drawingTool);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isMount) {
            const onLoadInMount = () => {
                setMount(false);
                setLoading(false);
                let paths = evtPath.getPath().getArray(),
                    coords = paths.map((a) => (convertLatLonToXY({
                        latitude: a.lat(),
                        longitude: a.lng()
                    })));
                coords = [...coords, coords[0]]
                coords = coords.map(e => `${e.y} ${e.x}`)
                let polygonStr = coords.join(','),
                    payload = {
                        Polygon: `POLYGON ((${polygonStr}))`
                    };
                onLoadStatistical(payload, onLoadSuccess);
            }
            onLoadInMount()
        }
    }, [isMount, isLoading,evtPath])

    const onLoadSuccess = ({statusCode, response}) => {
        setLoading(false);
        if (statusCode === 200)
        {
            setTotalArea(response.areaTotal)
            setTotalField(response.fieldTotal)
            setTotalMdsd(response.mdsdTotal)
            setDetail(response.detail)
        }
        else
            setErrorMessage(response)
    }

    const onClose = () => dispatch({type: Type.SET_SHOW_MAIN_MODAL});

    const _renderHeaderColumn = (detailsHeaderProps, defaultRender) => {
        return (
            <Sticky>
                {defaultRender(detailsHeaderProps)}
            </Sticky>
        )
    };

    const onModeChange = ()=>setDetailMode(!detailMode)

    return (
        <Stack styles={styles.container}>
            <Stack horizontal horizontalAlign={'space-between'} style={styles.headerView} verticalAlign={'center'}>
                <Text styles={styles.headerTitle}>Thống kê khảo sát</Text>
                <IconButton
                    styles={styles.closeButton}
                    iconProps={{iconName: 'Cancel'}}
                    onClick={onClose}
                />
            </Stack>
            {isLoading ?
                <Loading/>
                :
                errorMessage ?
                    <Error message={errorMessage}/>
                    :
                    <Stack style={{flex: 1}}>
                        <Stack horizontal style={styles.generalView} tokens={{childrenGap: 50}}>
                            <Stack tokens={{childrenGap: 3}}>
                                <Text styles={styles.generalTitle}>Tổng diện tích khảo sát</Text>
                                <Text styles={styles.generalContent}>{totalArea} m2</Text>
                            </Stack>
                            <Stack tokens={{childrenGap: 3}}>
                                <Text styles={styles.generalTitle}>Tổng thửa đất ảnh hưởng</Text>
                                <Text variant={'medium'}>{totalField}</Text>
                            </Stack>
                            <Stack tokens={{childrenGap: 3}}>
                                <Text styles={styles.generalTitle}>Thống kê theo thửa</Text>
                                <Toggle checked={detailMode} onText="Bật" offText="Tắt" onChange={onModeChange} />
                            </Stack>
                            <Stack tokens={{childrenGap: 3}}>
                                <Text styles={styles.generalTitle}>Thống kê theo MDSD</Text>
                                <Toggle checked={!detailMode} onText="Bật" offText="Tắt" onChange={onModeChange} />
                            </Stack>
                        </Stack>
                        <Stack style={{flex: 1, position: "relative", marginLeft: 16}}>
                            <ScrollablePane>
                                {detailMode ?
                                    <DetailsList
                                        styles={{root: {paddingBottom: 20}}}
                                        items={detail}
                                        columns={column}
                                        setKey="multiple"
                                        layoutMode={DetailsListLayoutMode.justified}
                                        selectionMode={SelectionMode.none}
                                        onRenderDetailsHeader={_renderHeaderColumn}
                                    />
                                    :
                                    <DetailsList
                                        styles={{root: {paddingBottom: 20}}}
                                        items={totalMdsd}
                                        columns={columnMDSD}
                                        setKey="multiple"
                                        layoutMode={DetailsListLayoutMode.justified}
                                        selectionMode={SelectionMode.none}
                                        onRenderDetailsHeader={_renderHeaderColumn}
                                    />
                                }
                            </ScrollablePane>
                        </Stack>
                    </Stack>
            }
        </Stack>

    )
}

export default Statistical;

const column = [
    {key: '1', name: 'Stt', fieldName: 'key', maxWidth: 30, minWidth: 30},
    {key: '4', name: 'Xã/Phường', fieldName: 'XA'},
    {key: '2', name: 'Số tờ', fieldName: 'SOTO', maxWidth: 80, minWidth: 80},
    {key: '3', name: 'Số thửa', fieldName: 'SOTHUA', maxWidth: 80, minWidth: 80},
    {key: '5', name: 'Loại đất', fieldName: 'MDSD', maxWidth: 80, minWidth: 80},
    {key: '8', name: 'D.Tích KS', fieldName: 'DTKhaoSat', maxWidth: 100, minWidth: 100},
    {key: '9', name: 'Tỷ lệ', fieldName: 'tile', maxWidth: 80, minWidth: 80},
]

const columnMDSD = [
    {key: '1', name: 'Stt', fieldName: 'key', maxWidth: 30, minWidth: 30},
    {key: '4', name: 'Ký hiệu', fieldName: 'label', maxWidth: 120, minWidth: 120},
    {key: '2', name: 'Tên MDSD', fieldName: 'name'},
    {key: '8', name: 'Diện tích khảo sát', fieldName: 'area', maxWidth: 200, minWidth: 200},
]

const styles = {
    container: {
        root: {
            width: 800,
            height: '90vh',
            overflow: 'hidden'
        }
    },
    headerView: {
        paddingLeft: 16, paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 8,
        backgroundColor: SharedColors.greenCyan10,
        marginBottom: 16
    },
    headerTitle: {
        root: {
            fontSize: FontSizes.mediumPlus,
            color: NeutralColors.white,
            fontWeight: FontWeights.bold
        }
    },
    closeButton: {
        root: {
            color: NeutralColors.white,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: NeutralColors.white,
            backgroundColor: SharedColors.green20
        },
        rootPressed: {
            color: SharedColors.greenCyan10,
            backgroundColor: SharedColors.green20
        }
    },
    generalView: {
        marginLeft: 16,
        marginRight: 16,
        borderBottom: '1px solid #eee',
        paddingBottom: 20
    },
    generalTitle: {
        root: {
            fontSize: FontSizes.smallPlus,
            fontWeight: FontWeights.semibold,
            color: SharedColors.cyanBlue10
        }
    },
    generalContent: {
        root: {
            fontSize: FontSizes.medium,
            // fontWeight: FontWeights.semibold
        }
    }

}
