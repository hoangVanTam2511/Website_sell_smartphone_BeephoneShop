import React, { useEffect, Fragment, memo } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomToggle from "../../../dropdowns";

//img
// import flag1 from '../../../../assets/images/Flag/flag001.png'
// import flag2 from '../../../../assets/images/Flag/flag-02.png'
// import flag3 from '../../../../assets/images/Flag/flag-03.png'
// import flag4 from '../../../../assets/images/Flag/flag-04.png'
// import flag5 from '../../../../assets/images/Flag/flag-05.png'
// import flag6 from '../../../../assets/images/Flag/flag-06.png'
import shapes1 from "../../../../assets/images/shapes/01.png";
import shapes2 from "../../../../assets/images/shapes/02.png";
import shapes3 from "../../../../assets/images/shapes/03.png";
import shapes4 from "../../../../assets/images/shapes/04.png";
import shapes5 from "../../../../assets/images/shapes/05.png";
import avatars1 from "../../../../assets/images/avatars/01.png";
import avatars2 from "../../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../../assets/images/avatars/avtar_5.png";
// logo
import Logo from "../../components/logo";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

const Header = memo((props) => {
  const navbarHide = useSelector(SettingSelector.navbar_show); // array
  const headerNavbar = useSelector(SettingSelector.header_navbar);
  useEffect(() => {
    // navbarstylemode
    if (headerNavbar === "navs-sticky" || headerNavbar === "nav-glass") {
      window.onscroll = () => {
        if (document.documentElement.scrollTop > 50) {
          document.getElementsByTagName("nav")[0].classList.add("menu-sticky");
        } else {
          document
            .getElementsByTagName("nav")[0]
            .classList.remove("menu-sticky");
        }
      };
    }
  });
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };
  return (
    <Fragment>
      <Navbar
        expand="lg"
        variant="light"
        className={`nav iq-navbar ${headerNavbar} ${navbarHide.join(" ")}`}
      >
        <Container fluid className="navbar-inner">
          <Link to="" className="navbar-brand">
            <Logo color={true} />
          </Link>
          <div
            className="sidebar-toggle"
            data-toggle="sidebar"
            data-active="true"
            onClick={minisidebar}
          >
            <i className="icon">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                />
              </svg>
            </i>
          </div>

          <Navbar.Toggle aria-controls="navbarSupportedContent">
            <span className="navbar-toggler-icon">
              <span className="mt-2 navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav
              as="ul"
              className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center"
            >
              <Nav.Link className="ml-4" href="/" target="_blank">
                <svg
                  className="icon-22"
                  width="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Nav.Link>

              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  href="#"
                  variant=" nav-link"
                  id="notification-drop"
                  data-bs-toggle="dropdown"
                >
                  <svg
                    width="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="bg-danger dots"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="p-0 sub-drop dropdown-menu-end"
                  aria-labelledby="notification-drop"
                >
                  <div className="m-0 shadow-none card">
                    <div className="py-3 card-header d-flex justify-content-between bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">All Notifications</h5>
                      </div>
                    </div>
                    <div className="p-0 card-body">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <img
                            className="p-1 avatar-40 rounded-pill bg-soft-primary"
                            src={shapes1}
                            alt=""
                          />
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Emma Watson Bni</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">95 MB</p>
                              <small className="float-right font-size-12">
                                Just Now
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes2}
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">New customer is join</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                5 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <img
                            className="p-1 avatar-40 rounded-pill bg-soft-primary"
                            src={shapes3}
                            alt=""
                          />
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Two customer is left</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                2 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <img
                            className="p-1 avatar-40 rounded-pill bg-soft-primary"
                            src={shapes4}
                            alt=""
                          />
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">New Mail from Fenny</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                3 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  href="#"
                  variant="nav-link"
                  id="mail-drop"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    width="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="bg-primary count-mail"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="p-0 sub-drop dropdown-menu-end"
                  aria-labelledby="mail-drop"
                >
                  <div className="m-0 shadow-none card">
                    <div className="py-3 card-header d-flex justify-content-between bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">All Message</h5>
                      </div>
                    </div>
                    <div className="p-0 card-body ">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes1}
                              alt=""
                            />
                          </div>
                          <div className=" w-100 ms-3">
                            <h6 className="mb-0 ">Bni Emma Watson</h6>
                            <small className="float-left font-size-12">
                              13 Jun
                            </small>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes2}
                              alt=""
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                            <small className="float-left font-size-12">
                              20 Apr
                            </small>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes3}
                              alt=""
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">Why do we use it?</h6>
                            <small className="float-left font-size-12">
                              30 Jun
                            </small>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes4}
                              alt=""
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">Variations Passages</h6>
                            <small className="float-left font-size-12">
                              12 Sep
                            </small>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="p-1 avatar-40 rounded-pill bg-soft-primary"
                              src={shapes5}
                              alt=""
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                            <small className="float-left font-size-12">
                              5 Dec
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  variant=" nav-link py-0 d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={avatars1}
                    alt="User-Profile"
                    className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars2}
                    alt="User-Profile"
                    className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars3}
                    alt="User-Profile"
                    className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars5}
                    alt="User-Profile"
                    className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars6}
                    alt="User-Profile"
                    className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars4}
                    alt="User-Profile"
                    className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <div className="caption ms-3 d-none d-md-block ">
                    <h6 className="mb-0 caption-title">Hoàng Văn Tám</h6>
                    <p className="mb-0 caption-sub-title">Tester</p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-privacy-setting">
                    Privacy Setting
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/auth/sign-in">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
});

export default Header;
