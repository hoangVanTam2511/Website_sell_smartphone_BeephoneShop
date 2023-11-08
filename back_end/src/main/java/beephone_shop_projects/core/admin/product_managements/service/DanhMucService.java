package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.DanhMuc;
import org.springframework.data.domain.Page;

public interface DanhMucService extends GenericService<DanhMucResponse, DanhMucRequest, String> {

    Page<DanhMuc> findAllDanhMuc();

    DanhMuc updateDanhMuc(DanhMucRequest danhMucRequest, String id) throws Exception;

    DanhMuc doiTrangThai(String id) throws Exception;

}
