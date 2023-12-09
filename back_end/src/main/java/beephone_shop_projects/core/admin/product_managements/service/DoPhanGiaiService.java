package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import org.springframework.data.domain.Page;

public interface DoPhanGiaiService extends GenericService<DoPhanGiaiResponse, DoPhanGiaiRequest, String> {

    Page<DoPhanGiaiManHinh> findAllDoPhanGiai(Integer pageNo);

    DoPhanGiaiManHinh add(DoPhanGiaiRequest doPhanGiaiRequest);

    DoPhanGiaiManHinh updateDoPhanGiai(DoPhanGiaiRequest doPhanGiaiRequest, String id);

    DoPhanGiaiManHinh doiTrangThai(String id) throws Exception;

}
