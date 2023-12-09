//router
// import IndexRouters from "./router/index"

//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/customizer.scss";

import "./App.css"

// Redux Selector / Action
import { useDispatch } from "react-redux";

// import state selectors
import { setSetting } from "./store/setting/actions";
// import { ToastContainer } from "react-toastify";

function App({ children }) {
  const dispatch = useDispatch();
  dispatch(setSetting());
  return (
    <div className="App">
      {/* <IndexRouters /> */}
      {children}{" "}
    </div>
  );
}

export default App;
