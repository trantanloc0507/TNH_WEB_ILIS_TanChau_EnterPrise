import React, { useState } from 'react';
import {
    Text, Stack, Link, PersonaSize, Persona, PersonaPresence,
    Dialog, DialogFooter, PrimaryButton, DefaultButton, DialogType
} from '@fluentui/react';
import { useSelector, useDispatch } from "react-redux";
import URL from "../../Containers/MainController";
import Type from "../../Redux/Type";
import { onCloseRightPanel, onOpenRightPanel } from "../../Containers/RightPanelAction";


const Account = () => {
    const dispatch = useDispatch();
    const [hideDialog, setHideDialog] = useState(true);
    const userInfo = useSelector(state => state.userInfo)
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    //const { typeServer } = useSelector(state => state.mapView);
    const typeServer = localStorage.getItem(URL.serverSelected)

    const isTNH = typeServer === 'tnh';

    const user = isTNH ? userInfo : userInfoEnter


    const onHideDialog = () => setHideDialog(true);
    const onShowDialog = () => setHideDialog(false);

    const onSignOut = () => {
        if (isTNH) {
            localStorage.removeItem(URL.token);
            dispatch({ type: Type.SET_TOKEN, token: '' })
            dispatch({ type: Type.SET_USER_INFO, userInfo: '' });
        } else {
            localStorage.removeItem(URL.tokenEnterPrise);
            dispatch({ type: Type.SET_TOKEN_ENTER, token: '' })
            dispatch({ type: Type.SET_USER_INFO_ENTER, userInfo: '' });
        }
        onCloseRightPanel();
    }

    const onChangePasswordPress = () => onOpenRightPanel(isTNH ? 'changePassword' : 'changePasswordEnter')


    return (
        <div className='modal-content-container'>
            <div className='animated-panel'>
                <Stack horizontalAlign='center' styles={styles.container} tokens={{ childrenGap: 16 }}>
                    <Persona
                        text={user.FullName}
                        size={PersonaSize.size72}
                        presence={PersonaPresence.online}
                        hidePersonaDetails={true}
                    />
                    <Stack horizontalAlign='center' tokens={{ childrenGap: 5 }}>
                        <Text variant='mediumPlus'>{user.FullName}</Text>
                        <Text variant='medium'>{user.Username}</Text>
                    </Stack>
                    <Stack tokens={{ childrenGap: 5 }} horizontalAlign='center'>
                        {
                            isTNH ? <Link onClick={onChangePasswordPress}>  ?????i m???t kh???u </Link> : null
                        }

                        <Link onClick={onShowDialog}>????ng xu???t</Link>
                    </Stack>
                </Stack>
            </div>
            <Dialog
                hidden={hideDialog}
                onDismiss={onHideDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: '????ng xu???t ' + (isTNH ? 'server TNH' : 'server Enterprise'),
                    closeButtonAriaLabel: '????ng',
                    subText: 'B???n c?? mu???n ????ng xu???t t??i kho???n ?',
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={onSignOut} text="????ng xu???t" />
                    <DefaultButton onClick={onHideDialog} text="H???y b???" />
                </DialogFooter>
            </Dialog>
        </div>
    )
};

export default Account;

const styles = {
    container: {
        root: {
            marginTop: 30,
        }
    }
};

