import { useState, useEffect, memo, Fragment } from "react";

//react-bootstrap
import { Offcanvas, Row, Col } from "react-bootstrap";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Section Components
// Style Setting Section Components
import ThemeScheme from "./sections/theme-scheme";
// import ColorCustomizer from "./sections/color-customizer";
import MenuColor from "./sections/menu-color";
import MenuStyle from "./sections/menu-style";
import MenuActiveStyle from "./sections/menu-active-style";
import NavbarStyle from "./sections/navbar-style";
import CardStyle from "./sections/card-style";

const SettingOffCanvas = memo((props) => {
  const [show, setShow] = useState(false);

  // Define selectors
  const themeScheme = useSelector(SettingSelector.theme_scheme);
  const themeSchemeDirection = useSelector(
    SettingSelector.theme_scheme_direction
  );
  const themeColor = useSelector(SettingSelector.theme_color);

  const headerNavbar = useSelector(SettingSelector.header_navbar);
  const cardStyle = useSelector(SettingSelector.card_style);

  const sidebarColor = useSelector(SettingSelector.sidebar_color);
  const sidebarType = useSelector(SettingSelector.sidebar_type);

  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);

  useEffect(() => {
    const onClick = (e) => {
      if (show) {
        if (
          e.target.closest(".live-customizer") == null &&
          e.target.closest("#settingbutton") == null
        ) {
          setShow(false);
        }
      }
    };
    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  });
  return (
    <Fragment>
     
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement={`${themeSchemeDirection === "rtl" ? "start" : "end"}`}
        backdrop={false}
        scroll={true}
        className="live-customizer"
      >
        <Offcanvas.Header closeButton>
          <div className="d-flex align-items-center">
            <h3 className="offcanvas-title" id="live-customizer-label">
              Settings
            </h3>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col lg={12}>
              <div className="">
                {/*<div className="px-3 pt-3 text-center">
                  <h5 className="d-inline-block">Style Setting</h5>
      </div>*/}
                <div className="p-3">
                  <ThemeScheme
                    themeScheme={themeScheme}
                    themeSchemeDirection={themeSchemeDirection}
                    themeColor={themeColor}
                  ></ThemeScheme>

                  {props.name === true ? (
                    ""
                  ) : (
                    <Fragment>
                      <hr className="hr-horizontal" />
                      <MenuColor sidebarColor={sidebarColor}></MenuColor>

                      <hr className="hr-horizontal" />
                      <MenuStyle sidebarType={sidebarType}></MenuStyle>
                      <hr className="hr-horizontal" />
                      <MenuActiveStyle
                        sidebarMenuStyle={sidebarMenuStyle}
                      ></MenuActiveStyle>

                      <hr className="hr-horizontal" />
                      <NavbarStyle headerNavbar={headerNavbar}></NavbarStyle>
                      <CardStyle cardStyle={cardStyle}></CardStyle>
                    </Fragment>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
});

SettingOffCanvas.displayName = "SettingOffCanvas";
export default SettingOffCanvas;
