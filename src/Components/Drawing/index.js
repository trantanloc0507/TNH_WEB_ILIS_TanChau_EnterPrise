import React from "react";
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager'
import {useSelector,useDispatch} from 'react-redux';
import Type from "../../Redux/Type";


const Drawing = props =>
{
    const {drawingMode} = useSelector(state=>state.drawingTool);
    const dispatch = useDispatch();

    const onPolygonComplete = (event) => {
        dispatch({type:Type.SET_EVT_DRAWING,evt:event});
        dispatch({type:Type.STOP_DRAWING})
    };

    // const onProcessPolygon = ()=>
    // {
    //     //'POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))
    // }

    return (
        <DrawingManager
            // defaultDrawingMode={'overlaycomplete'}
            defaultOptions={{
                drawingControl: false,
                polygonOptions: {
                    fillColor: `#ffff00`,
                    fillOpacity: .3,
                    strokeWeight: 2,
                    clickable: true,
                    editable: true,
                    zIndex: 999,
                    draggable:true,
                },
            }}
            drawingMode = {drawingMode}
            onPolygonComplete = {onPolygonComplete}
        />
    )
}

export default Drawing
