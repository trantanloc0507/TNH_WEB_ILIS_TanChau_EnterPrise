import React from 'react';
import { IconButton, TooltipHost, DirectionalHint } from '@fluentui/react';
import ContentRightPanel from "./ContentRightPanel";
import { useSelector } from "react-redux";
import Layout from "../../Styles/Layout";
import { onCloseRightPanel } from "../../Containers/RightPanelAction";

const RightPanel = () => {
    const { className, isShow, routeContent } = useSelector(state => state.rightPanel)

    return (
        isShow ?
            <div style={styles.modal(window.innerWidth)}  className={className}>
                <ContentRightPanel
                    route={routeContent}
                />
                <div style={styles.closeButtonView}>
                    <TooltipHost
                        content={'Đóng'}
                        styles={{ root: { display: 'inline-block' } }}
                        directionalHint={DirectionalHint.bottomCenter}
                    >
                        <IconButton
                            iconProps={{ iconName: 'ChromeClose' }}
                            styles={styles.closeButton}
                            onClick={onCloseRightPanel}
                        />
                    </TooltipHost>
                </div>
            </div>
            : null
    )
}

export default RightPanel

const styles = {
    modal: (e)=>({
        height: 'calc(100vh - 48px)',
        width: e > 1000 ? Layout.panelWidth : Layout.panelWidthMobie,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    }),
    closeButtonView: {
        position: 'absolute',
        top: 12,
        left: 'calc(100% - 44px)',
    },
    closeButton: {
        root: {
            height: 40,
            width: 40,
            borderRadius: 0,
            zIndex: 99
        },
        icon: {
            color: '#4C4A48',
            fontSize: 12
        },
        rootHovered: {
            backgroundColor: 'rgba(0,0,0,.1)'
        }
    }
};
