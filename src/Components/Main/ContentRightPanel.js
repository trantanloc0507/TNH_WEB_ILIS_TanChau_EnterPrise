import React from 'react';
import Search from "../Search/Search";
import Layer from "../QuyHoach/Layer";
import MapMode from "../Menu/MapMode";
import Menu from "../Menu/Menu";
import Server from "../Menu/Server";
import Location from "../Menu/Location";
import LocationEnter from "../Menu/LocationEnter";
import ZonePanel from "../QuyHoach/ZonePanel";
import Login from "../Profile/Login";
import LoginEnterPrise from "../Profile/LoginEnterPrise";
import Result from "../Search/Result";
import Info from "../HienTrang/Info";
import Account from "../Profile/Account";
import URL from "../../Containers/MainController";

const ContentRightPanel = ({ route }) => {
    const typeServer = localStorage.getItem(URL.serverSelected)
    switch (route) {
        case "menu":
            return (
                <Menu />
            );
        case "search":
            return (
                <Search />
            );
        case "layer":
            return (
                <Layer />
            );
        case "satellite":
            return (
                <MapMode />
            );
        case "server":
            return (
                <Server />
            );
        case "location":
            return (
                <Location />
            );
        case "locationEnter":
            return (
                <LocationEnter />
            );
        case "zone":
            return (
                <ZonePanel />
            );
        case "login": {
            if (typeServer === 'tnh') {
                return (
                    <Login route='login' />
                );
            } else {
                return (
                    <LoginEnterPrise route='login' />
                );
            }
        }
        case "result":
            return (
                <Result />
            );
        case "info":
            return (
                <Info />
            );
        case "account":
            return (
                <Account />
            );
        case "changePassword":
            return (
                <Login route='changePassword' />
            );
        case "changePasswordEnter":
            return (
                <LoginEnterPrise route='changePassword' />
            );
        default:
            return null
    }
}

export default ContentRightPanel
