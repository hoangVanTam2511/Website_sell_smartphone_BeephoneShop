import React, { useEffect, Fragment, memo } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomToggle from "../../../dropdowns";
import { request, setAuthHeader } from "../../../../store/helpers/axios_helper";
import { useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link as LinkJoy } from "@mui/joy";
import Typography from "@mui/joy/Typography";

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
import { getUser } from "../../../../store/user/userSlice";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

const Header = memo((props) => {
  const navbarHide = useSelector(SettingSelector.navbar_show); // array
  const headerNavbar = useSelector(SettingSelector.header_navbar);
  const navigate = useNavigate();
  const user = getUser();

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

  const location = useLocation();
  const [navigationItems, setNavigationItems] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    const path = location.pathname;
    const breadcrumbList = getBreadcrumbList(path); // Hàm để lấy danh sách breadcrumb cho từng đường dẫn
    setNavigationItems(breadcrumbList);
  }, [location.pathname]);
  const getBreadcrumbList = (path) => {
    switch (path) {
      case "/dashboard/management-orders":
        return [
          { label: "Quản Lý Đơn Hàng", path: "/dashboard/management-orders" },
        ];
      case `/dashboard/order-detail/${id}`:
        return [
          { label: "Quản Lý Đơn Hàng", path: "/dashboard/management-orders" },
          { label: "Chi Tiết Đơn Hàng", path: `/dashboard/order-detail/${id}` },
          {
            label: "Bán Hàng Tại Quầy",
            path: `/dashboard/point-of-sales`,
          },
        ];
      case `/dashboard/point-of-sales/${id}`:
        return [
          {
            label: "Bán Hàng Tại Quầy",
            path: `/dashboard/point-of-sales/${id}`,
          },
        ];
      case "/dashboard/statistic":
        return [{ label: "Thống Kê", path: "/dashboard/statistic" }];
      case "/dashboard/transaction":
        return [{ label: "Quản Lý Thu Chi", path: "/dashboard/transaction" }];
      case "/dashboard/refund-order":
        return [{ label: "Trả Hàng", path: "/dashboard/refund-order" }];
      case "/dashboard/products":
        return [{ label: "Quản Lý Sản Phẩm", path: "/dashboard/products" }];
      case `/dashboard/products/${id}`:
        return [
          { label: "Quản Lý Sản Phẩm", path: "/dashboard/products" },
          { label: "Chi Tiết Sản Phẩm", path: `/dashboard/products/${id}` },
        ];
      case "/dashboard/create-product":
        return [
          { label: "Quản Lý Sản Phẩm", path: "/dashboard/products" },
          { label: "Thêm Sản Phẩm", path: "/dashboard/create-product" },
        ];
      case `/dashboard/update-product/${id}`:
        return [
          { label: "Quản Lý Sản Phẩm", path: "/dashboard/products" },
          {
            label: "Cập Nhật Sản Phẩm",
            path: `/dashboard/update-product/${id}`,
          },
        ];
      case "/dashboard/discounts":
        return [{ label: "Giảm Giá Sản Phẩm", path: "/dashboard/discounts" }];
      case "/dashboard/create-discount":
        return [
          { label: "Giảm Giá Sản Phẩm", path: "/dashboard/discounts" },
          { label: "Thêm Đợt Giảm Giá ", path: "/dashboard/create-discount" },
        ];
      case `/dashboard/update-discount/${id}`:
        return [
          { label: "Đợt Giảm Giá", path: "/dashboard/discounts" },
          {
            label: "Cập Nhật Đợt Giảm Giá",
            path: `/dashboard/update-discount/${id}`,
          },
        ];
      case "/dashboard/vouchers":
        return [{ label: "Phiếu Giảm Giá", path: "/dashboard/vouchers" }];
      case "/dashboard/create-voucher":
        return [
          { label: "Phiếu Giảm Giá", path: "/dashboard/vouchers" },
          { label: "Thêm Phiếu Giảm Giá", path: "/dashboard/create-voucher" },
        ];
      case `/dashboard/update-voucher/${id}`:
        return [
          { label: "Phiếu Giảm Giá", path: "/dashboard/vouchers" },
          {
            label: "Cập Nhật Phiếu Giảm Giá",
            path: `/dashboard/update-voucher/${id}`,
          },
        ];
      case "/dashboard/employees":
        return [{ label: "Nhân Viên", path: "/dashboard/employees" }];
      case "/dashboard/create-employee":
        return [
          { label: "Nhân Viên", path: "/dashboard/employees" },
          { label: "Thêm Nhân Viên", path: "/dashboard/create-employee" },
        ];
      case `/dashboard/update-employee/${id}`:
        return [
          { label: "Nhân Viên", path: "/dashboard/employees" },
          {
            label: "Cập Nhật Nhân Viên",
            path: `/dashboard/update-employee/${id}`,
          },
        ];
      case "/dashboard/customers":
        return [{ label: "Khách Hàng", path: "/dashboard/customers" }];
      case "/dashboard/create-customer":
        return [
          { label: "Khách Hàng", path: "/dashboard/customers" },
          { label: "Thêm Khách Hàng", path: "/dashboard/create-customer" },
        ];
      case `/dashboard/update-customer/${id}`:
        return [
          { label: "Khách Hàng", path: "/dashboard/customers" },
          {
            label: "Cập Nhật Khách Hàng",
            path: `/dashboard/update-customer/${id}`,
          },
        ];
      case `/dashboard/colors`:
        return [{ label: "Quản Lý Màu Sắc", path: "/dashboard/colors" }];
      case `/dashboard/chips`:
        return [{ label: "Quản Lý Chip", path: "/dashboard/chips" }];
      case `/dashboard/imeis`:
        return [{ label: "Quản Lý IMEI", path: "/dashboard/imeis" }];
      case `/dashboard/rams`:
        return [{ label: "Quản Lý RAM", path: "/dashboard/rams" }];
      case `/dashboard/roms`:
        return [{ label: "Quản Lý ROM", path: "/dashboard/roms" }];
      case `/dashboard/sacs`:
        return [{ label: "Quản Lý Cổng Sạc", path: "/dashboard/sacs" }];
      case `/dashboard/hangs`:
        return [{ label: "Quản Lý Hãng", path: "/dashboard/hangs" }];
      case `/dashboard/pins`:
        return [{ label: "Quản Lý PIN", path: "/dashboard/pins" }];
      case `/dashboard/danh-mucs`:
        return [{ label: "Quản Lý Danh Mục", path: "/dashboard/danh-mucs" }];
      case `/dashboard/sims`:
        return [{ label: "Quản Lý SIM", path: "/dashboard/sims" }];
      case `/dashboard/the-nhos`:
        return [{ label: "Quản Lý Thẻ Nhớ", path: "/dashboard/the-nhos" }];
      case `/dashboard/screens`:
        return [{ label: "Quản Lý Màn Hình", path: "/dashboard/screens" }];
      case `/dashboard/front-cameras`:
        return [
          { label: "Quản Lý Camera Trước", path: "/dashboard/front-cameras" },
        ];
      case `/dashboard/rear-cameras`:
        return [
          { label: "Quản Lý Camera Sau", path: "/dashboard/rear-cameras" },
        ];
      default:
        return [];
    }
  };

  return (
    <Fragment>
      <Navbar
        expand="lg"
        variant="light"
        className={`nav iq-navbar ${headerNavbar} ${navbarHide.join(" ")}`}
      >
        <Container fluid className="navbar-inner">
          <div>
            <Breadcrumbs separator="›" aria-label="breadcrumbs">
              {navigationItems.map((item) =>
                location.pathname === item.path ? (
                  <Typography
                    color="neutral"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "500",
                    }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Link key={item.path} color="primary" to={item.path}>
                    <span
                      className="underline-custom"
                      style={{ fontWeight: "500" }}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              )}
            </Breadcrumbs>
          </div>
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

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav
              as="ul"
              className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center"
            >
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as={CustomToggle}
                  href="#"
                  variant=" nav-link"
                  id="notification-drop"
                  data-bs-toggle="dropdown"
                >
                  <svg
                    color="#8A92A6"
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
                        <h5 className="mb-0 text-white">Thông Báo</h5>
                      </div>
                    </div>

                    <div className="p-0 card-body">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <img
                            className="p-1 avatar-40 rounded-pill bg-soft-primary"
                            src={shapes4}
                            alt=""
                          />
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">Thông báo từ ai đó pro</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">No body for me</p>
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
                  variant=" nav-link py-0 d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      user === undefined || user.ma === ""
                        ? ""
                        : user.anhDaiDien
                    }
                    alt="User-Profile"
                    className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <div className="caption ms-3 d-none d-md-block ">
                    <h6 className="mb-0 caption-title">
                      {user === undefined || user.ma === "" ? "" : user.hoVaTen}
                    </h6>
                    <p className="mb-0 caption-sub-title">
                      {user === undefined || user.ma === ""
                        ? ""
                        : user.tenChucVu}
                    </p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-privacy-setting">
                    Cài đặt
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/login");
                      setAuthHeader(null);
                    }}
                  >
                    Đăng xuất
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
