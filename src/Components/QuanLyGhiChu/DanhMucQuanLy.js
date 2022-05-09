import React,{} from 'react';
import HeaderBarGhiChu from "./HeaderBar";
import MenuSide from './MenuSide'
import {VerticalDivider} from "../Accessary";

class QuanLyGhiChu extends React.Component
{
    onBackPress = ()=>
    {
        window.location.href='/'
    };
    render()
    {
        return (
            <section>
                <HeaderBarGhiChu
                    onBackPress = {this.onBackPress}
                />
                <div className='d-flex flex-row' style={{height:'calc(100vh - 93px)'}}>
                    <MenuSide/>
                    <VerticalDivider/>
                </div>
            </section>
        )
    }
}

export default QuanLyGhiChu;
