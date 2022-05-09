import React from "react";
import { connect } from 'react-redux';
import '../../Styles/reset.css'
import '../../Styles/Main.css'
import HeaderBar from '../Menu/HeaderBar'
import Container from './Container';
import { MessageBar, MessageBarType, Modal } from "@fluentui/react";
import Layout from "../../Styles/Layout";
import URL, { decodeResponse, onRequestEnterPrise } from "../../Containers/MainController";
import LinkAPI from "../../Containers/MainController";
import Type from "../../Redux/Type";
import DrawingToolBar from "../Drawing/ControlBar";
import Statistical from "../Drawing/Statistical";
import { store } from "../../Redux/Store";
import { onLoadMenu as loadMenuQuyHoach } from "../../Containers/QuyHoach";
import setup from "../../Containers/setup";


class Main extends React.PureComponent {

    state = {
        routeMenuBar: '',
        message: ''
    };

    componentDidMount() {
        document.title = setup.title;
        this.onSetLoginStateAtStart();
    }

    onSetLoginStateAtStart = () => {
        //let userInfoTNH = null;
        let token = localStorage.getItem(URL.token)
        let tokenEnterPrise = localStorage.getItem(URL.tokenEnterPrise)
        let typeServer = localStorage.getItem(URL.serverSelected)
        if (!typeServer) {
            localStorage.setItem(LinkAPI.serverSelected, 'tnh')
        }
        if (token) {
            let userInfo = decodeResponse(token);
            userInfo = JSON.parse(userInfo);
            // userInfoTNH = userInfo;
            this.props.dispatch({ type: Type.SET_USER_INFO, userInfo });
            this.props.dispatch({ type: Type.SET_TOKEN, token: token });
        }
        if (tokenEnterPrise) {
            let payload = new URLSearchParams();
            payload.append('access_token', tokenEnterPrise);
            let onGetInfo = ({ statusCode, response }) => {
                if (statusCode === 200) {
                    const userInfo = {
                        Expired: null,
                        FullName: response.name,
                        Organization: null,
                        Password: null,
                        PhoneNumber: response.phone_number,
                        Username: null
                    }
                    store.dispatch({ type: Type.SET_USER_INFO_ENTER, userInfo });
                    store.dispatch({ type: Type.SET_TOKEN_ENTER, token: tokenEnterPrise });
                    // if (!userInfoTNH) {
                    //     store.dispatch({ type: Type.SET_TYPE_SERVER, value: 'enterprise' });
                    // }
                } else {
                    localStorage.removeItem(URL.tokenEnterPrise);
                }
            };
            onRequestEnterPrise(LinkAPI.getInfo, onGetInfo, payload);
        }

        loadMenuQuyHoach();
    };

    onCloseModal = () => this.props.dispatch({ type: Type.SET_SHOW_MAIN_MODAL })

    render() {
        return (
            <section className='position-absolute' style={styles.container}>
                <Container />
                <HeaderBar />
                <DrawingToolBar />
                {this.props.message ?
                    <MessageBar
                        messageBarType={MessageBarType.blocked}
                        isMultiline={true}
                        onDismiss={() => store.dispatch({ type: Type.SET_MAIN_MESSAGE, message: '' })}
                        truncated={true}
                        dismissButtonAriaLabel="Đóng"
                        styles={styles.messageBar}
                    >
                        {this.props.message}
                    </MessageBar>
                    : undefined
                }
                <Modal
                    isOpen={this.props.showModal}
                    onDismiss={this.onCloseModal}
                    isBlocking={false}
                    dragOptions={null}
                >
                    <Statistical />
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    showModal: state.mapView.showModal,
    message: state.mainAlertMessage,
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(Main);

const styles = {
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff'
    },
    messageBar: {
        root: {
            position: 'absolute',
            top: 48,
            right: 0,
            width: Layout.warningMessage,
            backgroundColor: '#FDE7E9'
        }
    },
    modalContainer: {
        display: 'flex',
        width: 300
    }
};

