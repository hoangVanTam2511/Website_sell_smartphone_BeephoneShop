import React from 'react'
import Index from '../views/index'
import { ToastContainer } from "react-toastify";
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
import ThemSanPham from"../views/admin/product-manager/chi-tiet-san-pham/them-san-pham";

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

import OrdersPending from "../views/admin/order-manager/ordes-pending"

import PointOfSales from "../views/admin/order-manager/point-of-sales"


export const DefaultRouter = [
  {
    path: "/",
    element: <Default />,
    children: [
        {
            path: "",
            element: <Index />,
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
            element:  <ChiTietSanPham />,
        },
        {
            path: "them-san-pham",
            element: <ThemSanPham />,
        },
        {
            path: "khach-hang",
            element: <KhachHang />,
        },
        {
            path: "khach-hang",
            element: <KhachHang />,
        },
        {
            path: "mau-sac",
            element: <MauSac />,
        },

      {
        path: "them-khach-hang",
        element: <AddKH />,
      },
      {
        path: "/update-khach-hang/:id",
        element: <UpdateKH />,
      },
      {
        path: "/update-nhan-vien/:id",
        element: <UpdateNV />,
      },
      {
        path: "diachi-khach-hang",
        element: <AddressForm />,
      },
      ,
      {
        path: "nhap-excel-khach-hang",
        element: <NhapTuFileKH />,
      },
      {
        path: "nhan-vien",
        element: <NhanVien />,
      },
      {
        path: "them-nhan-vien",
        element: <AddNv />,
      },
      {
        path: "imei/:idChiTietSanPham",
        element: <Imei />,
      },
      {
        path: "nhap-excel-nhan-vien",
        element: <NhapTuFileNV />,
      },
      {
        path: "chuc-vu",
        element: <Role />,
      },
      {
        path: "them-chuc-vu",
        element: <AddRole />,
      },
      {
        path: "dashboard/voucher",
        element: <HienThiVoucher />,
      },
      {
        path: "dashboard/add-voucher",
        element: <AddVoucher />,
      },
      {
        path: "dashboard/update-voucher/:id",
        element: <UpdateVoucher />,
      },
      {
        path: "khuyen-mai",
        element: <HienThiKhuyenMai />,
      },
      {
        path: "them-khuyen-mai",
        element: <AddKhuyenMai />,
      },
      // {
      //   path: "san-pham-chi-tiet-1/:id",
      //   element: <AddKhuyenMai />,
      // },
      {
        path: "sua-khuyen-mai/:id",
        element: <SuaKhuyenMai />,
      },
      {
        path: 'dashboard/management-orders',
        element: <ManagementOrders />,
      },
      {
        path: 'dashboard/orders-pending',
        element: <OrdersPending />,
      },
      {
        path: 'dashboard/point-of-sales',
        element: <PointOfSales />,
      },
      {
        path: 'dashboard/order-detail/:id',
        element: <OrderDetail />,
      },
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
