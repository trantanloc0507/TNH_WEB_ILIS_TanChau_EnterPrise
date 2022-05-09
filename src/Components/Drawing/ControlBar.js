import React from 'react';
import {IconButton, TooltipHost, DirectionalHint,Stack} from '@fluentui/react';
import { NeutralColors,SharedColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import {FontSizes} from "@uifabric/fluent-theme";
import {useSelector,useDispatch} from 'react-redux';
import DrawingMode from "./Mode";
import Type from "../../Redux/Type";

const ControlBar = props =>
{
    const {showTool,drawingMode,evtPath} = useSelector(state=>state.drawingTool);
    const dispatch = useDispatch();
    const onStopPress = ()=>dispatch({type:Type.STOP_DRAWING})
    const onStartPress = ()=>dispatch({type:Type.START_DRAWING})
    const onClearPress = ()=>dispatch({type:Type.CLEAR_PATH_DRAWING});

    const onDonePress = ()=>{
        dispatch({type:Type.SET_SHOW_MAIN_MODAL})
    }

    return (
        showTool ?
            <Stack styles={styles.container} horizontal>
                <ActionButton
                    iconName={'HandsFree'}
                    tooltip='Tạm dừng'
                    active = {drawingMode === DrawingMode.STOP}
                    onClick={onStopPress}
                />
                <ActionButton
                    iconName={'EditCreate'}
                    active = {drawingMode === DrawingMode.POLYGON}
                    tooltip='Thiết kế'
                    onClick={onStartPress}
                    disabled={evtPath}
                />
                <ActionButton
                    iconName={'EraseTool'}
                    tooltip='Xóa bản vẽ'
                    disabled={!evtPath}
                    onClick={onClearPress}
                />
                <ActionButton
                    iconName={'CheckMark'}
                    tooltip='Hoàn tất'
                    disabled={!evtPath}
                    onClick={onDonePress}
                />
            </Stack>
            : null
    )
}

export default ControlBar;

const ActionButton = ({iconName,tooltip,active,onClick,disabled}) =>
{
    return (
        <TooltipHost
            content={tooltip}
            styles={{root:{display: 'inline-block'}}}
            directionalHint={DirectionalHint.bottomCenter}
        >
            <IconButton
                iconProps={{iconName:iconName}}
                styles={styles.iconButton(active)}
                onClick={onClick}
                disabled = {disabled}
            />
        </TooltipHost>
    )
};

const styles = {
    container:{
        root:{
            position:'absolute',
            top:56,
            left:10,
            boxShadow:'0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02)',
            borderRadius:2,
            overflow:'hidden'
        }
    },
    iconButton:(active)=>({
        root:{
            height:30,
            width:30,
            backgroundColor:active ? SharedColors.cyanBlue10 : NeutralColors.white,
            borderRadius: 0
        },
        rootHovered:{
            backgroundColor:active ? SharedColors.cyanBlue10 : NeutralColors.gray30
        },
        rootPressed:{
            backgroundColor:active ? SharedColors.cyanBlue20 : NeutralColors.gray40
        },
        icon:{
            color:active ? NeutralColors.white : NeutralColors.black,
            fontSize: FontSizes.size14,
        },
        iconHovered:{
            color: active ? NeutralColors.white : NeutralColors.black,
        },
        iconPressed:{
            opacity:.6
        }
    }),
}
