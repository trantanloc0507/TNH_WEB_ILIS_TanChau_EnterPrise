import React from 'react';
import { Text, Stack, TextField, Link, PrimaryButton, Dialog, DialogFooter, DialogType, Spinner, MessageBar, MessageBarType, Checkbox } from '@fluentui/react';
import {onAuthentication, onChangePassWord} from '../../Containers/Login';
import {store} from "../../Redux/Store";
import {onCloseRightPanel} from "../../Containers/RightPanelAction";

const contentExplanation =
    'Đăng nhập bằng tài khoản đã được Quản trị viên cung cấp trên server TNH.';
const contentExplanationChangePassword =
    'Để đảm bảo an toàn, hệ thống khuyến cáo mật khẩu nên dài trên 8 ký tự, bao gồm ký tự số, ký tự in Hoa và ký tự đặc biệt';

class Login extends React.PureComponent {

    state = {
        contentDialog:'',
        rememberLogin:true,
        username:'',
        password:'',
        lastPassword:'',
        confirmPassword:'',
        isLogin:this.props.route === 'login',
        isChangePasswordSuccess: false,
        isLoading:false,
        errorMessage:'',
        closeAndBack:false,
    };

    componentDidMount() {
        if (!this.state.isLogin){
            this.setState({username:store.getState()['userInfo']['Username']});
        }          
    }

    onCallLoginAPI = () => {
        let {username, password} = this.state;
        username = username.trim();
        let payload = {
            Username: username,
            Password: password,
            AppId: '3518',
        };
        this.setState({isLoading: true});
        let onSuccess = ({statusCode, response}) => {
            if (statusCode === 200) {
                onCloseRightPanel()
            } else {
                this.setState({errorMessage:response,isLoading:false})
            }
        };
        onAuthentication(payload, onSuccess);
    };

    onChangePassWord = () => {
        this.setState({isLoading:true});
        let {lastPassword, password} = this.state;
        let payload = {
            Password: password,
            LastPassword: lastPassword,
        };
        let onSuccess = ({statusCode, response}) => {
            if (statusCode === 200) {
                this.setState({contentDialog:'Đổi mật khẩu thành công',closeAndBack:true,isLoading:true})
            } else {
                this.setState({errorMessage:response,isLoading:false})
            }
        };
        onChangePassWord(payload, onSuccess);
    };

    onOpenDialog = (route)=>()=>
    {
        let content;
        switch (route) {
            case "noAccount" : {
                content = 'Thật xin lỗi vì sự bất tiện này, hiện tại do tính bảo mật của dữ liệu, hệ thống chỉ có thể cung cấp tài khoản cho cá nhân, tổ chức liên quan.';
                break;
            }
            case 'forgotPassword' : {
                content = 'Để lấy lại mật khẩu, xin vui lòng liên hệ với quản trị viên Trung tâm Công nghệ Thông tin - VNPT Tây Ninh.';
                break;
            }
            default:
                break
        }
        this.setState({contentDialog:content});
    };

    onCloseDialog = ()=>
    {
        if (this.state.closeAndBack)
            onCloseRightPanel();
        else
            this.setState({contentDialog:''})
    };

    onChangeUsername = (_,username)=>this.setState({username});
    onChangePassword = (_,password)=>this.setState({password});
    onChangeLastPassword = (_,password)=>this.setState({lastPassword:password});
    onChangeConfirmPassword = (_,password)=>this.setState({confirmPassword:password});

    onLoginPress = ()=>
    {
        let {username,password,isLogin,confirmPassword,lastPassword} = this.state;
        username = username.trim();
        if (isLogin)
        {
            if (username && password)
                this.onCallLoginAPI();
            else
                this.setState({ errorMessage:'Vui lòng nhập đầy đủ thông tin' })
        }
        else
        {
            if (password && lastPassword && lastPassword === confirmPassword)
                this.onChangePassWord();
            else
                this.setState({ errorMessage:'Vui lòng nhập đầy đủ thông tin' })
        }
    };

    handleEnterPress = (ent)=>
    {
        if (ent.key === 'Enter')
            this.onLoginPress()
    };


    render() {
        let {isLogin,isLoading,errorMessage} = this.state;
        return (
            <div className='modal-content-container'>
                <div className='animated-panel'>
                    <Text variant='xLarge' className='title'>
                        {isLogin ? 'Đăng nhập server TNH' : 'Đổi mật khẩu'}
                    </Text>
                    <div>
                        <Text>{isLogin ? contentExplanation : contentExplanationChangePassword}</Text>
                        <br/>
                        <br/>
                    </div>
                    {isLogin ?
                        <Stack tokens={{childrenGap:16}}>
                            <TextField
                                placeholder="Tài khoản đăng nhập"
                                onChange={this.onChangeUsername}
                                value={this.state.username}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <TextField
                                type='password'
                                placeholder="Mật khẩu"
                                onChange = {this.onChangePassword}
                                value={this.state.password}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <Checkbox label="Lưu đăng nhập" checked={this.state.rememberLogin} disabled={isLoading}/>
                            <PrimaryButton text="Đăng nhập" onClick={this.onLoginPress} disabled={isLoading} />
                            <Spinner hidden={!isLoading}/>
                            {errorMessage ?
                                <MessageBar
                                    messageBarType={MessageBarType.error}
                                    isMultiline={true}
                                >
                                    {errorMessage}
                                </MessageBar>: null
                            }
                            <br/>
                            <Link
                                onClick={this.onOpenDialog('forgotPassword')}
                                style = {{fontSize:13}}
                                disabled={isLoading}
                            >
                                Quên mật khẩu ?
                            </Link>
                            <Link
                                onClick={this.onOpenDialog('noAccount')}
                                style = {{fontSize:13}}
                                disabled={isLoading}
                            >
                                Bạn chưa có tài khoản ?
                            </Link>
                        </Stack>
                        :
                        <Stack tokens={{childrenGap:16}}>
                            <TextField
                                type='password'
                                placeholder="Mật khẩu cũ"
                                onChange={this.onChangePassword}
                                value={this.state.password}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <TextField
                                type='password'
                                placeholder="Mật khẩu mới"
                                onChange = {this.onChangeLastPassword}
                                value={this.state.lastPassword}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}
                            />
                            <TextField
                                type='password'
                                placeholder="Nhập lại mật khẩu mới"
                                onChange = {this.onChangeConfirmPassword}
                                value={this.state.confirmPassword}
                                onKeyDown={this.handleEnterPress}
                                disabled={isLoading}

                            />
                            <PrimaryButton text="Đổi mật khẩu" onClick={this.onLoginPress} disabled={isLoading} />
                            <Spinner
                                label="Đang đổi mật khẩu..."
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
                                </MessageBar>: null
                            }
                            <br/>
                            <Link
                                onClick={this.onOpenDialog('forgotPassword')}
                                style = {{fontSize:13}}
                                disabled={isLoading}
                            >
                                Quên mật khẩu ?
                            </Link>
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

export default Login;

