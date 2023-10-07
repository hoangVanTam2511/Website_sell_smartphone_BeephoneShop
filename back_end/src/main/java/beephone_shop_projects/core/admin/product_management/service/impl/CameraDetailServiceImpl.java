package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateCameraDetail;
import beephone_shop_projects.core.admin.product_management.repository.CameraDetailRepository;
import beephone_shop_projects.core.admin.product_management.repository.CameraRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.ChiTietCamera;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.infrastructure.constant.CameraContant;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CameraDetailServiceImpl  {

    @Autowired
    private CameraDetailRepository cameraDetailRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private CameraRepository cameraRepository;
    
    public Page<ChiTietCamera> getAll(Pageable pageable) {
        return null;
    }

    public void insert(CreateCameraDetail req) {

        SanPham product = sanPhamRepository.findById(req.getIdProduct()).get();

        req.getIdCameras().forEach((item) -> {
            Camera camera = cameraRepository.findById(item).get();
            ChiTietCamera chiTietCamera = new ChiTietCamera(camera, product, req.getTypeCamera() );
            cameraDetailRepository.save(chiTietCamera);
        });

    }

    public void update(ChiTietCamera chiTietCamera, String id) {

    }

    public void delete(String id) {

    }

}
