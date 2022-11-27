import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import { firestore, storage } from "./firebase/init_firebase";

export const FireCtx = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<FireCtx.Provider value={{ firestore, storage }}>
			<App />
		</FireCtx.Provider>
	</React.StrictMode>
);
