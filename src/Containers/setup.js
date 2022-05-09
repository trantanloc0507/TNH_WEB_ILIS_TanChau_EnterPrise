import { tanchau_tnh_option, tnh_option, tnh_xa_option } from "./location";
const TNH_SETUP = {
    title: "VNPT ILIS - Cổng thông tin địa chính tỉnh Tây Ninh",
    // googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlcAU-VVbfnvJMQ_CZDmIBFIQ1jGYDVvk&libraries=geometry,drawing,places',
   googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9vaQPpsE8RxB7iG5W7oZYZtExGQTJmKk&libraries=geometry,drawing,places',
    huyenSelected: {
        key: 706,
        parentid: 'FB266B4FC02944AC910387C1CC3658D4',
        active: true,
        text: 'Huyện Tân Châu',
        searchID: 1706,
    },
    startCoordinate: {
        lat: 11.553561, //11.579231238856163
        lng: 106.161650 //106.24179728215094
    },
    defaultZoom: 18,
    allDistrict: { key: '706', text: 'Toàn huyện', searchID: '0', active: true },
    huyenId: 706,
    iddvhc: '5D69DF6710A54EB89D1384CB3F18A6F0',
    tinhId: 72,
    distanceLoad: '200',
    ktt: 105.5,
    dXS: 0.00101036464, //11.554526734645687 - 11.553516370000068
    dYS: -0.00178137015, //106.15849326484644 - 106.16027463500006
    location: tanchau_tnh_option,
    locationHuyen: tnh_option,
    locationXa: tnh_xa_option,
    apiLink: 'http://ilis.tayninh.gov.vn/apiv3/api/',
    //apiLink:'http://apiilis.vienthongtayninh.vn/api/',
    //apiDebug:'http://10.73.60.210:8080/api/'
    apiDebug: 'http://ilis.tayninh.gov.vn/apiv3/api/',
};

// const LCI_SETUP = {
//     title: "VNPT ILIS - Cổng thông tin địa chính tỉnh Lào Cai",
//     googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlcAU-VVbfnvJMQ_CZDmIBFIQ1jGYDVvk&libraries=geometry,drawing,places',
//     huyenSelected: {key: 89,
//         active: true,
//         text: 'Huyện Văn Bàn',
//         searchID: 1089
//     },
//     startCoordinate: {lat: 22.20332541700003, lng: 104.20637588900007},
//     defaultZoom: 18,
//     allDistrict: {key: '89', text: 'Toàn huyện', searchID: '0', active: true},
//     huyenId: 89,
//     tinhId: 10,
//     distanceLoad: '200',
//     ktt:104.75,
//     dXS:0.00098628996, //11.554526734645687 - 11.553516370000068
//     dYS: -0.00193800018, //106.15849326484644 - 106.16027463500006,
//     location:lci_option,
//     apiLink:'https://ilis.vienthonglaocai.vn/ilis/api/',
//     apiDebug:'http://10.73.60.210/apilci/api/'
// };

export default TNH_SETUP;
