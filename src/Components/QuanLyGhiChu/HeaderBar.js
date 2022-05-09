import React,{} from 'react';
import COLOR from "../../Styles/Colors";
import {TooltipHost,HighContrastSelector, SearchBox, Stack} from '@fluentui/react';
import {AppButton, BaseButton, CommandButton,HorizontalDivider} from "../Accessary";

const HeaderBarGhiChu = props =>
{
    return (
        <div className="">
            <div className='d-flex flex-row align-items-center' style = {styles.headerBar}>
                <div className='col-2 row align-items-center'>
                    <AppButton
                        iconName={'ChevronLeftMed'}
                        tooltip={'Quay lại'}
                        onClick={props.onBackPress}
                    />
                    <div>
                        <TooltipHost
                            content={'Hệ thống quản lý đất đai Tây Ninh'}
                            styles={{root:{display: 'inline-block'}}}
                        >
                            <div style={styles.title}>Quản lý ghi chú</div>
                        </TooltipHost>
                    </div>
                </div>
                <div className='col-3 ml-3'>
                    <TooltipHost
                        content={'Tìm kiếm ghi chú theo số tờ thửa'}
                        styles={{root:{display: 'inline-block',width:'100%'}}}
                    >
                        <SearchBox
                            placeholder="Tìm kiếm"
                            onSearch={newValue => console.log('value is ' + newValue)}
                            styles = {styles.searchBox}
                        />
                    </TooltipHost>
                </div>
                <div className='col d-flex flex-row justify-content-end'>
                    <AppButton
                        iconName={'Contact'}
                        tooltip={'Tài khoản'}
                    />
                </div>
            </div>
            <Stack styles={styles.menuBar} horizontal={true}>
                <div className='col-2 pl-4'>
                    <BaseButton
                        tooltip='Chuyển cho cấp trên phê duyệt'
                        title='Ghi chú'
                        iconName='Send'
                    />
                </div>
                <div className='col-3'>

                </div>
                <div className='col'>
                    <CommandButton
                        tooltip='Chuyển cho cấp trên phê duyệt'
                        title='Chuyển'
                        iconName='Send'
                    />
                    <CommandButton
                        tooltip='Trả lại cho nhân viên '
                        title='Hoàn chuyển'
                        iconName='Undo'
                    />
                    <CommandButton
                        tooltip='Xóa ghi chú'
                        title='Xóa'
                        iconName='Delete'
                    />
                </div>
            </Stack>
            <HorizontalDivider/>
        </div>
    )
};

export default HeaderBarGhiChu;


const styles = {
    headerBar:{
        backgroundColor:COLOR.blue
    },
    title:{
        fontSize:14,
        color:COLOR.white,
        paddingLeft:20,
        fontWeight: 700,
        cursor: 'pointer'
    },
    button:{
        splitButtonMenuButton: { backgroundColor: 'white', width: 28, border: 'none' },
        splitButtonMenuIcon: { fontSize: '7px' },
        splitButtonDivider: { backgroundColor: '#c8c8c8', width: 1, right: 26, position: 'absolute', top: 4, bottom: 4 },
        splitButtonContainer: {
            selectors: {
                [HighContrastSelector]: { border: 'none' },
            },
        }
    },
    searchBox:{
        root:{
            backgroundColor:COLOR.white,
            borderColor:COLOR.blue
        },
        icon:{
            color:COLOR.blue
        }
    },
    menuBar:{
        root:{
            backgroundColor:COLOR.grayBackground,
            paddingTop:6,
            paddingBottom:6
        }
    },
    divider:{
        height:1,
        backgroundColor:COLOR.border,
        width:'100%'
    },
    addButton:{
        menuIcon:{

        },
        label:{
            fontSize:12
        }
    },
    processButton:{
        root:{
            height:32,
            backgroundColor:COLOR.transparent,
            marginRight:3
        },
        label:{
            fontSize:12,
            color:COLOR.blue
        },
        icon: {
            fontSize:16
        }
    }

};