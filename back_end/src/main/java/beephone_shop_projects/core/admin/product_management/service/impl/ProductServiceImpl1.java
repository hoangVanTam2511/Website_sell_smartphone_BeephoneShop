package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.model.request.CreateProductRequest;
import beephone_shop_projects.core.admin.product_management.model.request.SearchProductDetailRequest;
import beephone_shop_projects.core.admin.product_management.model.responce.*;
import beephone_shop_projects.core.admin.product_management.repository.*;
import beephone_shop_projects.entity.*;
import beephone_shop_projects.infrastructure.constant.CameraContant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl1 {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ChipRepository chipRepository;

    @Autowired
    private ProductLineRepository productLineRepository;

    @Autowired
    private DisplayRepository displayRepository;

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private CauHinhRepository cauHinhRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private CameraRepository cameraRepository;

    @Autowired
    private CameraDetailRepository cameraDetailRepository;

    public Page<SanPham> getAll(Pageable pageable) {
        return productRepository.findAllByDelected(true, pageable);
    }

    public Page<SanPhamResponce> getAllByDelected(Pageable pageable) {
        return productRepository.findAllChiTietSanPham(pageable);
    }

    public SanPham insert(CreateProductRequest req) {
        Chip chip = chipRepository.findByTenChip(req.getChip()).get(0);
        Hang hang = brandRepository.findBytenHang(req.getNhaSanXuat()).get(0);
        DongSanPham dongSanPham = productLineRepository.findByTenDongSanPham(req.getDongSanPham()).get(0);
        ManHinh manHinh = displayRepository.findByKichThuoc(req.getManHinh()).get(0);
        Pin pin = pinRepository.findByDungLuong(req.getPin()).get(0);

        SanPham sanPham = new SanPham();
        sanPham.setMa(productRepository.getNewCode() == null ? "PRODUCT_0" : "PRODUCT_" + productRepository.getNewCode());
        sanPham.setTenSanPham(req.getTenSanPham());
        sanPham.setDongSanPham(dongSanPham);
        sanPham.setHang(hang);
        sanPham.setChip(chip);
        sanPham.setPin(pin);
        sanPham.setManHinh(manHinh);
        sanPham.setMoTa(req.getMoTa());
//        sanPham.setHeDieuHanh(req.getHeDieuHanh());
//        sanPham.setSim(req.getSim());
//        sanPham.setCongSac(req.getCongSac());
        sanPham.setDelected(false);

        SanPham product = productRepository.save(sanPham);

        req.getCameraSau().forEach((item) -> {
            //   find camera by do phan giai
            Integer index  = item.indexOf(" ");
            // cắt chuỗi và lưu vào db
            Camera camera = cameraRepository.findByDoPhanGiai(item.substring(0,index));
            ChiTietCamera cameraDetail = new ChiTietCamera();
            cameraDetail.setIdCamera(camera);
            cameraDetail.setIdSanPham(product);
            cameraDetail.setLoaiCamera(CameraContant.CAMERA_SAU);
            cameraDetailRepository.save(cameraDetail);
        });

        req.getCameraTruoc().forEach((item) -> {
            //   find camera by do phan giai
            Integer index  = item.indexOf(" ");
            Camera camera = cameraRepository.findByDoPhanGiai(item.substring(0,index));
            ChiTietCamera cameraDetail = new ChiTietCamera();
            cameraDetail.setIdCamera(camera);
            cameraDetail.setIdSanPham(product);
            cameraDetail.setLoaiCamera(CameraContant.CAMERA_TRUOC);
            cameraDetailRepository.save(cameraDetail);
        });

        return product;
    }

    public void update(SanPham sanPham, String id) {
        productRepository.save(sanPham);
    }


    public void delete(String id) {
        SanPham sanPham = productRepository.findById(id).get();
        if (sanPham.getDelected() == true)
            productRepository.updateDelected(false, id);
        else
            productRepository.updateDelected(true, id);
    }

    public Page<SanPhamResponce> searchByAllPosition(SearchProductDetailRequest chiTietSanPhamRequest, Pageable pageable) {
        return this.productRepository.searchByAllPosition(pageable,
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
        return this.productRepository.getDonGiaLonNhat();
    }

    public SanPham getOne(String id) {
        return this.productRepository.findById(id).get();
    }

    public List<PointOfSaleColorResponce> getListColorByIDProduct(String idProduct) {
        return colorRepository.getListMauSacByIdProduct(idProduct);
    }

    public List<PointOfSaleCofigResponce> getListConfigByIDProduct(String idProduct) {
        return cauHinhRepository.getListPointOfSaleConfig(idProduct);
    }

    public List<PointOfSaleProductResponce> getListConfigByIDProduct(String idProduct, Integer ram,
                                                                     Integer rom, String tenMauSac) {
        return productDetailRepository.getPointOfSaleProductResponce(idProduct, ram, rom, tenMauSac);
    }

    public List<PointOfSaleOneProductResponce> getListProducts() {
        return productRepository.getPOSProduct();
    }


}
