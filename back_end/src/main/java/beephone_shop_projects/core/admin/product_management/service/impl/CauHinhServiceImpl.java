package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateCauHinhRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.CauHinhResponce;
import beephone_shop_projects.core.admin.product_management.repository.CauHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.ColorRepository;
import beephone_shop_projects.core.admin.product_management.repository.PinRepository;
import beephone_shop_projects.core.admin.product_management.repository.RamRepository;
import beephone_shop_projects.core.admin.product_management.repository.RomRepository;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CauHinhServiceImpl  {

    @Autowired
    private RamRepository ramRepository;


    @Autowired
    private RomRepository romRepository;

    @Autowired
    private ManHinhRepository manHinhRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private CauHinhRepository cauHinhRepository;

    public void addCauHinh(CreateCauHinhRequest createCauHinhRequest){
        Ram ram = ramRepository.findByKichThuoc(createCauHinhRequest.getRam());
        Rom rom = romRepository.findByKichThuoc(createCauHinhRequest.getRom());
        MauSac mauSac = colorRepository.findByTenMauSac(createCauHinhRequest.getMauSac());

        CauHinh cauHinh = new CauHinh();
        cauHinh.setMauSac(mauSac);
        cauHinh.setRom(rom);
        cauHinh.setRam(ram);

        cauHinhRepository.save(cauHinh);
    }

    public Page<CauHinhResponce> getAllCauHinhResponce(Pageable pageable){
        return  cauHinhRepository.getAllCauHinh(pageable,true);
    }

    public void delete(String id){
        CauHinh cauHinh  = cauHinhRepository.findById(id).get();
        cauHinh.setDelected(false);
        cauHinhRepository.save(cauHinh);
    }


}
