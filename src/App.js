import React from 'react';
import { Switch, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'office-ui-fabric-core/dist/css/fabric.min.css';
import {Provider} from 'react-redux';
import {store} from './Redux/Store';
import Main from "./Components/Main/Main";
import DanhMucQuanLy from "./Components/QuanLyGhiChu/DanhMucQuanLy";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();


function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <RouteMain/>
        </div>
      </Provider>
  );
}

function RouteMain() {
    return(
        <Switch>
            <Route exact path="/">
                <Main/>
            </Route>
            <Route path='/QuanLyGhiChu'>
                <DanhMucQuanLy/>
            </Route>
        </Switch>
    )
}

export default App;
