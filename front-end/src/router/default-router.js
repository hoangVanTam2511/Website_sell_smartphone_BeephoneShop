import React from 'react'
import Index from '../views/index'
// san pham
import QuanLiMauSac from '../views/admin/product-manager/quan-li-mau-sac/quan-li-mau-sac';
import ThemMauSac from '../views/admin/product-manager/quan-li-mau-sac/them-mau-sac'
import SuaMauSac from '../views/admin/product-manager/quan-li-mau-sac/sua-mau-sac'

// khach hang
import KhachHang from '../views/admin/account-manager/khachhang/HienThiKH'
import AddKH from '../views/admin/account-manager/khachhang/AddKH'
import NhapTuFileKH from '../views/admin/account-manager/khachhang/NhapTuFile'


// nhan vien
import NhanVien from '../views/admin/account-manager/nhanvien/HienThiNV'
import AddNv from '../views/admin/account-manager/nhanvien/AddNV'
import NhapTuFileNV from '../views/admin/account-manager/nhanvien/NhapTuFile'

// role

import Role from '../views/admin/account-manager/role/hoho'
import AddRole from '../views/admin/account-manager/role/hoho'

//admin

import Default from '../layouts/dashboard/default';
import ManagementOrders from '../views/admin/order-manager/management-orders';
import OrderDetail from '../views/admin/order-manager/order-detail';


export const DefaultRouter = [
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: 'dashboard/management-orders',
        element: <ManagementOrders />,
      },
      {
        path: 'dashboard/order-detail/:id',
        element: <OrderDetail />,
      },
      {
        path: '',
        element: <Index />
      },
      {
        path: 'mau-sac',
        element: <QuanLiMauSac />
      },
      {
        path: 'them-mau-sac',
        element: <ThemMauSac />
      },
      {
        path: 'sua-mau-sac/:id',
        element: <SuaMauSac />
      },
      {
        path: 'khach-hang',
        element: <KhachHang />
      },
      ,
      {
        path: 'them-khach-hang',
        element: <AddKH />
      }
      ,
      ,
      {
        path: 'nhap-excel-khach-hang',
        element: <NhapTuFileKH />
      },
      {
        path: 'nhan-vien',
        element: <NhanVien />
      },
      {
        path: 'them-nhan-vien',
        element: <AddNv />
      }
      ,
      {
        path: 'nhap-excel-nhan-vien',
        element: <NhapTuFileNV />
      },
      {
        path: 'chuc-vu',
        element: <Role />
      },
      {
        path: 'them-chuc-vu',
        element: <AddRole />
      }


    ]
  }
]
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
