import setup from './setup'
const conPi = Math.PI;

export function convertLatLonToXY(coordinate) {
    // let coordinate = {
    //     latitude: 11.550329,
    //     longitude: 106.172816,
    // };
    coordinate.latitude = coordinate.latitude + setup.dXS;
    coordinate.longitude = coordinate.longitude + setup.dYS;
    coordinate.latitude = conPi * coordinate.latitude / 180;
    coordinate.longitude = conPi * coordinate.longitude / 180;

    let KTT = setup.ktt * conPi / 180,
        f = 1 / 298.257223563,
        a = 6378137.0,
        b = (1 - f) * a,
        K = 0.9999,
        m_a = a * K,
        m_b = b * K,
        m_e2 = ((m_a * m_a) - (m_b * m_b)) / (m_a * m_a),
        m_N = (m_a - m_b) / (m_a + m_b),
        m_pow2N = m_N * m_N,
        m_pow3N = m_N * m_pow2N,
        sinphi = Math.sin(coordinate.latitude),
        cosphi = Math.cos(coordinate.latitude),
        tanphi = Math.tan(coordinate.latitude),
        pow2sinphi = sinphi * sinphi,
        pow2cosphi = cosphi * cosphi,
        pow3cosphi = pow2cosphi * cosphi,
        pow5cosphi = pow3cosphi * pow2cosphi,
        pow2tanphi = tanphi * tanphi,
        pow4tanphi = pow2tanphi * pow2tanphi,
        v = m_a / Math.sqrt(1.0 - m_e2 * (pow2sinphi)),
        rho = (v * (1.0 - m_e2)) / (1.0 - m_e2 * pow2sinphi),
        n2 = (v / rho) - 1.0,
        phi1 = 0,
        phi = coordinate.latitude,
        M = m_b * (((1.0 + m_N + ((m_pow2N) * 5.0 / 4.0) + ((m_pow3N) * 5.0 / 4.0)) * (phi - phi1)) - ((3.0 * m_N + 3.0 * (m_pow2N) + (m_pow3N) * 21.0 / 8.0) * Math.sin(phi - phi1) * Math.cos(phi + phi1)) + ((((m_pow2N) * 15.0 / 8.0) + ((m_pow3N) * 15.0 / 8.0)) * (Math.sin(2.0 * (phi - phi1))) * (Math.cos(2.0 * (phi + phi1)))) - (((m_pow3N) * 35.0 / 24.0) * (Math.sin(3.0 * (phi - phi1))) * (Math.cos(3.0 * (phi + phi1))))),
        P = (coordinate.longitude - KTT),

        //toi uu hoa
        pow2P = P * P,
        pow3P = pow2P * P,
        pow4P = pow2P * pow2P,
        pow5P = pow4P * P,
        pow6P = pow2P * pow4P,

        //Tinh chuyen gia tri X
        DolechX = 0,
        II = (v / 2.0) * sinphi * cosphi,
        III = (v / 24.0) * sinphi * (pow3cosphi) * (5.0 - (pow2tanphi) + 9.0 * n2),
        IIIA = (v / 720.0) * sinphi * (pow5cosphi) * (61.0 - 58.0 * (pow2tanphi) + (pow4tanphi)),
        X = DolechX + M + ((pow2P) * II) + ((pow4P) * III) + ((pow6P) * IIIA),

        // Tinh chuyen gia tri Y
        DolechY = 500000,
        IV = v * cosphi,
        v1 = (v / 6.0) * (pow3cosphi) * ((v / rho) - (pow2tanphi)),
        VI = (v1 / 120.0) * (pow5cosphi) * (5.0 - 18.0 * (pow2tanphi) + (pow4tanphi) + 14.0 * n2 - 58.0 * (pow2tanphi) * n2),
        Y = DolechY + (P * IV) + ((pow3P) * v1) + ((pow5P) * VI);
    return {x: X, y: Y};
}

export function convertXYToLatLon(pointXY) {
    let m_dSemiMajorAxis = 6378137.0,
        fff = 1 / 298.257223563,
        m_dSemiMinorAxis = (1 - fff) * m_dSemiMajorAxis,
        m_dLatitudeOrigin = 0,
        m_dLongitudeOrigin = setup.ktt,
        m_dFalseNorthing = 0,
        m_dFalseEasting = 500000,
        m_dScaleFactorAtOrigin = 0.9999,
        m_a = m_dSemiMajorAxis * m_dScaleFactorAtOrigin,
        m_b = m_dSemiMinorAxis * m_dScaleFactorAtOrigin,
        m_e2 = ((m_a * m_a) - (m_b * m_b)) / (m_a * m_a),
        m_N = (m_a - m_b) / (m_a + m_b),
        m_pow2N = m_N * m_N,
        m_pow3N = m_N * m_pow2N,
        northing = pointXY.x,
        easting = pointXY.y,
        PI = Math.PI,
        phiDash = ((northing - m_dFalseNorthing) / m_a) + (m_dLatitudeOrigin * PI / 180),
        phi = phiDash,
        phi1 = (m_dLatitudeOrigin * PI / 180),
        M = m_b * (((1 + m_N + (m_pow2N * 5 / 4) + (m_pow3N * 5 / 4)) * (phi - phi1)) - (
            (3 * m_N + 3 * m_pow2N + m_pow3N * 21 / 8) * Math.sin(phi - phi1) * Math.cos(phi + phi1)) + (
            ((m_pow2N * 15 / 8) + (m_pow3N * 15 / 8)) * (Math.sin(2 * (phi - phi1))) * (
                Math.cos(2 * (phi + phi1)))) - (
            (m_pow3N * 35 / 24) * (Math.sin(3 * (phi - phi1))) * (Math.cos(3 * (phi + phi1)))));

    while ((northing - m_dFalseNorthing - M) > 0.001) {
        phi = phi + ((northing - m_dFalseNorthing - M) / m_a);
        M = m_b * (((1 + m_N + (m_pow2N * 5 / 4) + (m_pow3N * 5 / 4)) * (phi - phi1)) - (
            (3 * m_N + 3 * m_pow2N + m_pow3N * 21 / 8) * Math.sin(phi - phi1) * Math.cos(phi + phi1)) + (
            ((m_pow2N * 15 / 8) + (m_pow3N * 15 / 8)) * (Math.sin(2 * (phi - phi1))) * (
                Math.cos(2 * (phi + phi1)))) - (
            (m_pow3N * 35 / 24) * (Math.sin(3 * (phi - phi1))) * (Math.cos(3 * (phi + phi1)))));
    }
    let v = m_a / Math.sqrt(1 - m_e2 * (Math.pow((Math.sin(phi)), 2))),
        rho = (v * (1 - m_e2)) / (1 - m_e2 * (Math.pow(Math.sin(phi), 2))),
        n2 = (v / rho) - 1,
        VII = (Math.tan(phi)) / (2 * rho * v),
        VIII = ((Math.tan(phi)) / (24 * rho * (Math.pow(v, 3)))) * (
            5 + (3 * (Math.pow(Math.tan(phi), 2))) + n2 - (9 * n2 * (Math.pow(Math.tan(phi), 2)))),
        IX = (Math.tan(phi) / (720 * rho * (Math.pow(v, 5)))) * (
            61 + (90 * (Math.pow(Math.tan(phi), 2))) + (45 * (Math.pow(Math.tan(phi), 4)))),
        Et = easting - m_dFalseEasting,
        latitude = (phi - ((Math.pow(Et, 2)) * VII) + ((Math.pow(Et, 4)) * VIII) - ((Math.pow(Et, 6)) * IX)) * 180 / PI,
        X = ((1 / Math.cos(phi)) / v),
        XI = ((1 / Math.cos(phi)) / (6 * (Math.pow(v, 3)))) * ((v / rho) + 2 * (Math.pow(Math.tan(phi), 2))),
        XII = ((1 / Math.cos(phi)) / (120 * (Math.pow(v, 5)))) * (
            5 + (28 * (Math.pow(Math.tan(phi), 2))) + (24 * (Math.pow(Math.tan(phi), 4)))),
        XIIA = ((1 / Math.cos(phi)) / (5040 * (Math.pow(v, 7)))) * (
            61 + (662 * (Math.pow(Math.tan(phi), 2))) + (1320 * (Math.pow(Math.tan(phi), 4))) + (
            720 * (Math.pow(Math.tan(phi), 6)))),
        longitude = m_dLongitudeOrigin + ((Et * X) - ((Math.pow(Et, 3)) * XI) + ((Math.pow(Et, 5)) * XII) - (
            (Math.pow(Et, 7)) * XIIA)) * 180 / PI;

    latitude = latitude - setup.dXS;
    longitude = longitude - setup.dYS
    return {'lat': latitude, 'lng': longitude};
}

export function getDistance(p1, p2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((p1.latitude - p2.latitude) * p) / 2 + c(p2.latitude * p) * c((p1.latitude) * p) * (1 - c(((p1.longitude - p2.longitude) * p))) / 2;
    // 2 * R; R = 6371 km
    return (12742 * Math.asin(Math.sqrt(a)) * 1000).toFixed(1); //meter
}

export function checkInside(point, polygon) {

    let x = point.lat, y = point.lng;

    let inside = false;
    let i, j;
    for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].lat, yi = polygon[i].lng;
        let xj = polygon[j].lat, yj = polygon[j].lng;

        let intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

export function convertXYPolygon(data) {
    let widthLayout = 290,
        xArray = data.map(e => e.lng),
        yArray = data.map(e => e.lat),
        xMin = Math.min(...xArray),
        xMax = Math.max(...xArray),
        yMin = Math.min(...yArray),
        yMax = Math.max(...yArray),
        dx = xMax - xMin,
        dy = yMax - yMin,
        len = data.length,
        dataPoint,
        dataText = [],
        svgHeight = (widthLayout / (dx / dy)) + 20,
        distance = [];

    data = data.map((e, i) => {
        if (i !== len - 1) {
            let pointStart = {
                    latitude: e.lat,
                    longitude: e.lng
                },
                pointEnd = {
                    latitude: data[i + 1].lat,
                    longitude: data[i + 1].lng
                };
            distance = [...distance,getDistance(pointStart,pointEnd)]
        }
        return {
            x: ((e.lng - xMin) * widthLayout / dx) + 10,
            y: ((yMax - e.lat) * widthLayout / dx) + 10,
        }
    });

    dataPoint = data;

    dataPoint.map((e, i) => {
        if (i !== len - 1) {
            let item = {
                from: e,
                to: dataPoint[i + 1]
            };
            dataText = [...dataText, item]
        }
        return e
    });

    let flagDown = true;

    dataText = dataText.map((e,i) => {
        let from = e.from,
            to = e.to;
        if (to.x < from.x) {
            from = e.to;
            to = e.from;
        }
        let angle = Math.atan((to.y - from.y) / (to.x - from.x)),
            middlePoint = getMiddlePoint(from, to);
        angle = angle * 180 / Math.PI;
        let item = {
            x: middlePoint.x - 8,
            y: middlePoint.y + (flagDown ? -5 : 10),
            rotate: `rotate(${angle} ${middlePoint.x},${middlePoint.y})`,
            distance: distance[i]
        };

        flagDown = !flagDown;

        return item;
    });

    data = data.map(e => `${e.x},${e.y}`);
    data = data.join(' ');

    return {
        polyline: data,
        circle: dataPoint,
        svgHeight,
        dataText
    };
}

function getMiddlePoint(pointStart, pointEnd) {
    return {
        x: (pointStart.x < pointEnd.x ? pointStart.x : pointEnd.x) + (Math.abs(pointStart.x - pointEnd.x) / 2),
        y: (pointStart.y < pointEnd.y ? pointStart.y : pointEnd.y) + (Math.abs(pointStart.y - pointEnd.y) / 2),
    }
}

export function calcPolygonArea(vertices) {
    let total = 0;

    for (let i = 0, l = vertices.length; i < l; i++) {
        let addX = vertices[i].lat;
        let addY = vertices[i === vertices.length - 1 ? 0 : i + 1].y;
        let subX = vertices[i === vertices.length - 1 ? 0 : i + 1].x;
        let subY = vertices[i].lng;

        total += (addX * addY * 0.5);
        total -= (subX * subY * 0.5);
    }

    return Math.abs(total);
}


