import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//Interceptor for fetch API
window.fetch = (originalFetch => {
    return (...request) => {
        let [path, options] = request; //se pude modificar REQUEST
        const url = `https://jsonplaceholder.typicode.com/${path}`
        request = [url, options]
        return originalFetch.apply(null, request).then(response => {
            //se puede modificar RESPONSE
            return response;
        });
    };
})(window.fetch);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
