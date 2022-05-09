import React,{} from 'react';
import COLOR from "../../Styles/Colors";
import {MenuItem} from "../Accessary";



const MenuSide = props =>
{
    return (
        <div className='col-2' style={styles.container}>
            <div className='row'>
                <div className='flex-column mt-2 w-100'>
                    <MenuItem
                        title='Ghi chú đã gửi'
                        iconName='Send'
                        checked
                    />
                    <MenuItem
                        title='Ghi chú chờ duyệt'
                        iconName='Stopwatch'
                    />
                    <MenuItem
                        title='Ghi chú đã duyệt'
                        iconName='InboxCheck'
                    />
                    <MenuItem
                        title='Ghi chú hoàn chuyển'
                        iconName='Undo'
                    />
                </div>
            </div>
        </div>
    )
};

export default MenuSide;


const styles = {
    container:{
        height:'100%',
        backgroundColor:COLOR.grayBackground
    },
    navStyles:{
        root: {
            overflowY: 'auto',
            height: '100%'
        }
    }
};