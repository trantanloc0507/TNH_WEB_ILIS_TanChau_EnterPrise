import React from 'react';
import {IconButton, Stack,Text,Icon,Label,ScrollablePane,Link} from "@fluentui/react";
import {NeutralColors,SharedColors} from "@uifabric/fluent-theme";
import {onShowOffQuyHoachInfoPanel} from "../../Containers/QuyHoach";
import {useSelector} from "react-redux";
import {mapGeoType} from "../../Containers/QuyHoach";

const PanelQuyHoachInfo = () =>
{
    const {typeActive,selected} = useSelector(state=>state.quyHoach);
    // useEffect(()=>{
    //     let elHeight = document.getElementById('panel-qh-info').clientHeight;
    // },[typeActive,selected])

    return (
        <Stack id={'panel-qh-info'} style={styles.container} className='qh-panel-info-visible'>
            <Stack style={styles.headerBar} horizontal verticalAlign={'center'}>
                <Text variant='medium' style={styles.headerTitle}>Thông tin quy hoạch</Text>
                <IconButton
                    styles={styles.closeButton}
                    iconProps={{iconName: 'Cancel'}}
                    onClick={onShowOffQuyHoachInfoPanel}
                />
            </Stack>
            <Stack style={{flex:1,position:'relative'}}>
                <ScrollablePane>
                    <Stack tokens={{childrenGap:5}} style={{padding:12}}>
                        <Stack horizontal tokens={{childrenGap:5}} verticalAlign='center'>
                            {selected.geoType === mapGeoType.LINESTRING ?
                                <Icon iconName='Trending12' style={{fontSize:20,color:selected.strokeColor}}/>
                                :
                                selected.geoType === mapGeoType.POLYGON ?
                                    <Icon iconName='SquareShapeSolid' style={{fontSize:20,color:selected.strokeColor}}/>
                                    :
                                    <Icon iconName='MapPinSolid' style={{fontSize:20,color:selected.strokeColor}}/>
                            }
                            <Text>{selected.name}</Text>
                        </Stack>
                        <Stack>
                            <Label>Thuộc bản đồ</Label>
                            <Text>{typeActive.text}</Text>
                        </Stack>
                        {typeActive.document ?
                            <Stack>
                                <Label>Quyết định ban hành</Label>
                                <Link><Text>{typeActive.document}</Text></Link>
                            </Stack>
                            : null
                        }
                    </Stack>
                </ScrollablePane>
            </Stack>
        </Stack>
    )
}

export default PanelQuyHoachInfo;

const styles = {
    container:{
        width:330,
        bottom:5,
        height:150,
        backgroundColor:NeutralColors.white,
        position:'absolute',
        zIndex:3000,
        left:5,
        boxShadow:'0 1px 4px rgba(0, 0, 0, 0.3)',
    },
    headerBar:{
        backgroundColor: SharedColors.cyanBlue10,
        paddingLeft:10
    },
    headerTitle:{
        flex:1,
        color:NeutralColors.white,

    },
    closeButton: {
        root: {
            color: NeutralColors.white,
        },
        rootHovered: {
            color: NeutralColors.white,
            backgroundColor: SharedColors.cyanBlue20
        },
        rootPressed: {
            color: SharedColors.cyanBlue10,
            backgroundColor: SharedColors.cyanBlue20
        }
    },
    typeTitle:{
        margin:10
    }
}
