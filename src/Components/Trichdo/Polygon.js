import React from 'react';
import COLOR from "../../Styles/Colors";
import {useSelector} from "react-redux";

const Polygon = ()=> {
    const dataTrichDo = useSelector(state=>state.hienTrang.dataTrichDoPicked);

    return (
        dataTrichDo ?
            <div style={styles.polygonContainer}>
                <svg width="308" height={dataTrichDo.svgHeight}>
                    <polyline
                        points={dataTrichDo.polyline}
                        style={styles.line}
                    />
                    {
                        dataTrichDo.circle.map((e, i) => (
                            <circle key={i} cx={e.x} cy={e.y} r="3" fill="orange"/>
                        ))
                    }
                    {
                        dataTrichDo.dataText.map((e, i) => (
                            <text
                                key={i}
                                x={e.x}
                                y={e.y}
                                fill="white"
                                transform={e.rotate}
                                fontSize={9}
                            >
                                {e.distance}
                            </text>
                        ))
                    }
                </svg>
            </div>
            :
            null
    );
}


export default Polygon;

const styles = {
    polygonContainer: {
        position: 'relative',
        marginTop: 5,
        width: 308,
        // backgroundColor:COLOR.blue
    },
    line: {
        fill: 'none',
        stroke: COLOR.white,
        strokeWidth: 2
    },
    widthLine: {
        position: 'absolute',
        fontSize: 9,
        bottom: 0
    }
}


