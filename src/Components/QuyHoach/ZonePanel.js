import React from 'react';
import {Text, Stack, Label, Checkbox, ScrollablePane, Link, Icon} from '@fluentui/react';
import {useDispatch,useSelector} from "react-redux";
import Type from "../../Redux/Type";
import Viewer from 'react-viewer';

const ZonePanel = () =>{
    const {showQuyHoach,listLabel,labelActive,typeActive} = useSelector(state=>state.quyHoach);
    const dispatch = useDispatch();
    const [showPhotoViewer,setShowPhotoViewer] = React.useState(false);
    const [showInitIndex,setShowInitIndex] = React.useState(0);

    const onChangeShowPhotoViewer =(index)=>()=>{
        if (!showPhotoViewer)
            setShowInitIndex(index);
        setShowPhotoViewer(!showPhotoViewer);
    }

    const onChangeLayerQuyHoachActive =(layer)=>()=>
    {
        if (!labelActive.includes(layer))
            dispatch({
                type:Type.SET_STATE_QUY_HOACH,
                route:'labelActive',
                value:[...labelActive,layer]
            })
        else
            dispatch({
                type:Type.SET_STATE_QUY_HOACH,
                route:'labelActive',
                value:labelActive.filter(e=>e !== layer)
            })
    };

    return(
        <div className='modal-content-container'>
            <ScrollablePane>
                <div className='animated-panel position-relative'>
                    <Text variant='xLarge' className='title'>Thông tin quy hoạch</Text>
                    <Stack tokens={{childrenGap:10}} style={{flex:1}}>
                        <Stack>
                            <Label>Bản đồ quy hoạch</Label>
                            <Text>{typeActive.text}</Text>
                        </Stack>
                        {typeActive.document ?
                            <Stack>
                                <Label>Quyết định ban hành</Label>
                                <Link>{typeActive.document}</Link>
                            </Stack>
                            : null
                        }
                        {/*<Stack>*/}
                        {/*    <Label>Hình ảnh</Label>*/}
                        {/*    <Stack horizontal style={{flexWrap:'wrap'}} tokens={{childrenGap:3}}>*/}
                        {/*        {imageTest.map((e,i)=>(*/}
                        {/*            <ImageButton*/}
                        {/*                key = {i}*/}
                        {/*                src={e.thumbnail}*/}
                        {/*                onClick={onChangeShowPhotoViewer(i)}*/}
                        {/*            />*/}
                        {/*        ))}*/}
                        {/*    </Stack>*/}
                        {/*</Stack>*/}
                        <Stack style={{flex:1,marginRight:-15,paddingBottom:50}}>
                            <Label>Các lớp quy hoạch</Label>
                            <Stack tokens={{childrenGap:10}} style={{paddingBottom:20}}>
                                {listLabel.map(e=>(
                                    <Checkbox
                                        key={e.key}
                                        label={e.value}
                                        onChange={onChangeLayerQuyHoachActive(e.key)}
                                        checked={labelActive.includes(e.key)}
                                        disabled={!showQuyHoach}
                                        color={e.strokeColor}
                                        onRenderLabel={CheckLabel}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </ScrollablePane>
            <Viewer
                visible={showPhotoViewer}
                onClose={onChangeShowPhotoViewer()}
                images={imageTest}
                noToolbar = {true}
                zoomSpeed = {0.1}
                showTotal = {true}
                activeIndex = {showInitIndex}
            />
        </div>
    )
};

export default ZonePanel;

// const ImageButton = ({onClick,src,alt})=>
// {
//     return(
//         <TooltipHost content={alt} >
//             <Stack className='position-relative' onClick={onClick}>
//                 <Image
//                     className='image-icon'
//                     src={src}
//                     height={50}
//                     width={50}
//                 />
//             </Stack>
//         </TooltipHost>
//     )
// }

const CheckLabel = ({label,color,checked})=>
{
    return (
        <Stack tokens={{childrenGap:5}} horizontal styles={{root:{marginLeft:10}}}>
            <Icon iconName={'CheckboxFill'} styles={{root:{color:checked ? color : 'transparent'}}}/>
            <Text variant='small'>{label}</Text>
        </Stack>
    )
}


const imageTest = [
    {
        src:'http://ilis.tayninh.gov.vn/quyhoach/tayninh/tptayninh/phankhu3/khungkientruc.jpg',
        alt:'Ảnh công bố quy hoạch',
        thumbnail:'https://dl.dropboxusercontent.com/s/zg3w9pnx515pl1b/Icon-57.png'
    }
]
