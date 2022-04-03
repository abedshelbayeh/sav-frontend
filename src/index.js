import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store, persistor } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router basename={"/app"}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
