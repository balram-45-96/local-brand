import React, { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { routes } from "./routes";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import { setLatAndLon, setSetting, setZone } from "./redux/AuthRedux/auth";
import "./App.css";
import { getZoneApi } from "./service/home";
import { settingApi } from "./service/auth";
import animationData from "./Animation.json";
import Lottie from "react-lottie";

function App() {
  const auth = useSelector((state) => state.auth);
  console.log("auth: ", auth);
  const dispatch = useDispatch();

  const getLatAndLon = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        dispatch(setLatAndLon({ myLat: latitude, myLon: longitude }));
        const { data } = await getZoneApi(latitude, longitude);
        if (data.success) {
          dispatch(setZone(data.data));
        }
      }
    } catch (error) {}
  };

  const setting = async () => {
    try {
      const { data } = await settingApi();
      if (data.success) {
        dispatch(setSetting(data.data));
      }
    } catch (error) {}
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getLatAndLon();
    setting();
  }, []);

  const getComponent = (component) => {
    return React.createElement(component, {});
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "1009962957539-omcfep2ilpos3igq7crknrf440o4v7ac.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="App">
      {/* <div
        style={{
          "position": "absolute",
          "z-index": "999",
          "width": "100%",
          "height": "100%",
          "justify-content": "center",
          "align-items": "center",
          "display": "flex",
        }}
      >
        <Lottie options={defaultOptions} height={400} width={400} />
      </div> */}
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (route.isPrivate === 0 && auth.token === "") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={getComponent(route.element)}
                  exact={route.exact}
                />
              );
            } else if (route.isPrivate === 1 && auth !== "") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={getComponent(route.element)}
                  exact={route.exact}
                />
              );
            } else if (route.isPrivate === 2) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={getComponent(route.element)}
                  exact={route.exact}
                />
              );
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
