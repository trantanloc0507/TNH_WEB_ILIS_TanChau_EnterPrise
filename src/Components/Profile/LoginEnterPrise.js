import React from 'react';
import { Text, Stack, TextField, Link, PrimaryButton, Dialog, DialogFooter, DialogType, Spinner, MessageBar, MessageBarType, Checkbox } from '@fluentui/react';
import { onAuthenticationEnterPrise } from '../../Containers/Login';
import { store } from "../../Redux/Store";
import { onCloseRightPanel } from "../../Containers/RightPanelAction";
import LinkAPI, { onRequestEnterPrise } from '../../Containers/MainController';
import { ModalView } from "../ModalView";


const contentExplanation =
    'Đăng nhập bằng tài khoản đã được Quản trị viên cung cấp trên server Enterprise';
const contentExplanationChangePassword =
    'Nhập email đăng ký của hệ thống để nhận lại mật khẩu';

class LoginEnterPrise extends React.PureComponent {

    state = {
        contentDialog: '',
        rememberLogin: true,
        usernameEnter: '',
        passwordEnter: '',
        lastPasswordEnter: '',
        confirmPasswordEnter: '',
        isLogin: this.props.route === 'login',
        isChangePasswordSuccess: false,
        isLoading: false,
        errorMessage: '',
        closeAndBack: false,
        mailXacThuc: '',
        isOpen: false
    };

    componentDidMount() {
        if (!this.state.isLogin) {
            this.setState({ usernameEnter: store.getState()['UserInfoEnter']['Username'] });
        }
    }

    onCallLoginAPI = () => {
        let { usernameEnter, passwordEnter } = this.state;
        usernameEnter = usernameEnter.trim();
        let payload = new URLSearchParams();
        payload.append('username', usernameEnter);
        payload.append('password', passwordEnter);
        // payload.append('username', 'mobile.tnh');
        // payload.append('password', 'mb123456aA@');
        payload.append('grant_type', 'password');
        payload.append('client_id', 'vilis-mobile-client');
        payload.append('client_secret', `n\)3b\^Q7g]Jd6T\&\$\^`);

        this.setState({ isLoading: true });
        let onSuccess = ({ statusCode, response }) => {
            if (statusCode === 200) {
                onCloseRightPanel()
            } else {
                this.setState({ errorMessage: response, isLoading: false })
            }
        };
        onAuthenticationEnterPrise(payload, { username: usernameEnter, password: passwordEnter }, onSuccess);
    };

    onForgetPassWord = () => {
        this.setState({ isLoading: true });
        let { mailXacThuc } = this.state;
        mailXacThuc = mailXacThuc.trim();
        let payload = new URLSearchParams();
        payload.append('email', mailXacThuc);

        this.setState({ isLoading: true });
        let onSuccess = ({ statusCode, response }) => {
            this.setState({ isLoading: false })
            if (statusCode === 200) {
                this.setState({ isOpen: true, mailXacThuc: '' })
            } else {
                this.setState({ errorMessage: 'Đã có lỗi xảy ra vui lòng thử lại sau.' })
            }
        };
        onRequestEnterPrise(LinkAPI.ForgetPassWordEnter, onSuccess, payload);
    };

    onOpenDialog = (route) => () => {
        let content;
        switch (route) {
            case "noAccount": {
                content = 'Thật xin lỗi vì sự bất tiện này, hiện tại do tính bảo mật của dữ liệu, hệ thống chỉ có thể cung cấp tài khoản cho cá nhân, tổ chức liên quan.';
                break;
            }
            case 'forgotPassword': {
                content = 'Để lấy lại mật khẩu, xin vui lòng liên hệ với quản trị viên Trung tâm Công nghệ Thông tin - VNPT Tây Ninh.';
                break;
            }
            default:
                break
        }
        this.setState({ contentDialog: content });
    };

    onCloseDialog = () => {
        if (this.state.closeAndBack)
            onCloseRightPanel();
        else
            this.setState({ contentDialog: '' })
    };

    onChangeUsername = (_, usernameEnter) => this.setState({ usernameEnter });
    onChangePassword = (_, passwordEnter) => this.setState({ passwordEnter });
    onChangeEmail = (_, mailXacThuc) => this.setState({ mailXacThuc });
    onChangeLastPassword = (_, passwordEnter) => this.setState({ lastPasswordEnter: passwordEnter });
    onChangeConfirmPassword = (_, passwordEnter) => this.setState({ confirmPasswordEnter: passwordEnter });

    onLoginPress = () => {
        let { usernameEnter, passwordEnter, isLogin, confirmPasswordEnter, lastPasswordEnter } = this.state;
        usernameEnter = usernameEnter ? usernameEnter.trim() : '';
        if (isLogin) {
            if (usernameEnter && passwordEnter)
                this.onCallLoginAPI();
            else
                this.setState({ errorMessage: 'Vui lòng nhập đầy đủ thông tin' })
        }
        else {
            if (passwordEnter && lastPasswordEnter && lastPasswordEnter === confirmPasswordEnter) {
                this.setState({ errorMessage: '' })
                this.onChangePassWord();
            }
            else
                this.setState({ errorMessage: 'Vui lòng nhập đầy đủ thông tin' })
        }
    };

    handleEnterPress = (ent) => {
        if (ent.key === 'Enter')
            this.onLoginPress()
    };


    render() {
        let { isLogin, isLoading, errorMessage } = this.state;
        return (
            <div className='modal-content-container'>
                <ModalView
                    isOpen={this.state.isOpen}
                    onDismiss={() => { this.setState({ isOpen: false }) }}
                    title={'Thông báo'}
                    mess={'Đã gửi email xác thực !'}
                />
                <div className='animated-panel'>
                    <Text variant='xLarge' className='title'>
                        {isLogin ? 'Đăng nhập Enterprise' : 'Đổi mật khẩu Enterprise'}
                    </Text>
                    <div>
                        <Text>{isLogin ? contentExplanation : contentExplanationChangePassword}</Text>
                        <br />
                        <br />
                    </div>
                    {isLogin ?
                        <Stack tokens={{ childrenGap: 16 }}>
                            <TextField
                                placeholder="Tài khoản đăng nhập"
                                onChange={this.onChangeUsername}
                                value={this.state.usernameEnter}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <TextField
                                type='password'
                                placeholder="Mật khẩu"
                                onChange={this.onChangePassword}
                                value={this.state.passwordEnter}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <Checkbox label="Lưu đăng nhập" checked={this.state.rememberLogin} disabled={isLoading} />
                            <PrimaryButton text="Đăng nhập" onClick={this.onLoginPress} disabled={isLoading} />
                            <Spinner hidden={!isLoading} />
                            {errorMessage ?
                                <MessageBar
                                    messageBarType={MessageBarType.error}
                                    isMultiline={true}
                                >
                                    {errorMessage}
                                </MessageBar> : null
                            }
                            <br />
                            <Link
                                onClick={() => {
                                    this.setState({ isLogin: false })
                                }}
                                style={{ fontSize: 13 }}
                                disabled={isLoading}
                            >
                                Quên mật khẩu ?
                            </Link>
                            <Link
                                onClick={this.onOpenDialog('noAccount')}
                                style={{ fontSize: 13 }}
                                disabled={isLoading}
                            >
                                Bạn chưa có tài khoản ?
                            </Link>
                        </Stack>
                        :
                        <Stack tokens={{ childrenGap: 16 }}>
                            <TextField
                                placeholder="Email"
                                onChange={this.onChangeEmail}
                                value={this.state.mailXacThuc}
                                disabled={isLoading}
                            />
                            <PrimaryButton text="Gửi xác thực" onClick={this.onForgetPassWord} disabled={isLoading} />
                            <Spinner
                                label="Đang gửi xác thực..."
                                ariaLive="assertive"
                                labelPosition="right"
                                hidden={!isLoading}
                            />
                            {errorMessage ?
                                <MessageBar
                                    messageBarType={MessageBarType.error}
                                    isMultiline={true}
                                >
                                    {errorMessage}
                                </MessageBar> : null
                            }
                            <br />

                        </Stack>
                    }
                </div>
                <Dialog
                    hidden={!this.state.contentDialog}
                    onDismiss={this.onCloseDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Thông báo',
                        closeButtonAriaLabel: 'Đóng',
                        subText: this.state.contentDialog,
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } },
                        dragOptions: false,
                    }}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={this.onCloseDialog} text="Đồng ý" />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
}

export default LoginEnterPrise;

