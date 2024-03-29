import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import "./modules/features/css"
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(<App/>, document.getElementById("root"));

serviceWorker.unregister();

