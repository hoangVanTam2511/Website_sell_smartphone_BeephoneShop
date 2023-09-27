package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleCofigResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleColorResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleProductResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.SanPhamResponce;
import beephone_shop_projects.core.admin.product_management.repository.*;
import beephone_shop_projects.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamServiceImpl {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private NhaSanXuatRepository nhaSanXuatRepository;

    @Autowired
    private ChipRepository chipRepository;

    @Autowired
    private DongSanPhamRepository dongSanPhamRepository;

    @Autowired
    private ManHinhRepository manHinhRepository;

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private MauSacRepository mauSacRepository;

    @Autowired
    private CauHinhRepository cauHinhRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    public Page<SanPham> getAll(Pageable pageable) {
        return sanPhamRepository.findAllByDelected(true, pageable);
    }

    public Page<SanPhamResponce> getAllByDelected(Pageable pageable) {
        return sanPhamRepository.findAllChiTietSanPham(pageable);
    }

    public SanPham insert(CreateProductRequest req) {
        Chip chip = chipRepository.findByTenChip(req.getChip());
        NhaSanXuat nhaSanXuat = nhaSanXuatRepository.findByTenNhaSanXuat(req.getNhaSanXuat());
        DongSanPham dongSanPham = dongSanPhamRepository.findByTenDongSanPham(req.getDongSanPham());
        ManHinh manHinh = manHinhRepository.findByKichThuoc(req.getManHinh());
        Pin pin = pinRepository.findByDungLuong(req.getPin());

        SanPham sanPham = new SanPham();
        sanPham.setMa(sanPhamRepository.getNewCode());
        sanPham.setTenSanPham(req.getTenSanPham());
        sanPham.setIdDongSanPham(dongSanPham);
        sanPham.setIdNhaSanXuat(nhaSanXuat);
        sanPham.setIdChip(chip);
        sanPham.setIdPin(pin);
        sanPham.setIdManHinh(manHinh);
        sanPham.setMoTa(req.getMoTa());
        sanPham.setHeDieuHanh(req.getHeDieuHanh());
        sanPham.setSim(req.getSim());
        sanPham.setCongSac(req.getCongSac());
        sanPham.setDelected(false);

        return sanPhamRepository.save(sanPham);
    }

    public void update(SanPham sanPham, String id) {
        sanPhamRepository.save(sanPham);
    }


    public void delete(String id) {
        SanPham sanPham = sanPhamRepository.findById(id).get();
        if (sanPham.getDelected() == true)
            sanPhamRepository.updateDelected(false, id);
        else
            sanPhamRepository.updateDelected(true, id);
    }

    public Page<SanPhamResponce> searchByAllPosition(SearchChiTietSanPhamRequest chiTietSanPhamRequest, Pageable pageable) {
        return this.sanPhamRepository.searchByAllPosition(pageable,
                chiTietSanPhamRequest.getRam() == null ? "%%" : "%" + chiTietSanPhamRequest.getRam() + "%",
                chiTietSanPhamRequest.getRom() == null ? "%%" : "%" + chiTietSanPhamRequest.getRom() + "%",
                chiTietSanPhamRequest.getNhaSanXuat() == null ? "%%" : "%" + chiTietSanPhamRequest.getNhaSanXuat() + "%",
                chiTietSanPhamRequest.getMauSac() == null ? "%%" : "%" + chiTietSanPhamRequest.getMauSac() + "%",
                chiTietSanPhamRequest.getPin() == null ? "%%" : "%" + chiTietSanPhamRequest.getPin() + "%",
                chiTietSanPhamRequest.getDongSanPham() == null ? "%%" : "%" + chiTietSanPhamRequest.getDongSanPham() + "%",
                chiTietSanPhamRequest.getDonGiaMin() == null ? "0" : "" + chiTietSanPhamRequest.getDonGiaMin(),
                chiTietSanPhamRequest.getDonGiaMax() == null ? "1000000000000" : "" + chiTietSanPhamRequest.getDonGiaMax(),
                chiTietSanPhamRequest.getChip() == null ? "%%" : "%" + chiTietSanPhamRequest.getChip() + "%",
                chiTietSanPhamRequest.getManHinh() == null ? "%%" : "%" + chiTietSanPhamRequest.getManHinh() + "%"
        );
    }


    public Double getPriceMax() {
        return this.sanPhamRepository.getDonGiaLonNhat();
    }

    public SanPham getOne(String id) {
        return this.sanPhamRepository.findById(id).get();
    }

    public List<PointOfSaleColorResponce> getListColorByIDProduct(String idProduct) {
        return mauSacRepository.getListMauSacByIdProduct(idProduct);
    }

    public List<PointOfSaleCofigResponce> getListConfigByIDProduct(String idProduct) {
        return cauHinhRepository.getListPointOfSaleConfig(idProduct);
    }

    public List<PointOfSaleProductResponce> getListConfigByIDProduct(String idProduct, Integer ram,
                                                                     Integer rom, String tenMauSac) {
        return sanPhamChiTietRepository.getPointOfSaleProductResponce(idProduct, ram, rom, tenMauSac);
    }


}
