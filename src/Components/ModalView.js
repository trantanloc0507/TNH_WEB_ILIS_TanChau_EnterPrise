import React from 'react';
import { Text, Stack, Modal, Icon, PrimaryButton } from '@fluentui/react';
import COLOR from "../Styles/Colors";


export const ModalView = props => {
    return (
        <Modal
            isOpen={props.isOpen}
            isBlocking={false}
            onDismiss={() => { props.onDismiss() }}
            dragOptions={null}
            styles={styles.modal}
        >
            <Stack style={styles.containter}>
                <Icon iconName='RingerSolid' styles={styles.titleIcon} />
                <Text style={styles.title}>{'Thông báo'}</Text>
                <Text style={styles.center}>{props.mess}</Text>
                <PrimaryButton text="Thoát" onClick={() => { props.onDismiss() }} style={styles.button} />
            </Stack>
        </Modal>
    )
};


const styles = {
    containter: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#0174DF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    titleIcon: {
        root: {
            color: COLOR.blue,
            fontSize: 20,
        }
    },
    button: {
        marginTop: 20,
        borderRadius: 10
    },
    modal: {
        root: {
            zIndex: 0,
        },
        main: {
            borderRadius: 5,
            minHeight: 200,
            minWidth: 200,
            width: 250,
            justifycontent: 'center',
            alignItems: 'center',
            marginTop: '-15%',
        }
    },
    center: {
        textAlign: 'center',
        color: COLOR.black,
        fontFamily: 'Open Sans',
        paddingLeft: 10,
        paddingRight: 10
        //   marginBottom: 10
    },
    processButton: {
        root: {
            backgroundColor: COLOR.transparent,
        },
        rootHovered: {
            backgroundColor: COLOR.blue
        },
        iconHovered: {
            color: COLOR.white
        },
        label: {
            fontSize: 12,
            color: COLOR.white
        },
        icon: {
            fontSize: 16,
            color: COLOR.white
        }
    },
};

