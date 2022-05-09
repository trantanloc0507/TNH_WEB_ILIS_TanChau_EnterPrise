import {convertXYToLatLon} from "./Converter";
let numberRegexp = /[()]/;

const parse = (wkt,isConvert) => {
    let geoType = getGeoType(wkt);

    wkt = wkt.split(numberRegexp)
    wkt = wkt.map(e => e.trim())
    wkt = wkt.slice(1);
    wkt = wkt.slice(0, -1);
    wkt = wkt.filter(e => e !== ',');

    let limit = wkt.length,
        index = -1,
        array = [],
        anchor = -1,
        store = [],
        pointer = [],
        isMulti = false;

    if (!!wkt[0] && !!wkt[limit-1])
        wkt = ["",...wkt,""]


    wkt = wkt.map((e, i) => {
        if (!i)
            return "("
        else if (i === limit - 1)
            return ")"
        else if (!e)
        {
            if (!!wkt[i + 1])
                return '('
            else if (!!wkt[i - 1])
                return ')'
        }
        return e;
    });

    while (index < wkt.length)
    {
        let element = wkt[index],
            next = index + 1;

        if (element === '(')
        {
            anchor = index;
            if (!index && wkt[next] === '(')
                isMulti = true;
        }

        else if (element === ')')
        {
            if (wkt[index - 1] !== ')')
            {
                for (let i = anchor; i < index; i++)
                {
                    if (wkt[i] !== ')' && wkt[i] !== '(')
                    {
                        pointer = [...pointer,splitJson(wkt[i],isConvert)]
                    }
                }
                if (isMulti)
                    store = [...store,pointer];
                else
                    array = [...array,pointer];
                pointer = [];
            }
            else if (isMulti)
            {
                array = [...array,store];
                store = [];
            }
        }
        index += 1;
    }

    if (isMulti)
        array = array[0]

    return {
        isMulti,
        geometry:array,
        geoType
    };
};

const splitJson = (wktElem,isConvert) =>
{

    wktElem = wktElem.split(", ")
    wktElem = wktElem.map(e=>{
        let elem = e.split(' ');
        return isConvert ?
            convertXYToLatLon({x:parseFloat(elem[1]),y:parseFloat(elem[0])})
            :
            {
            lat:parseFloat(elem[1]),
            lng:parseFloat(elem[0])
        }
    });
    return wktElem
}

const getGeoType = (stringGeo)=>
{
    if (stringGeo)
    {
        let to = stringGeo.indexOf(' ')
        return mapGeoType[stringGeo.substring(0,to)]
    }
    return ''
}

const mapGeoType = {
    "POINT":"POINT",
    "LINESTRING":"LINESTRING",
    "POLYGON":"POLYGON",
    "MULTIPOINT":"POINT",
    "MULTILINESTRING":"LINESTRING",
    "MULTIPOLYGON":"POLYGON"
}

const WKT = {
    parse,
    mapGeoType
}

export default WKT;
