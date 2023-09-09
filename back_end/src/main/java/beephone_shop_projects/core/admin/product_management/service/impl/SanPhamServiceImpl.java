package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.core.admin.product_management.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_management.repository.DongSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.repository.NhaSanXuatRepository;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.NhaSanXuat;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SanPhamServiceImpl {

    @Autowired
    private SanPhamRepository chiTietSanPhamRepository;

    @Autowired
    private NhaSanXuatRepository nhaSanXuatRepository;

    @Autowired
    private ChipRepository chipRepository;

    @Autowired
    private DongSanPhamRepository dongSanPhamRepository;

    public Page<SanPham> getAll(Pageable pageable) {
        return chiTietSanPhamRepository.findAllByDelected(true, pageable);
    }

    public Page<SanPhamResponce> getAllByDelected(Pageable pageable) {
        return chiTietSanPhamRepository.findAllChiTietSanPham( pageable);
    }

    public SanPham insert(CreateChiTietSanPhamRequest req) {

        Chip chip = chipRepository.findByTenChip(req.getChip());
        NhaSanXuat nhaSanXuat = nhaSanXuatRepository.findByTenNhaSanXuat(req.getNhaSanXuat());
        DongSanPham dongSanPham = dongSanPhamRepository.findByTenDongSanPham(req.getDongSanPham());

        SanPham sanPham = new SanPham();
        sanPham.setTenSanPham(req.getTenSanPham());
        sanPham.setIdDongSanPham(dongSanPham);
        sanPham.setIdNhaSanXuat(nhaSanXuat);
        sanPham.setIdChip(chip);
        sanPham.setDelected(false);

        return chiTietSanPhamRepository.save(sanPham);
    }

    public void update(SanPham sanPham, String id) {
        chiTietSanPhamRepository.save(sanPham);
    }


    public void delete(String id) {
        SanPham sanPham = chiTietSanPhamRepository.findById(id).get();
        if(sanPham.getDelected() == true)
           chiTietSanPhamRepository.updateDelected(false, id);
        else
            chiTietSanPhamRepository.updateDelected(true, id);
    }

    public Page<SanPhamResponce> searchByAllPosition(SearchChiTietSanPhamRequest chiTietSanPhamRequest, Pageable pageable){
        return this.chiTietSanPhamRepository.searchByAllPosition(pageable,
                chiTietSanPhamRequest.getRam()==null ?"%%":"%"+chiTietSanPhamRequest.getRam()+"%",
                chiTietSanPhamRequest.getRom()==null ?"%%":   "%"+chiTietSanPhamRequest.getRom() +"%",
                chiTietSanPhamRequest.getNhaSanXuat()==null ?"%%":  "%"+chiTietSanPhamRequest.getNhaSanXuat()+"%",
                chiTietSanPhamRequest.getMauSac()==null ?"%%":   "%"+chiTietSanPhamRequest.getMauSac()+"%",
                chiTietSanPhamRequest.getPin()==null ?"%%":   "%"+chiTietSanPhamRequest.getPin()+"%",
                chiTietSanPhamRequest.getDongSanPham()==null ?"%%":   "%"+chiTietSanPhamRequest.getDongSanPham()+"%",
                chiTietSanPhamRequest.getDonGiaMin() == null ?"0": ""+chiTietSanPhamRequest.getDonGiaMin(),
                chiTietSanPhamRequest.getDonGiaMax() == null ?"1000000000000": ""+chiTietSanPhamRequest.getDonGiaMax(),
                chiTietSanPhamRequest.getChip() == null ?"%%": "%"+chiTietSanPhamRequest.getChip()+"%",
                chiTietSanPhamRequest.getManHinh() == null ?"%%": "%"+chiTietSanPhamRequest.getManHinh()+"%"
                );
    }


    public Double getPriceMax(){
        return this.chiTietSanPhamRepository.getDonGiaLonNhat();
    }

    public SanPham getOne(String id) {
       return this.chiTietSanPhamRepository.findById(id).get();
    }


}
