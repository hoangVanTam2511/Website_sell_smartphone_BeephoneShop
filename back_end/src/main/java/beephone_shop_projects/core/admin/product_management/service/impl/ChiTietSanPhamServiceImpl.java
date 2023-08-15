package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchChiTietSanPhamRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietCauHinhResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.ChiTietSanPhamResponce;
import beephone_shop_projects.core.admin.product_management.repository.CameraRepository;
import beephone_shop_projects.core.admin.product_management.repository.ChiTietSanPhamReponsitory;
import beephone_shop_projects.core.admin.product_management.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_management.repository.DongSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.repository.HinhThucSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_management.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_management.repository.NhaSanXuatRepository;
import beephone_shop_projects.core.admin.product_management.repository.PinRepository;
import beephone_shop_projects.core.admin.product_management.repository.RamRepository;
import beephone_shop_projects.core.admin.product_management.repository.RomRepository;
import beephone_shop_projects.core.admin.product_management.repository.SanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.ChiTietSanPham;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.NhaSanXuat;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ChiTietSanPhamServiceImpl {

    @Autowired
    private ChiTietSanPhamReponsitory chiTietSanPhamReponsitory;

    @Autowired
    private RamRepository ramRepository;


    @Autowired
    private RomRepository romRepository;

    @Autowired
    private ManHinhRepository manHinhRepository;

    @Autowired
    private MauSacRepository mauSacRepository;

    @Autowired
    private NhaSanXuatRepository nhaSanXuatRepository;

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private ChipRepository chipRepository;

    @Autowired
    private DongSanPhamRepository dongSanPhamRepository;

    @Autowired
    private HinhThucSanPhamRepository hinhThucSanPhamRepository;

    @Autowired
    private CameraRepository cameraRepository;


    public Page<ChiTietSanPham> getAll(Pageable pageable) {
        return chiTietSanPhamReponsitory.findAllByDelected(true, pageable);
    }

    public Page<ChiTietSanPhamResponce> getAllByDelected(Pageable pageable) {
        return chiTietSanPhamReponsitory.findAllChiTietSanPham( pageable);
    }

    public void insert(CreateChiTietSanPhamRequest chiTietSanPhamRequest) {
        sanPhamRepository.save(new SanPham(chiTietSanPhamRequest.getSanPham(),chiTietSanPhamRequest.getSanPham()));
        Ram ram = ramRepository.findByKichThuoc(chiTietSanPhamRequest.getRam());
        Rom rom = romRepository.findByKichThuoc(chiTietSanPhamRequest.getRom());
        ManHinh manHinh = manHinhRepository.findByKichThuoc(chiTietSanPhamRequest.getManHinh());
        Pin pin = pinRepository.findByDungLuong(chiTietSanPhamRequest.getPin());
        Chip chip = chipRepository.findByTenChip(chiTietSanPhamRequest.getChip());
        SanPham sanPham = sanPhamRepository.findByTen(chiTietSanPhamRequest.getSanPham());
        NhaSanXuat nhaSanXuat = nhaSanXuatRepository.findByTenNhaSanXuat(chiTietSanPhamRequest.getNhaSanXuat());
        DongSanPham dongSanPham = dongSanPhamRepository.findByTenDongSanPham(chiTietSanPhamRequest.getDongSanPham());
        HinhThucSanPham hinhThucSanPham = hinhThucSanPhamRepository.findByHinhThuc(
        chiTietSanPhamRequest.getHinhThucSanPham());
        MauSac mauSac = mauSacRepository.findByTenMauSac(chiTietSanPhamRequest.getMauSac());
        Camera camera = cameraRepository.findByDoPhanGiai(chiTietSanPhamRequest.getCamera());

        ChiTietSanPham chiTietSanPham = new ChiTietSanPham(chiTietSanPhamRequest.getDonGia(),
                chiTietSanPhamRequest.getMoTa(),
                dongSanPham, mauSac, nhaSanXuat, sanPham, ram, rom, pin, chip, manHinh, camera, hinhThucSanPham);

        chiTietSanPhamReponsitory.save(chiTietSanPham);
    }

    public void update(ChiTietSanPham chiTietSanPham, String id) {
        chiTietSanPhamReponsitory.save(chiTietSanPham);
    }


    public void delete(String id) {
        ChiTietSanPham chiTietSanPham = chiTietSanPhamReponsitory.findById(id).get();
        if(chiTietSanPham.getDelected() == true)
           chiTietSanPhamReponsitory.updateDelected(false, id);
        else
            chiTietSanPhamReponsitory.updateDelected(true, id);
    }

    public Page<ChiTietSanPhamResponce> searchByAllPosition(SearchChiTietSanPhamRequest chiTietSanPhamRequest, Pageable pageable){
        return this.chiTietSanPhamReponsitory.searchByAllPosition(pageable,
                chiTietSanPhamRequest.getRam()==null ?"%%":"%"+chiTietSanPhamRequest.getRam()+"%",
                chiTietSanPhamRequest.getRom()==null ?"%%":   "%"+chiTietSanPhamRequest.getRom() +"%",
                chiTietSanPhamRequest.getNhaSanXuat()==null ?"%%":  "%"+chiTietSanPhamRequest.getNhaSanXuat()+"%",
                chiTietSanPhamRequest.getMauSac()==null ?"%%":   "%"+chiTietSanPhamRequest.getMauSac()+"%",
                chiTietSanPhamRequest.getHinhThucSanPham()==null ?"%%": "%"+chiTietSanPhamRequest.getHinhThucSanPham()+"%",
                chiTietSanPhamRequest.getPin()==null ?"%%":   "%"+chiTietSanPhamRequest.getPin()+"%",
                chiTietSanPhamRequest.getDongSanPham()==null ?"%%":   "%"+chiTietSanPhamRequest.getDongSanPham()+"%",
                chiTietSanPhamRequest.getCamera() == null ?"%%": "%"+chiTietSanPhamRequest.getCamera()+"%",
                chiTietSanPhamRequest.getDonGiaMin() == null ?"0": ""+chiTietSanPhamRequest.getDonGiaMin(),
                chiTietSanPhamRequest.getDonGiaMax() == null ?"1000000000000": ""+chiTietSanPhamRequest.getDonGiaMax(),
                chiTietSanPhamRequest.getChip() == null ?"%%": "%"+chiTietSanPhamRequest.getChip()+"%",
                chiTietSanPhamRequest.getManHinh() == null ?"%%": "%"+chiTietSanPhamRequest.getManHinh()+"%",
                chiTietSanPhamRequest.getSanPham() == null ?"%%": "%"+chiTietSanPhamRequest.getSanPham()+"%"
                );

    }

    public  Page<ChiTietCauHinhResponce> getChiTietCauHinh(Pageable pageable){
        return this.chiTietSanPhamReponsitory.getChiTietCauHinh(pageable);
    }

}
