import React, { useRef } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import Type from "../../Redux/Type";
import { getPolygonByDistance2, getPolygonByDistance2Enter } from "../../Containers/MapView";
import setup from "../../Containers/setup";
import URL from "../../Containers/MainController";
// import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
// const google = window.google

const MapView = withScriptjs(withGoogleMap(props => {
    const userInfo = useSelector(state => state.userInfo);
    const userInfoEnter = useSelector(state => state.UserInfoEnter);
    const refMap = useRef();
    const dispatch = useDispatch();
    const typeServer = localStorage.getItem(URL.serverSelected)
    const onTilesLoaded = () => {
        if (!!refMap) {
            dispatch({ type: Type.REF_MAP_VIEW, value: refMap.current });
            let centerPoint = {
                lat: refMap.current.getCenter().lat(),
                lng: refMap.current.getCenter().lng(),
            },
                topRightPoint = {
                    latitude: refMap.current.getBounds().getNorthEast().lat(),
                    longitude: refMap.current.getBounds().getNorthEast().lng()
                },
                bottomLeftPoint = {
                    latitude: refMap.current.getBounds().getSouthWest().lat(),
                    longitude: refMap.current.getBounds().getSouthWest().lng()
                },
                zoom = refMap.current.getZoom();


            if (typeServer === 'tnh' && userInfo) {
                getPolygonByDistance2({ topRightPoint, bottomLeftPoint, centerPoint, zoom });
            }
            if (typeServer !== 'tnh' && userInfoEnter) {
                getPolygonByDistance2Enter({ topRightPoint, bottomLeftPoint, centerPoint, zoom });
            }
        }
    };


    return (
        <GoogleMap
            ref={refMap}
            defaultZoom={setup.defaultZoom}
            defaultCenter={props.defaultCenter}
            options={{
                styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: props.zoomControl,
            }}
            onTilesLoaded={onTilesLoaded}
            defaultMapTypeId={'satellite'}
            mapTypeId={props.mapTypeId}
            onClick={props.onClick}
        >
            {props.children}
            {/*<MarkerWithLabel*/}
            {/*    position={{ lat: 11.553561, lng: 106.161650 }}*/}
            {/*    labelAnchor={new google.maps.Point(0, 0)}*/}
            {/*    // labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}*/}
            {/*    icon={pinSymbol}*/}
            {/*>*/}
            {/*    <div style={{ backgroundColor: `#FF5722`, padding: '0px 3px'}}>*/}
            {/*        <p style={{ fontSize: 11, color: `#fff` }}>Trần Văn Trà</p>*/}
            {/*    </div>*/}
            {/*</MarkerWithLabel>*/}
        </GoogleMap>
    )
}
));


export default MapView;

// const pinSymbol = {
//     path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
//     fillColor: 'transparent',
//     strokeColor: 'transparent',
// };

// const styles = {
//     labelStyle:{
//         color: "#fff",
//         textShadow:"2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
//         fontSize:20
//     }
// }
