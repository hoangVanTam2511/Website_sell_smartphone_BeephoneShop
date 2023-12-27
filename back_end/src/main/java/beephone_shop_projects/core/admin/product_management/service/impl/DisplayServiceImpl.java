package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateDisplay;
import beephone_shop_projects.core.admin.product_management.model.responce.DisplayResponce;
import beephone_shop_projects.core.admin.product_management.repository.DisplayRepository;
import beephone_shop_projects.entity.ManHinh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DisplayServiceImpl {

    @Autowired
    private DisplayRepository displayRepository;


    public Page<ManHinh> getAll(Pageable pageable) {
        return displayRepository.findAllByDelected(true,pageable);
    }

    public void insert(ManHinh manHinh) {
       displayRepository.save(manHinh);
    }

    public void insert(CreateDisplay req) {
        if(!req.getIdDisplay().isEmpty()) update(req);
        else {
            String newCode = this.displayRepository.getNewCode() == null ? "DISPLAY_0" : "DISPLAY_" + this.displayRepository.getNewCode();
//            ManHinh manHinh = new ManHinh(newCode, req.getSizeDisplay(), req.getResolutionDisplay());
//            displayRepository.save(manHinh);
        }
    }

    public void update(CreateDisplay req) {
//        ManHinh display = this.displayRepository.findById(req.getIdDisplay()).get();
//        display.setDoPhanGiaiManHinh(req.getResolutionDisplay());
//        display.setKichThuoc(req.getSizeDisplay());
//        displayRepository.save(display);
    }

    public void delete(String id) {
      displayRepository.updateDelected(false,id);
    }

    public ManHinh getOne(String id){
        return displayRepository.findById(id).get();
    }

    public ArrayList<ManHinh> getDanhSachManHinh(){
        return (ArrayList<ManHinh>)
                this.displayRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.displayRepository.getNewCode() == null ?"DISPLAY_0":"DISPLAY_"+ this.displayRepository.getNewCode() ;
    }

    public Page<DisplayResponce> searchDisplay(String name, Pageable pageable){
        return displayRepository.searchDisplayByDelected("%" + name + "%", pageable, 1);
    }
}
