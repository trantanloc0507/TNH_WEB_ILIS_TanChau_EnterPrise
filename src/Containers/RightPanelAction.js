import {store} from "../Redux/Store";
import Type from "../Redux/Type";

export const onOpenRightPanel = (route)=>
{
    let {routeContent} = store.getState().rightPanel;
    if (routeContent !== route)
    {
        store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'isShow',value:true});
        store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'className',value:'modal-custom-on'});
        store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeContent',value:route});
    }
}

export const onCloseRightPanel = () =>
{
    let {routeFrom,routeContent} = store.getState().rightPanel;
    store.dispatch({type:Type.CLEAR_MAKER})
    if (routeFrom) {
        switch (routeFrom) {
            case "result": {
                store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeContent',value:'result'});
                store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeFrom',value:'search'});
                break;
            }
            case "search": {
                store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeContent',value:'search'});
                store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeFrom',value:''});
                break;
            }
            default:
                break;
        }
    } else {
        if (routeContent === 'zone')
        {
            store.dispatch({type:Type.SET_STATE_QUY_HOACH,route:'listLabel',value:[]});
            store.dispatch({type:Type.SET_STATE_QUY_HOACH,route:'labelActive',value:[]});
            store.dispatch({type:Type.SET_STATE_QUY_HOACH,route:'geoList',value:[]});
        }

        store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'className',value:'modal-custom-off'});
        store.dispatch({type:Type.SET_MAIN_MESSAGE,message:''})
        setTimeout(() => {
            store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeFrom',value:''});
            store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'isShow',value:false});
            store.dispatch({type:Type.SET_STATE_HIEN_TRANG,route:'dataThuaDatPicked',value:{}});
            store.dispatch({type:Type.SET_STATE_RIGHT_PANEL,route:'routeContent',value:''});
        }, 100)
    }
}
