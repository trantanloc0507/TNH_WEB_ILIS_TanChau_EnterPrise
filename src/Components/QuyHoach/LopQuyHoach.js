import React from 'react';
import {Polygon,Polyline,Marker} from "react-google-maps";
import {useDispatch, useSelector} from "react-redux";
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {onShowQuyHoachInfoPanel,mapGeoType} from "../../Containers/QuyHoach";
import Type from "../../Redux/Type";


const LopQuyHoach = ()=>
{
    const {showQuyHoach,polygons,polyline,points,labelActive,selected} = useSelector(state=>state.quyHoach);
    const dispatch = useDispatch();
    const onPolygonPress = (e)=>()=>
    {

        dispatch({type:Type.SELECTED_QUYHOACH,value:e})
        onShowQuyHoachInfoPanel();
    }

    return (
        <div>
            {showQuyHoach ?
                polygons.map((e)=>(
                    <Polygon
                        key={e.ID}
                        paths={e['polygon']}
                        defaultPath={[]}
                        options={{
                            strokeColor:e.strokeColor,
                            fillColor:(e.strokeColor === "#fff" ? 'transparent' : e.strokeColor),
                            strokeWeight: e.weightLine,
                            zIndex:500
                        }}
                        visible={labelActive.includes(e['label'])}
                        onClick={onPolygonPress(e)}
                    />
                ))
                :
                null
            }
            {showQuyHoach ?
                polyline.map((e)=>(
                    <Polyline
                        key={e.ID}
                        path={e['polygon']}
                        options={{
                            strokeColor:e.strokeColor,
                            strokeWeight: e.weightLine,
                            zIndex:500
                        }}
                        visible={labelActive.includes(e['label'])}
                        onClick={onPolygonPress(e)}
                    />
                ))
                : null
            }
            {showQuyHoach ?
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {points.map((e,i) => (
                        <Marker
                            key ={e.id}
                            position={e['polygon']}
                            icon={e.icon}
                            visible={labelActive.includes(e.label) && e.id !== selected.id}
                            onClick={onPolygonPress(e)}
                        />
                    ))}
                </MarkerClusterer>
                : null
            }
            {selected.geoType === mapGeoType.POLYGON ?
                <Polygon
                    paths={selected['polygon']}
                    defaultPath={[]}
                    options={{
                        strokeColor:'#76FF03',
                        fillColor:'#76FF03',
                        strokeWeight: 3,
                        zIndex:1000
                    }}
                />
                :
                selected.geoType === mapGeoType.LINESTRING ?
                    <Polyline
                        path={selected['polygon']}
                        options={{
                            strokeColor:'#76FF03',
                            strokeWeight: 3,
                            zIndex:1000
                        }}
                        zIndex = {2000}
                    />
                    :
                    selected.geoType === mapGeoType.POINT ?
                        <Marker
                            position={selected['polygon']}
                            zIndex = {2000}
                        />
                        :null
            }
        </div>
    )
}

export default LopQuyHoach
