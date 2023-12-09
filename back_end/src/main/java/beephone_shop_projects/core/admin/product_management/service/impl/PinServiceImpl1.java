package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreatePin;
import beephone_shop_projects.core.admin.product_management.model.responce.ChipResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.PinResponce;
import beephone_shop_projects.core.admin.product_management.repository.PinRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PinServiceImpl1 {

    @Autowired
    private PinRepository pinRepository;


    public Page<Pin> getAll(Pageable pageable) {
        return pinRepository.findAllByDelected(true,pageable);
    }

    public void insert(Pin pin) {
        pinRepository.save(pin);
    }

    public void insert(CreatePin req) {
        if(!req.getIdPin().isEmpty()) update(req);
        else {
            String newCode = this.pinRepository.getNewCode() == null ? "PIN_0" : "PIN_" + this.pinRepository.getNewCode();
//            Pin pin = new Pin(newCode, req.getCapacityPin());
//            pinRepository.save(pin);
        }
    }

    public void update(CreatePin req) {
        Pin pin = this.pinRepository.findById(req.getIdPin()).get();
        pin.setDungLuong(req.getCapacityPin());
        pinRepository.save(pin);
    }

    public void delete(String id) {
        pinRepository.updateDelected(false,id);
    }

    public Pin getOne(String id){
        return pinRepository.findById(id).get();
    }

    public ArrayList<Pin> getDanhSachPin(){
        return (ArrayList<Pin>) this.pinRepository.findAllByDelected(true);
    }

    public String generateNewCode(){
        return this.pinRepository.getNewCode() == null ?"PIN_0":"PIN_"+ this.pinRepository.getNewCode() ;
    }

    public Page<PinResponce> searchPin(String name, Pageable pageable){
        return pinRepository.searchPinByDelected("%" + name + "%", pageable, 1);
    }
}
