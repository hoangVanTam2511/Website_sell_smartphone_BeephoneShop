import { useEffect, memo, Fragment, useContext } from "react";
import { useLocation, Outlet } from "react-router-dom";

//react-shepherd
import { ShepherdTourContext } from "react-shepherd";

//react-bootstrap
import { Button } from "react-bootstrap";

// header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//subheader
import SubHeader from "../../components/partials/dashboard/HeaderStyle/sub-header";

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";

//default
// import {DefaultRouter} from '../../router/default-router'

//seetingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

import Loader from "../../components/Loader";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import { Timeline } from "@mailtop/horizontal-timeline";

const Tour = () => {
  const tour = useContext(ShepherdTourContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/dashboard" &&
      sessionStorage.getItem("tour") !== "true"
    ) {
      tour?.start();
    }
  });
  return <Fragment></Fragment>;
};

const Default = memo((props) => {
  // let location = useLocation();
  // const pageLayout = useSelector(SettingSelector.page_layout);
  const appName = useSelector(SettingSelector.app_name);
  useEffect(() => { });

  // const closeTour = () => {
  //   sessionStorage.setItem("tour", "true");
  // };

  // shepherd
  // const newSteps = [
  //   {
  //     title: "<h4>Menu</h4>",
  //     text: '<p className="mb-0">Check the content under Menu Style. Click to view all oavailable Menu Style options for you.</p>',
  //     attachTo: { element: ".sidebar ", on: "right" },
  //     buttons: [
  //       {
  //         type: "next",
  //         text: "Next",
  //       },
  //     ],
  //     when: {
  //       show: () => {
  //         document
  //           .querySelector(".shepherd-modal-overlay-container")
  //           .classList.add("shepherd-modal-is-visible");
  //       },
  //       cancel: () => closeTour(),
  //     },
  //   },
  //   {
  //     title: "<h4>Profile Setting</h4>",
  //     text: '<p className="mb-0">Configure your Profile using Profile Settings. Edit, save and update your profile from here.</p>',
  //     attachTo: { element: ".iq-tour ", on: "bottom" },
  //     buttons: [
  //       {
  //         type: "back",
  //         classes: "shepherd-button-secondary",
  //         text: "Back",
  //       },
  //       {
  //         type: "next",
  //         text: "Next",
  //       },
  //     ],
  //     when: {
  //       cancel: () => closeTour(),
  //     },
  //   },
  //   {
  //     title: "<h4>Live Customizer</h4>",
  //     text: '<p className="mb-0">Transform the entire look, color, style and appearance of using Live Customizer settings. Change and copy the settings from here.</p>',
  //     attachTo: { element: ".btn-setting", on: "left" },
  //     buttons: [
  //       {
  //         type: "back",
  //         classes: "shepherd-button-secondary",
  //         text: "Back",
  //       },
  //       {
  //         action() {
  //           sessionStorage.setItem("tour", "true");
  //           return this.next();
  //         },
  //         text: "Done",
  //       },
  //     ],
  //     when: {
  //       cancel: () => closeTour(),
  //     },
  //   },
  // ];
  // const tourOptions = {
  //   defaultStepOptions: {
  //     cancelIcon: {
  //       enabled: true,
  //     },
  //   },
  //   when: {
  //     cancel: function () {},
  //   },
  // };
  // var subHeader = "";
  // var commanclass = "";
  // switch (location.pathname) {
  //   case '/dashboard':
  //   case "/dashboard/special-pages/calender":
  //   case "/dashboard/special-pages/billing":
  //   case "/dashboard/special-pages/kanban":
  //   case "/dashboard/special-pages/pricing":
  //   case "/dashboard/special-pages/timeline":
  //   case "/dashboard/table/table-data":
  //   case "/dashboard/table/bootstrap-table":
  //   case "/dashboard/table/border-table":
  //   case "/dashboard/table/fancy-table":
  //   case "/dashboard/table/fixed-table":
  //   case "/dashboard/icon/solid":
  //   case "/dashboard/icon/outline":
  //   case "/dashboard/icon/dual-tone":
  //     subHeader = <SubHeader />;
  //     commanclass = "iq-banner default";
  //     break;
  //   default:
  //     break;
  // }

  return (
    <Fragment>
      <Sidebar app_name={appName} />
      <main className="main-content">
        <div className="position-relative">
          <Header />
          <SubHeader />
        </div>
        <div className="py-0 conatiner-fluid content-inner mt-n5">
          <div style={{ display: "none" }}>
            <Timeline></Timeline>
          </div>
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
});

Default.displayName = "Default";
export default Default;
