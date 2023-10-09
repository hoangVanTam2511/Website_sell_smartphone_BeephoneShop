package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateCamera;
import beephone_shop_projects.core.admin.product_management.repository.CameraRepository;
import beephone_shop_projects.entity.Camera;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CameraServiceImpl {

    @Autowired
    private CameraRepository cameraRepository;

    public Page<Camera> getAll(Pageable pageable) {
        return cameraRepository.findAllByDelected(true, pageable);
    }

    public void insert(CreateCamera req) {
        if (cameraRepository.findByDoPhanGiai(req.getResolutionCamera()) == null) {
            String newCode = this.cameraRepository.getNewCode();
            Camera camera = new Camera(newCode, req.getResolutionCamera());
            cameraRepository.save(camera);
        }
    }

    public void update(Camera Camera, String id) {
        cameraRepository.save(Camera);
    }

    public void delete(String id) {
        cameraRepository.updateDelected(false, id);
    }

    public Camera getOne(String id) {
        return cameraRepository.findById(id).get();
    }

    public ArrayList<Camera> getListCamera() {
        return (ArrayList<Camera>) this.cameraRepository.findAllByDelected(true);
    }

    public String generateNewCode() {
        return this.cameraRepository.getNewCode() == null ? "CAMERA_0" : "CAMERA_" + this.cameraRepository.getNewCode();
    }
}
