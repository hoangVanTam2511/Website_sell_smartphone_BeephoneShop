import React from "react";
import Index from "../views/index";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
// san pham

// chip
import Chip from "../views/admin/product-manager/chip/chip";

// dong-san-pham
import DongSanPham from "../views/admin/product-manager/dong-san-pham/dong-san-pham";

// man-hinh
import ManHinh from "../views/admin/product-manager/man-hinh/man-hinh";

// pin
import Pin from "../views/admin/product-manager/pin/pin";

// ram
import Ram from "../views/admin/product-manager/ram/ram";

// hang
import NhaSanXuat from "../views/admin/product-manager/hang/hang";

// rom
import Rom from "../views/admin/product-manager/rom/rom";

// rom
import Camera from "../views/admin/product-manager/camera/camera";

// mau_sac
import MauSac from "../views/admin/product-manager/mau-sac/mau-sac";

// chi-tiet-san-pham
import SanPham from "../views/admin/product-manager/chi-tiet-san-pham/san-pham";

// // imei
import Imei from "../views/admin/product-manager/imei/imei";

// khach hang
import KhachHang from "../views/admin/account-manager/khachhang/HienThiKH";
import AddKH from "../views/admin/account-manager/khachhang/AddKH";
import NhapTuFileKH from "../views/admin/account-manager/khachhang/NhapTuFile";

// nhan vien
import NhanVien from "../views/admin/account-manager/nhanvien/HienThiNV";
import AddNv from "../views/admin/account-manager/nhanvien/AddNV";
import NhapTuFileNV from "../views/admin/account-manager/nhanvien/NhapTuFile";

// role

import Role from "../views/admin/account-manager/role/HienThiRole";
import AddRole from "../views/admin/account-manager/role/AddRole";

//admin

// sanpham
import ChiTietSanPham from "../views/admin/product-manager/chi-tiet-san-pham/chi-tiet-san-pham";
import ThemSanPham from "../views/admin/product-manager/chi-tiet-san-pham/them-san-pham";

import Default from "../layouts/dashboard/default";
import ManagementOrders from "../views/admin/order-manager/management-orders";
import OrderDetail from "../views/admin/order-manager/order-detail";

//voucher

//voucher
import HienThiVoucher from "../views/admin/voucher-manager/quan-li-voucher";
import AddVoucher from "../views/admin/voucher-manager/them-voucher";

//khuyen mai
import HienThiKhuyenMai from "../views/admin/promotion-manager/quan-li-promotion";
import AddKhuyenMai from "../views/admin/promotion-manager/them-promotion";
import AddressForm from "../views/admin/account-manager/khachhang/DiaChi";

import UpdateKH from "../views/admin/account-manager/khachhang/UpdateKH";
import UpdateNV from "../views/admin/account-manager/nhanvien/UpdateNV";

import SuaKhuyenMai from "../views/admin/promotion-manager/sua-promotion";

//khuyenMai
import UpdateVoucher from "../views/admin/voucher-manager/sua-voucher";

import OrdersPending from "../views/admin/order-manager/ordes-pending";

import PointOfSales from "../views/admin/order-manager/point-of-sales";
import ManagementProducts from "../views/admin/order-manager/management-products";
import ManagementSims from "../views/admin/order-manager/management-sims";
import CreateSimCard from "../views/admin/order-manager/create-simcard";
import ManagementPins from "../views/admin/order-manager/management-pins";
import CreatePin from "../views/admin/order-manager/create-pin";
import ManagementScreens from "../views/admin/order-manager/management-screens";
import CreateScreen from "../views/admin/order-manager/create-screen";
import ManagementCongSacs from "../views/admin/order-manager/management-sacs";
import CreateSac from "../views/admin/order-manager/create-sac";
import CreateMauSac from "../views/admin/order-manager/create-mau-sac";
import ManagementHangs from "../views/admin/order-manager/management-hangs";
import CreateHang from "../views/admin/order-manager/create-hang";
import ManagementChips from "../views/admin/order-manager/management-chips";
import ManagementRams from "../views/admin/order-manager/management-rams";
import ManagementRoms from "../views/admin/order-manager/management-roms";
import ManagementColors from "../views/admin/order-manager/management-colors";
import CreateCameraSau from "../views/admin/order-manager/create-camera-sau";
import ManagementFrontCameras from "../views/admin/order-manager/management-front-cameras";
import CreateCameraTruoc from "../views/admin/order-manager/create-camera-truoc";
import ManagementRearCameras from "../views/admin/order-manager/management-rear-cameras";
import CreateProduct from "../views/admin/order-manager/create-product";
import ManagementTheNhos from "../views/admin/order-manager/management-the-nho";
import CreateTheNho from "../views/admin/order-manager/create-the-nho";
import UpdateMauSac from "../views/admin/order-manager/update-mau-sac";
import ManagementDanhMuc from "../views/admin/order-manager/management-danh-muc";
import CreateDanhMuc from "../views/admin/order-manager/create-danh-muc";
import ThongKe from "../views/admin/statics-manager/thong-ke";
// import ManagementImage from "../views/admin/order-manager/management-image";
import PaymentSuccess from "../views/admin/order-manager/vnpay-payment-success";
import ManagementImei from "../views/admin/order-manager/management-imei";
import ThongKeDoanhThu from "../views/admin/statics-manager/thong-ke-doanh-thu";
import Transaction from "../views/admin/transaction-manager/transaction";
import { Print } from "../views/admin/order-manager/printer-invoice";
import RefundOrder from "../views/admin/order-manager/refund-order";
import RefundDetail from "../views/admin/order-manager/refund-details";
import UpdateProduct from "../views/admin/order-manager/update-product";
import ManagementRanks from "../views/admin/rank-manager/management-rank";
import ManagementProductItems from "../views/admin/order-manager/management-product-items";

export const DefaultRouter = [
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        element: <Navigate to="/login" replace={true} />,
      },
      {
        path: "/dashboard/statistic",
        element: <ThongKeDoanhThu />,
      },
      {
        path: "chip",
        element: <Chip />,
      },
      {
        path: "dong-san-pham",
        element: <DongSanPham />,
      },
      {
        path: "nha-san-xuat",
        element: <NhaSanXuat />,
      },
      {
        path: "man-hinh",
        element: <ManHinh />,
      },
      {
        path: "pin",
        element: <Pin />,
      },
      {
        path: "ram",
        element: <Ram />,
      },
      {
        path: "rom",
        element: <Rom />,
      },
      {
        path: "camera",
        element: <Camera />,
      },
      {
        path: "san-pham",
        element: <SanPham />,
      },
      {
        path: "chi-tiet-san-pham/:idSanPham",
        element: <ChiTietSanPham />,
      },
      {
        path: "them-san-pham",
        element: <ThemSanPham />,
      },
      {
        path: "/dashboard/customers",
        element: <KhachHang />,
      },
      {
        path: "mau-sac",
        element: <MauSac />,
      },
      {
        path: "/dashboard/create-customer",
        element: <AddKH />,
      },
      {
        path: "/dashboard/update-customer/:id",
        element: <UpdateKH />,
      },
      {
        path: "dashboard/update-employee/:id",
        element: <UpdateNV />,
      },
      {
        path: "/dashboard/customer-address",
        element: <AddressForm />,
      },
      ,
      {
        path: "nhap-excel-khach-hang",
        element: <NhapTuFileKH />,
      },
      {
        path: "/dashboard/employees",
        element: <NhanVien />,
      },
      {
        path: "/dashboard/create-employee",
        element: <AddNv />,
      },
      {
        path: "/dashboard/imeis/:id",
        element: <Imei />,
      },
      {
        path: "nhap-excel-nhan-vien",
        element: <NhapTuFileNV />,
      },
      {
        path: "/dashboard/roles",
        element: <Role />,
      },
      {
        path: "/dashboard/create-role",
        element: <AddRole />,
      },
      {
        path: "dashboard/vouchers",
        element: <HienThiVoucher />,
      },
      {
        path: "dashboard/create-voucher",
        element: <AddVoucher />,
      },
      {
        path: "dashboard/update-voucher/:id",
        element: <UpdateVoucher />,
      },
      {
        path: "/dashboard/discounts",
        element: <HienThiKhuyenMai />,
      },
      {
        path: "/dashboard/create-discount",
        element: <AddKhuyenMai />,
      },
      // {
      //   path: "san-pham-chi-tiet-1/:id",
      //   element: <AddKhuyenMai />,
      // },
      {
        path: "/dashboard/update-discount/:id",
        element: <SuaKhuyenMai />,
      },
      {
        path: "dashboard/management-orders",
        element: <ManagementOrders />,
      },
      {
        path: "dashboard/orders-pending",
        element: <OrdersPending />,
      },
      {
        path: "dashboard/point-of-sales",
        element: <PointOfSales />,
      },
      {
        path: "dashboard/point-of-sales/:id",
        element: <PointOfSales />,
      },
      {
        path: "dashboard/order-detail/:id",
        element: <OrderDetail />,
      },
      {
        path: "dashboard/products",
        element: <ManagementProducts />,
      },
      {
        path: "dashboard/products/:id",
        element: <ManagementProductItems />,
      },
      {
        path: "dashboard/sims",
        element: <ManagementSims />,
      },
      {
        path: "dashboard/sim/create",
        element: <CreateSimCard />,
      },
      {
        path: "dashboard/pins",
        element: <ManagementPins />,
      },
      {
        path: "dashboard/pin/create",
        element: <CreatePin />,
      },
      {
        path: "dashboard/screens",
        element: <ManagementScreens />,
      },
      {
        path: "dashboard/screen/create",
        element: <CreateScreen />,
      },
      {
        path: "dashboard/sacs",
        element: <ManagementCongSacs />,
      },
      {
        path: "dashboard/sac/create",
        element: <CreateSac />,
      },
      {
        path: "dashboard/hangs",
        element: <ManagementHangs />,
      },
      {
        path: "dashboard/chips",
        element: <ManagementChips />,
      },
      {
        path: "dashboard/rams",
        element: <ManagementRams />,
      },
      {
        path: "dashboard/roms",
        element: <ManagementRoms />,
      },
      {
        path: "dashboard/colors",
        element: <ManagementColors />,
      },
      {
        path: "dashboard/danh-mucs",
        element: <ManagementDanhMuc />,
      },
      {
        path: "dashboard/danh-mucs/create",
        element: <CreateDanhMuc />,
      },
      {
        path: "dashboard/hang/create",
        element: <CreateHang />,
      },
      {
        path: "dashboard/color/create",
        element: <CreateMauSac />,
      },
      {
        path: "dashboard/color/update",
        element: <UpdateMauSac />,
      },
      {
        path: "dashboard/front-camera/create",
        element: <CreateCameraTruoc />,
      },
      {
        path: "dashboard/front-cameras",
        element: <ManagementFrontCameras />,
      },
      {
        path: "dashboard/rear-camera/create",
        element: <CreateCameraSau />,
      },
      {
        path: "dashboard/rear-cameras",
        element: <ManagementRearCameras />,
      },
      {
        path: "dashboard/the-nhos",
        element: <ManagementTheNhos />,
      },
      {
        path: "dashboard/imeis",
        element: <ManagementImei />,
      },
      // {
      //   path: "dashboard/image",
      //   element: <ManagementImage />,
      // },
      {
        path: "dashboard/the-nhos/create",
        element: <CreateTheNho />,
      },
      {
        path: "dashboard/create-product",
        element: <CreateProduct />,
      },
      {
        path: "dashboard/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "dashboard/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "dashboard/thong-ke",
        element: <ThongKe />,
      },
      {
        path: "dashboard/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "dashboard/statistic",
        element: <ThongKeDoanhThu />,
      },
      {
        path: "dashboard/login",
        element: <ThongKeDoanhThu />,
      },
      {
        path: "dashboard/transaction",
        element: <Transaction />,
      },
      {
        path: "dashboard/invoice",
        element: <Print />,
      },
      {
        path: "dashboard/refund-order",
        element: <RefundOrder />,
      },
      {
        path: "dashboard/refund-order/:id",
        element: <RefundDetail />,
      },
      // {
      //   path: "dashboard/rank",
      //   element: <ManagementRanks />,
      // },
      // {
      //   path: 'dashboard/add-product',
      //   element: <ManagementProducts />,
      // },
    ],
  },
];
// const DefaultRouter = () => {
//     return (
//         <TransitionGroup>
//             <CSSTransition classNames="fadein" timeout={300}>
//                 <Switch>
//                     <Route path="/dashboard" exact component={Index} />
//                     {/* user */}
//                     <Route path="/dashboard/app/user-profile"     exact component={UserProfile} />
//                     <Route path="/dashboard/app/user-add"         exact component={UserAdd}/>
//                     <Route path="/dashboard/app/user-list"        exact component={UserList}/>
//                     <Route path="/dashboard/app/user-privacy-setting" exact component={userProfileEdit}/>
//                      {/* widget */}
//                      <Route path="/dashboard/widget/widgetbasic"   exact component={Widgetbasic}/>
//                      <Route path="/dashboard/widget/widgetcard"    exact component={Widgetcard}/>
//                      <Route path="/dashboard/widget/widgetchart"   exact component={Widgetchart}/>
//                      {/* icon */}
//                      <Route path="/dashboard/icon/solid"           exact component={Solid}/>
//                      <Route path="/dashboard/icon/outline"         exact component={Outline}/>
//                      <Route path="/dashboard/icon/dual-tone"       exact component={DualTone}/>
//                      {/* From */}
//                      <Route path="/dashboard/form/form-element"    exact component={FormElement}/>
//                      <Route path="/dashboard/form/form-validation" exact component={FormValidation}/>
//                      <Route path="/dashboard/form/form-wizard"     exact component={FormWizard}/>
//                      {/* table */}
//                      <Route path="/dashboard/table/bootstrap-table" exact component={BootstrapTable}/>
//                      <Route path="/dashboard/table/table-data"      exact component={TableData}/>
//                      {/*special pages */}
//                      <Route path="/dashboard/special-pages/billing" exact component={Billing}/>
//                      <Route path="/dashboard/special-pages/kanban" exact component={Kanban}/>
//                      <Route path="/dashboard/special-pages/pricing" exact component={Pricing}/>
//                      <Route path="/dashboard/special-pages/timeline" exact component={Timeline}/>
//                      <Route path="/dashboard/special-pages/calender" exact component={Calender}/>
//                      {/* map */}
//                      <Route path="/dashboard/map/vector" exact component={Vector}/>
//                      <Route path="/dashboard/map/google" exact component={Google}/>
//                      {/* extra */}
//                      <Route path="/dashboard/extra/privacy-policy" exact component={PrivacyPolicy}/>
//                      <Route path="/dashboard/extra/terms-of-service" exact component={TermsofService}/>
//                      {/*admin*/}
//                      <Route path="/dashboard/admin/admin" exact component={Admin}/>
//                 </Switch>
//             </CSSTransition>
//         </TransitionGroup>
//     )
// }

// export default DefaultRouter
