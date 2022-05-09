import setup from "../../Containers/setup";
import Type from "../Type";


const initSearchState = {
    listDistrict: [],
    districtSelected: { key: setup.huyenId },
    districtSelectedLocation: { key: setup.huyenId },
    districtSelectedLocationXa: 1,
    listWard: [],
    wardSelected: '',
    showErrorWard: false,
    modeSearch: 'byName',
    searchText: "",
    listResult: [],

    listDistrictEnter: [],
    districtSelectedEnter: { key: setup.huyenId },
    listWardEnter: [],
    wardSelectedEnter: '',
}

const Search = (state = initSearchState, { type, route, value }) => {
    if (type === Type.SET_SEARCH) {
        return {
            ...state,
            [route]: value
        }
    }
    return state;
};

export default Search
