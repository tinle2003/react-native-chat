/**
 * @format
 */
import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Reducers from "@redux/reducers";
import Thunk from "redux-thunk";
import Navigators from "@navigators";
import { FirebaseConfig } from "@screens/";
const store = createStore(Reducers, applyMiddleware(Thunk));

const App = React.memo((props) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        {/* <Routes /> */}
        <Navigators />

        <FirebaseConfig />
      </Provider>
    </React.Fragment>
  );
});
AppRegistry.registerComponent(appName, () => App);
