package tool;

import beephone_shop_projects.entity.*;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.infrastructure.constant.*;
import beephone_shop_projects.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "beephone_shop_projects.repository")
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private IAnhRepository anhRepository;

    @Autowired
    private ICauHinhRepository cauHinhRepository;

    @Autowired
    private IChipRepository chipRepository;

    @Autowired
    private IDiaChiRepository diaChiRepository;

    @Autowired
    private ITheSimRepository theSimRepository;

    @Autowired
    private ITheNhoRepository theNhoRepository;

    @Autowired
    private ICongSacRepository congSacRepository;

    @Autowired
    private IImeiRepository imeiRepository;

    @Autowired
    private IKhachHangRepository khachHangRepository;

    @Autowired
    private IKhuyenMaiRepository khuyenMaiRepository;

    @Autowired
    private IManHinhRepository manHinhRepository;

    @Autowired
    private IMauSacRepository mauSacRepository;
    @Autowired
    private IDoPhanGiaiRepository doPhanGiaiRepository;

    @Autowired
    private INhaSanXuatRepository nhaSanXuatRepository;

    @Autowired
    private IPinRepository pinRepository;

    @Autowired
    private IRamRepository ramRepository;

    @Autowired
    private IRomRepository romRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Autowired
    private IVoucherRepository voucherRepository;

    @Autowired
    private ISanPhamChiTietRepository iSanPhamChiTietRepository;

    @Autowired
    private ICameraRepository cameraRepository;

    @Autowired
    private ICameraTruocRepository cameraTruocRepository;

    @Autowired
    private ICameraSauRepository cameraSauRepository;

    @Autowired
    private IDanhMucRepository danhMucRepository;

    @Autowired
    private IRankRepository iRankRepository;

    @Override
    public void run(String... args) throws Exception {

        //Bảng Danh Mục
        DanhMuc danhMuc = new DanhMuc();
        danhMuc.setMa("DMUC1");
        danhMuc.setTenDanhMuc("Chơi Game");
        danhMuc.setStatus(StatusCommon.ACTIVE);
        danhMuc.setId(danhMucRepository.save(danhMuc).getId());

        DanhMuc danhMuc1 = new DanhMuc();
        danhMuc1.setMa("DMUC14");
        danhMuc1.setTenDanhMuc("Quay Video, Chụp Ảnh");
        danhMuc1.setStatus(StatusCommon.ACTIVE);
        danhMuc1.setId(danhMucRepository.save(danhMuc1).getId());

        DanhMuc danhMuc2 = new DanhMuc();
        danhMuc2.setMa("DMUC13");
        danhMuc2.setTenDanhMuc("Pin Trâu");
        danhMuc2.setStatus(StatusCommon.ACTIVE);
        danhMuc2.setId(danhMucRepository.save(danhMuc2).getId());

        DanhMuc danhMuc3 = new DanhMuc();
        danhMuc3.setMa("DMUC12");
        danhMuc3.setTenDanhMuc("Mỏng Nhẹ");
        danhMuc3.setStatus(StatusCommon.ACTIVE);
        danhMuc3.setId(danhMucRepository.save(danhMuc3).getId());

        DanhMuc danhMuc4 = new DanhMuc();
        danhMuc4.setMa("DMUC14");
        danhMuc4.setTenDanhMuc("Cấu Hình Cao");
        danhMuc4.setStatus(StatusCommon.ACTIVE);
        danhMuc4.setId(danhMucRepository.save(danhMuc4).getId());

        //Bảng Role
        Role nhanVien = new Role();
        nhanVien.setMa("role1");
        nhanVien.setTen("Nhân Viên");
        nhanVien.setId(roleRepository.save(nhanVien).getId());

        Role khachHang = new Role();
        khachHang.setMa("role2");
        khachHang.setTen("Khách Hàng");
        khachHang.setId(roleRepository.save(khachHang).getId());

        Role admin = new Role();
        admin.setMa("role3");
        admin.setTen("Admin");
        admin.setId(roleRepository.save(admin).getId());
//
        //Bảng Account
        Account khachHang1 = new Account();
        khachHang1.setMa("Account1");
        khachHang1.setHoVaTen("Nguyễn Phùng Dũng");
        khachHang1.setAnhDaiDien("https://www.hellokpop.com/wp-content/uploads/2019/09/jung-hae-in-esquire-sg-jan-2019-cover-interview-body4-e1568440568417.jpg");
        khachHang1.setCanCuocCongDan("019123109202");
        khachHang1.setNgaySinh(new Date());
        khachHang1.setGioiTinh(true);
        khachHang1.setEmail("dung@gmail.com");
        khachHang1.setSoDienThoai("0395561234");
        khachHang1.setMatKhau("12345");
        khachHang1.setTrangThai(StatusAccountCus.HOAT_DONG);
        khachHang1.setIdRole(khachHang);
        khachHang1.setId(accountRepository.save(khachHang1).getId());

        Account accountNhanVien = new Account();
        accountNhanVien.setMa("Account2");
        accountNhanVien.setHoVaTen("Trần Quang Hà");
        accountNhanVien.setAnhDaiDien("https://cdn.statically.io/img/cellphones.com.vn/sforum/wp-content/uploads/2018/11/3-8.png?quality=80&f=auto");
        accountNhanVien.setCanCuocCongDan("0191231002");
        accountNhanVien.setNgaySinh(new Date());
        accountNhanVien.setGioiTinh(true);
        accountNhanVien.setEmail("hatq@gmail.com");
        accountNhanVien.setSoDienThoai("0913010291");
        accountNhanVien.setMatKhau("12345");
        accountNhanVien.setTrangThai(StatusAccountCus.LAM_VIEC);
        accountNhanVien.setIdRole(nhanVien);
        accountNhanVien.setId(accountRepository.save(accountNhanVien).getId());


        Account accountAdmin = new Account();
        accountAdmin.setMa("Account23");
        accountAdmin.setHoVaTen("Lê Thị Vân Anh");
        accountAdmin.setAnhDaiDien("https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-346.jpeg");
        accountAdmin.setCanCuocCongDan("0191299002");
        accountAdmin.setNgaySinh(new Date());
        accountAdmin.setGioiTinh(false);
        accountAdmin.setEmail("anhltv@gmail.com");
        accountAdmin.setSoDienThoai("0912310291");
        accountAdmin.setMatKhau("12345");
        accountAdmin.setTrangThai(StatusAccountCus.LAM_VIEC);
        accountAdmin.setIdRole(admin);
        accountAdmin.setId(accountRepository.save(accountAdmin).getId());


        //Bảng Camera Trước
        CameraTruoc cameraTruoc = new CameraTruoc();
        cameraTruoc.setMa("camera1");
        cameraTruoc.setDoPhanGiai(54);
        cameraTruoc.setCameraType(CameraType.WIDE_CAMERA);
        cameraTruoc.setStatus(StatusCommon.ACTIVE);
        cameraTruoc.setId(cameraTruocRepository.save(cameraTruoc).getId());

        CameraTruoc cameraTruoc1 = new CameraTruoc();
        cameraTruoc1.setMa("camera2");
        cameraTruoc1.setDoPhanGiai(1);
        cameraTruoc1.setCameraType(CameraType.MARCO_CAMERA);
        cameraTruoc1.setStatus(StatusCommon.ACTIVE);
        cameraTruoc1.setId(cameraTruocRepository.save(cameraTruoc1).getId());

        CameraTruoc cameraTruoc2 = new CameraTruoc();
        cameraTruoc2.setMa("camera3");
        cameraTruoc2.setDoPhanGiai(5);
        cameraTruoc2.setCameraType(CameraType.TELEPHOTO_CAMERA);
        cameraTruoc2.setStatus(StatusCommon.ACTIVE);
        cameraTruoc2.setId(cameraTruocRepository.save(cameraTruoc2).getId());

        CameraTruoc cameraTruoc3 = new CameraTruoc();
        cameraTruoc3.setMa("camera4");
        cameraTruoc3.setDoPhanGiai(8);
        cameraTruoc3.setStatus(StatusCommon.ACTIVE);
        cameraTruoc3.setCameraType(CameraType.STANDARD_CAMERA);
        cameraTruoc3.setId(cameraTruocRepository.save(cameraTruoc3).getId());

        CameraTruoc cameraTruoc4 = new CameraTruoc();
        cameraTruoc4.setMa("camera5");
        cameraTruoc4.setDoPhanGiai(12);
        cameraTruoc4.setStatus(StatusCommon.ACTIVE);
        cameraTruoc4.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraTruoc4.setId(cameraTruocRepository.save(cameraTruoc4).getId());

        CameraTruoc cameraTruoc5 = new CameraTruoc();
        cameraTruoc5.setMa("camera6");
        cameraTruoc5.setDoPhanGiai(16);
        cameraTruoc5.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraTruoc5.setStatus(StatusCommon.ACTIVE);
        cameraTruoc5.setId(cameraTruocRepository.save(cameraTruoc5).getId());

        CameraTruoc cameraTruoc6 = new CameraTruoc();
        cameraTruoc6.setMa("camera7");
        cameraTruoc6.setDoPhanGiai(24);
        cameraTruoc6.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraTruoc6.setStatus(StatusCommon.ACTIVE);
        cameraTruoc6.setId(cameraTruocRepository.save(cameraTruoc6).getId());

        CameraTruoc cameraTruoc7 = new CameraTruoc();
        cameraTruoc7.setMa("camera8");
        cameraTruoc7.setDoPhanGiai(32);
        cameraTruoc7.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraTruoc7.setStatus(StatusCommon.ACTIVE);
        cameraTruoc7.setId(cameraTruocRepository.save(cameraTruoc7).getId());

        CameraTruoc cameraTruoc8 = new CameraTruoc();
        cameraTruoc8.setMa("camera9");
        cameraTruoc8.setDoPhanGiai(48);
        cameraTruoc8.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraTruoc8.setStatus(StatusCommon.ACTIVE);
        cameraTruoc8.setId(cameraTruocRepository.save(cameraTruoc8).getId());

        //Bảng Camera Sau
        CameraSau cameraSau = new CameraSau();
        cameraSau.setMa("camera1");
        cameraSau.setDoPhanGiai(60);
        cameraSau.setCameraType(CameraType.STANDARD_CAMERA);
        cameraSau.setStatus(StatusCommon.ACTIVE);
        cameraSau.setId(cameraSauRepository.save(cameraSau).getId());

        CameraSau cameraSau1 = new CameraSau();
        cameraSau1.setMa("camera2");
        cameraSau1.setDoPhanGiai(1);
        cameraSau1.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau1.setStatus(StatusCommon.ACTIVE);
        cameraSau1.setId(cameraSauRepository.save(cameraSau1).getId());

        CameraSau cameraSau2 = new CameraSau();
        cameraSau2.setMa("camera3");
        cameraSau2.setDoPhanGiai(5);
        cameraSau2.setCameraType(CameraType.TELEPHOTO_CAMERA);
        cameraSau2.setStatus(StatusCommon.ACTIVE);
        cameraSau2.setId(cameraSauRepository.save(cameraSau2).getId());

        CameraSau cameraSau3 = new CameraSau();
        cameraSau3.setMa("camera4");
        cameraSau3.setDoPhanGiai(8);
        cameraSau3.setCameraType(CameraType.DEPTH_CAMERA);
        cameraSau3.setStatus(StatusCommon.ACTIVE);
        cameraSau3.setId(cameraSauRepository.save(cameraSau3).getId());

        CameraSau cameraSau4 = new CameraSau();
        cameraSau4.setMa("camera5");
        cameraSau4.setDoPhanGiai(12);
        cameraSau4.setStatus(StatusCommon.ACTIVE);
        cameraSau4.setCameraType(CameraType.DEPTH_CAMERA);
        cameraSau4.setId(cameraSauRepository.save(cameraSau4).getId());

        CameraSau cameraSau5 = new CameraSau();
        cameraSau5.setMa("camera6");
        cameraSau5.setDoPhanGiai(16);
        cameraSau5.setCameraType(CameraType.PERISCOPE_TELEPHOTO_CAMERA);
        cameraSau5.setStatus(StatusCommon.ACTIVE);
        cameraSau5.setId(cameraSauRepository.save(cameraSau5).getId());

        CameraSau cameraSau6 = new CameraSau();
        cameraSau6.setMa("camera7");
        cameraSau6.setDoPhanGiai(24);
        cameraSau6.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau6.setStatus(StatusCommon.ACTIVE);
        cameraSau6.setId(cameraSauRepository.save(cameraSau6).getId());

        CameraSau cameraSau7 = new CameraSau();
        cameraSau7.setMa("camera8");
        cameraSau7.setDoPhanGiai(32);
        cameraSau7.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau7.setStatus(StatusCommon.ACTIVE);
        cameraSau7.setId(cameraSauRepository.save(cameraSau7).getId());

        CameraSau cameraSau8 = new CameraSau();
        cameraSau8.setMa("camera9");
        cameraSau8.setDoPhanGiai(48);
        cameraSau8.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau8.setStatus(StatusCommon.ACTIVE);
        cameraSau8.setId(cameraSauRepository.save(cameraSau8).getId());

        CameraSau cameraSau9 = new CameraSau();
        cameraSau9.setMa("camera10");
        cameraSau9.setDoPhanGiai(64);
        cameraSau9.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau9.setStatus(StatusCommon.ACTIVE);
        cameraSau9.setId(cameraSauRepository.save(cameraSau9).getId());

        CameraSau cameraSau10 = new CameraSau();
        cameraSau10.setMa("camera11");
        cameraSau10.setDoPhanGiai(108);
        cameraSau10.setCameraType(CameraType.ULTRA_WIDE_CAMERA);
        cameraSau10.setStatus(StatusCommon.ACTIVE);
        cameraSau10.setId(cameraSauRepository.save(cameraSau10).getId());

        TheNho theNho = new TheNho();
        theNho.setMa("ma1");
        theNho.setLoaiTheNho("MircoSD");
        theNho.setDungLuongToiDa(256);
        theNho.setStatus(StatusCommon.ACTIVE);
        theNho.setId(theNhoRepository.save(theNho).getId());

        TheNho theNho1 = new TheNho();
        theNho1.setMa("ma2");
        theNho1.setLoaiTheNho("microSDHC");
        theNho1.setDungLuongToiDa(32);
        theNho1.setStatus(StatusCommon.ACTIVE);
        theNho1.setId(theNhoRepository.save(theNho1).getId());

        TheNho theNho2 = new TheNho();
        theNho2.setMa("ma3");
        theNho2.setLoaiTheNho("microSDXC");
        theNho2.setDungLuongToiDa(64);
        theNho2.setStatus(StatusCommon.ACTIVE);
        theNho2.setId(theNhoRepository.save(theNho2).getId());

        TheNho theNho3 = new TheNho();
        theNho3.setMa("ma4");
        theNho3.setLoaiTheNho("microSDUC");
        theNho3.setDungLuongToiDa(128);
        theNho3.setStatus(StatusCommon.ACTIVE);
        theNho3.setId(theNhoRepository.save(theNho3).getId());

        CongSac congSac = new CongSac();
        congSac.setMa("ma1");
        congSac.setLoaiCongSac("Type-C");
        congSac.setStatus(StatusCommon.ACTIVE);
        congSac.setId(congSacRepository.save(congSac).getId());

        CongSac congSac1 = new CongSac();
        congSac.setMa("ma2");
        congSac1.setLoaiCongSac("Micro USB");
        congSac1.setStatus(StatusCommon.ACTIVE);
        congSac1.setId(congSacRepository.save(congSac1).getId());

        CongSac congSac2 = new CongSac();
        congSac2.setMa("ma3");
        congSac2.setLoaiCongSac("Lightning");
        congSac2.setStatus(StatusCommon.ACTIVE);
        congSac2.setId(congSacRepository.save(congSac2).getId());

        CongSac congSac3 = new CongSac();
        congSac3.setMa("ma4");
        congSac3.setLoaiCongSac("OTG");
        congSac3.setStatus(StatusCommon.ACTIVE);
        congSac3.setId(congSacRepository.save(congSac3).getId());

        //Bảng chip
        Chip chip = new Chip();
        chip.setMa("chip1");
        chip.setTenChip("Snapdragon 888");
        chip.setStatus(StatusCommon.ACTIVE);
        chip.setId(chipRepository.save(chip).getId());

        Chip chip2 = new Chip();
        chip2.setMa("chip2");
        chip2.setTenChip("A15");
        chip2.setStatus(StatusCommon.ACTIVE);
        chip2.setId(chipRepository.save(chip2).getId());

        Chip chip3 = new Chip();
        chip3.setMa("chip3");
        chip3.setTenChip("Dymensity 1800");
        chip3.setStatus(StatusCommon.ACTIVE);
        chip3.setId(chipRepository.save(chip3).getId());

        Chip chip4 = new Chip();
        chip4.setMa("chip133");
        chip4.setTenChip("Helio G99");
        chip4.setStatus(StatusCommon.ACTIVE);
        chip4.setId(chipRepository.save(chip4).getId());

        Chip chip5 = new Chip();
        chip5.setMa("chip13");
        chip5.setTenChip("Helio X25");
        chip5.setStatus(StatusCommon.ACTIVE);
        chip5.setId(chipRepository.save(chip5).getId());

        Chip chip6 = new Chip();
        chip6.setMa("chip134");
        chip6.setTenChip("Dymensity 9200");
        chip6.setStatus(StatusCommon.ACTIVE);
        chip6.setId(chipRepository.save(chip6).getId());

        Chip chip7 = new Chip();
        chip7.setMa("chip13");
        chip7.setTenChip("Dymensity 1800");
        chip7.setStatus(StatusCommon.ACTIVE);
        chip7.setId(chipRepository.save(chip7).getId());

        Chip chip8 = new Chip();
        chip8.setMa("chip13");
        chip8.setTenChip("Exynos 2200");
        chip8.setStatus(StatusCommon.ACTIVE);
        chip8.setId(chipRepository.save(chip8).getId());

        Chip chip9 = new Chip();
        chip9.setMa("chip13");
        chip9.setTenChip("Exynos 9825");
        chip9.setStatus(StatusCommon.ACTIVE);
        chip9.setId(chipRepository.save(chip9).getId());

        Chip chip10 = new Chip();
        chip10.setMa("chip13");
        chip10.setTenChip("SnapDragon 8+ Gen 2");
        chip10.setStatus(StatusCommon.ACTIVE);
        chip10.setId(chipRepository.save(chip10).getId());

        Chip chip11 = new Chip();
        chip11.setMa("chip13");
        chip11.setTenChip("Kirin 9900");
        chip11.setStatus(StatusCommon.ACTIVE);
        chip11.setId(chipRepository.save(chip11).getId());

        //Bảng Địa chỉ
        DiaChi diaChi = new DiaChi();
        diaChi.setHoTenKH("Nguyễn Thúy Hằng");
        diaChi.setTrangThai(1);
        diaChi.setSoDienThoaiKhachHang("01993910212");
        diaChi.setDiaChi("Hoàng Quốc Việt");
        diaChi.setXaPhuong("Phường Cổ Nhuế 1");
        diaChi.setQuanHuyen("Quận Bắc Từ Liêm");
        diaChi.setTinhThanhPho("Hà Nội");
        diaChi.setAccount(khachHang1);
        diaChi.setId(diaChiRepository.save(diaChi).getId());

        DiaChi diaChi1 = new DiaChi();
        diaChi1.setHoTenKH("Trần Thanh phong");
        diaChi1.setSoDienThoaiKhachHang("0918239812");
        diaChi1.setDiaChi("Mỹ Đình");
        diaChi1.setXaPhuong("Phường Mỹ Đình 1");
        diaChi1.setQuanHuyen("Quận Nam Từ Liêm");
        diaChi1.setTinhThanhPho("Hà Nội");
        diaChi1.setAccount(accountAdmin);
        diaChi1.setId(diaChiRepository.save(diaChi1).getId());

        DiaChi diaChi2 = new DiaChi();
        diaChi2.setHoTenKH("Vũ Văn Nguyên");
        diaChi2.setSoDienThoaiKhachHang("0391928712");
        diaChi2.setDiaChi("Xóm 4, Thôn Lai Ổn");
        diaChi2.setXaPhuong("Phường Thượng Đình");
        diaChi2.setQuanHuyen("Quận Thanh Xuân");
        diaChi2.setTinhThanhPho("Hà Nội");
        diaChi2.setAccount(accountNhanVien);
        diaChi2.setId(diaChiRepository.save(diaChi2).getId());
//
//        //Bảng Dòng Sản Phẩm
//        DongSanPham dongSanPham = new DongSanPham();
//        dongSanPham.setMa("dongSanPham1");
//        dongSanPham.setTenDongSanPham("Galaxy Z");
//        dongSanPham.setId(dongSanPhamRepository.save(dongSanPham).getId());
//
//        DongSanPham dongSanPham2 = new DongSanPham();
//        dongSanPham2.setMa("dongSanPham12");
//        dongSanPham2.setTenDongSanPham("Iphone 15 Pro Max");
//        dongSanPham2.setId(dongSanPhamRepository.save(dongSanPham2).getId());
//
//        DongSanPham dongSanPham3 = new DongSanPham();
//        dongSanPham3.setMa("dongSanPham13");
//        dongSanPham3.setTenDongSanPham("Xiaomi Mi");
//        dongSanPham3.setId(dongSanPhamRepository.save(dongSanPham3).getId());


        //Bảng Màn hình
        //Bảng Độ phân giải
        DoPhanGiaiManHinh dpg = new DoPhanGiaiManHinh();
        dpg.setMa("DPG123");
        dpg.setChieuDai(1080.0);
        dpg.setChieuRong(2340.0);
        dpg.setId(doPhanGiaiRepository.save(dpg).getId());

        DoPhanGiaiManHinh dpg1 = new DoPhanGiaiManHinh();
        dpg1.setMa("DPG1234");
        dpg1.setChieuDai(2796.0);
        dpg1.setChieuRong(1290.0);
        dpg1.setId(doPhanGiaiRepository.save(dpg1).getId());

        DoPhanGiaiManHinh dpg2 = new DoPhanGiaiManHinh();
        dpg2.setMa("DPG1235");
        dpg2.setChieuDai(1080.0);
        dpg2.setChieuRong(2408.0);
        dpg2.setId(doPhanGiaiRepository.save(dpg2).getId());

        DoPhanGiaiManHinh dpg3 = new DoPhanGiaiManHinh();
        dpg3.setMa("DPG1236");
        dpg3.setChieuDai(2388.0);
        dpg3.setChieuRong(1080.0);
        dpg3.setId(doPhanGiaiRepository.save(dpg3).getId());
        //Bảng Thẻ sim
        TheSim theSim2 = new TheSim();
        theSim2.setMa("TS2");
        theSim2.setStatus(StatusCommon.ACTIVE);
        theSim2.setSimMultiple(SimMultiple.SINGLE_SIM);
        theSim2.setLoaiTheSim("eSIM");
        theSim2.setId(theSimRepository.save(theSim2).getId());

        TheSim theSim3 = new TheSim();
        theSim3.setMa("TS3");
        theSim3.setStatus(StatusCommon.IN_ACTIVE);
        theSim3.setSimMultiple(SimMultiple.DUAL_SIM);
        theSim3.setLoaiTheSim("Micro SIM");
        theSim3.setId(theSimRepository.save(theSim3).getId());
        TheSim theSim = new TheSim();
        theSim.setMa("TS1");
        theSim.setStatus(StatusCommon.ACTIVE);
        theSim.setSimMultiple(SimMultiple.SINGLE_SIM);
        theSim.setLoaiTheSim("Nano SIM");
        theSim.setId(theSimRepository.save(theSim).getId());

        TheSim theSim1 = new TheSim();
        theSim1.setMa("TS4");
        theSim1.setStatus(StatusCommon.IN_ACTIVE);
        theSim1.setSimMultiple(SimMultiple.DUAL_SIM);
        theSim1.setLoaiTheSim("Nano SIM");
        theSim1.setId(theSimRepository.save(theSim1).getId());

        ManHinh manHinh = new ManHinh();
        manHinh.setMa("ManHinh01");
        manHinh.setLoaiManHinh("AMOLED");
        manHinh.setDoPhanGiaiManHinh(doPhanGiaiRepository.findByMa("DPG123"));
        manHinh.setKichThuoc(6.1);
        manHinh.setTanSoQuet(90);
        manHinh.setStatus(StatusCommon.ACTIVE);
        manHinh.setId(manHinhRepository.save(manHinh).getId());

        ManHinh manHinh1 = new ManHinh();
        manHinh1.setMa("ManHinh012");
        manHinh1.setLoaiManHinh("SUPER AMOLED");
        manHinh1.setDoPhanGiaiManHinh(doPhanGiaiRepository.findByMa("DPG123"));
        manHinh1.setKichThuoc(6.5);
        manHinh1.setTanSoQuet(120);
        manHinh1.setStatus(StatusCommon.ACTIVE);
        manHinh1.setId(manHinhRepository.save(manHinh1).getId());

        ManHinh manHinh2 = new ManHinh();
        manHinh2.setMa("ManHinh013");
        manHinh2.setLoaiManHinh("OLED");
        manHinh2.setDoPhanGiaiManHinh(doPhanGiaiRepository.findByMa("DPG123"));
        manHinh2.setKichThuoc(6.7);
        manHinh2.setTanSoQuet(144);
        manHinh2.setStatus(StatusCommon.IN_ACTIVE);
        manHinh2.setId(manHinhRepository.save(manHinh2).getId());

        ManHinh manHinh3 = new ManHinh();
        manHinh3.setMa("ManHinh0123");
        manHinh3.setLoaiManHinh("LCD");
        manHinh3.setDoPhanGiaiManHinh(doPhanGiaiRepository.findByMa("DPG123"));
        manHinh3.setKichThuoc(6.8);
        manHinh3.setTanSoQuet(165);
        manHinh3.setStatus(StatusCommon.ACTIVE);
        manHinh3.setId(manHinhRepository.save(manHinh3).getId());

        //Bảng Màu sắc
        MauSac mauSac = new MauSac();
        mauSac.setMa("MauSac1");
        mauSac.setTenMauSac("Vàng");
        mauSac.setStatus(StatusCommon.ACTIVE);
        mauSac.setId(mauSacRepository.save(mauSac).getId());

        MauSac mauSac1 = new MauSac();
        mauSac1.setMa("MauSac12");
        mauSac1.setTenMauSac("Trắng");
        mauSac1.setStatus(StatusCommon.ACTIVE);
        mauSac1.setId(mauSacRepository.save(mauSac1).getId());

        MauSac mauSac2 = new MauSac();
        mauSac2.setMa("MauSac13");
        mauSac2.setTenMauSac("Đen");
        mauSac2.setStatus(StatusCommon.ACTIVE);
        mauSac2.setId(mauSacRepository.save(mauSac2).getId());

        MauSac mauSac3 = new MauSac();
        mauSac3.setMa("MauSac13");
        mauSac3.setTenMauSac("Xanh dương");
        mauSac3.setStatus(StatusCommon.ACTIVE);
        mauSac3.setId(mauSacRepository.save(mauSac3).getId());

        MauSac mauSac4 = new MauSac();
        mauSac4.setMa("MauSac1123");
        mauSac4.setTenMauSac("Đen nhám");
        mauSac4.setStatus(StatusCommon.ACTIVE);
        mauSac4.setId(mauSacRepository.save(mauSac4).getId());

        MauSac mauSac5 = new MauSac();
        mauSac5.setMa("MauSac1121");
        mauSac5.setTenMauSac("Hồng");
        mauSac5.setStatus(StatusCommon.ACTIVE);
        mauSac5.setId(mauSacRepository.save(mauSac5).getId());

        MauSac mauSac6 = new MauSac();
        mauSac6.setMa("MauSac1120");
        mauSac6.setTenMauSac("Bạc");
        mauSac6.setStatus(StatusCommon.ACTIVE);
        mauSac6.setId(mauSacRepository.save(mauSac6).getId());

        MauSac mauSac7 = new MauSac();
        mauSac7.setMa("MauSac1122");
        mauSac7.setTenMauSac("Đỏ");
        mauSac7.setStatus(StatusCommon.ACTIVE);
        mauSac7.setId(mauSacRepository.save(mauSac7).getId());

        MauSac mauSac8 = new MauSac();
        mauSac8.setMa("MauSac1125");
        mauSac8.setTenMauSac("Xám");
        mauSac8.setStatus(StatusCommon.ACTIVE);
        mauSac8.setId(mauSacRepository.save(mauSac8).getId());

        //Bảng Nhà sản xuất
        Hang hang = new Hang();
        hang.setMa("NhaSanXuat1");
        hang.setTenHang("Samsung");
        hang.setStatus(StatusCommon.ACTIVE);
        hang.setId(nhaSanXuatRepository.save(hang).getId());

        Hang hang1 = new Hang();
        hang1.setMa("NhaSanXuat12");
        hang1.setTenHang("Xiaomi");
        hang1.setStatus(StatusCommon.ACTIVE);
        hang1.setId(nhaSanXuatRepository.save(hang1).getId());

        Hang hang2 = new Hang();
        hang2.setMa("NhaSanXuat13");
        hang2.setTenHang("Apple");
        hang2.setStatus(StatusCommon.ACTIVE);
        hang2.setId(nhaSanXuatRepository.save(hang2).getId());

        Hang hang3 = new Hang();
        hang3.setMa("NhaSanXuat17");
        hang3.setTenHang("Oppo");
        hang3.setStatus(StatusCommon.ACTIVE);
        hang3.setId(nhaSanXuatRepository.save(hang3).getId());

        Hang hang4 = new Hang();
        hang4.setMa("NhaSanXuat125");
        hang4.setTenHang("Realme");
        hang4.setStatus(StatusCommon.ACTIVE);
        hang4.setId(nhaSanXuatRepository.save(hang4).getId());

        Hang hang5 = new Hang();
        hang5.setMa("NhaSanXuat134");
        hang5.setTenHang("Nokia");
        hang5.setStatus(StatusCommon.ACTIVE);
        hang5.setId(nhaSanXuatRepository.save(hang5).getId());

        Hang hang6 = new Hang();
        hang6.setMa("NhaSanXuat1323");
        hang6.setTenHang("Vivo");
        hang6.setStatus(StatusCommon.ACTIVE);
        hang6.setId(nhaSanXuatRepository.save(hang5).getId());

        //Bảng Pin
        Pin pin = new Pin();
        pin.setMa("Pin01");
        pin.setLoaiPin("Polymer");
        pin.setDungLuong(6000);
        pin.setStatus(StatusCommon.ACTIVE);
        pin.setId(pinRepository.save(pin).getId());

        Pin pin1 = new Pin();
        pin1.setMa("Pin012");
        pin1.setDungLuong(4800);
        pin1.setLoaiPin("Li-ion");
        pin1.setStatus(StatusCommon.ACTIVE);
        pin1.setId(pinRepository.save(pin1).getId());

        Pin pin2 = new Pin();
        pin2.setMa("Pin013");
        pin2.setDungLuong(5000);
        pin2.setLoaiPin("Lipo");
        pin2.setStatus(StatusCommon.ACTIVE);
        pin2.setId(pinRepository.save(pin2).getId());

        //Bảng Ram
        Ram ram = new Ram();
        ram.setMa("ram01");
        ram.setDungLuong(6);
        ram.setStatus(StatusCommon.ACTIVE);
        ram.setId(ramRepository.save(ram).getId());

        Ram ram1 = new Ram();
        ram1.setMa("ram013");
        ram1.setDungLuong(2);
        ram1.setStatus(StatusCommon.ACTIVE);
        ram1.setId(ramRepository.save(ram1).getId());

        Ram ram2 = new Ram();
        ram2.setMa("ram012");
        ram2.setDungLuong(3);
        ram2.setStatus(StatusCommon.ACTIVE);
        ram2.setId(ramRepository.save(ram2).getId());

        Ram ram3 = new Ram();
        ram3.setMa("ram0123");
        ram3.setDungLuong(4);
        ram3.setStatus(StatusCommon.ACTIVE);
        ram3.setId(ramRepository.save(ram3).getId());

        Ram ram5 = new Ram();
        ram5.setMa("ram0172");
        ram5.setDungLuong(8);
        ram5.setStatus(StatusCommon.ACTIVE);
        ram5.setId(ramRepository.save(ram5).getId());

        Ram ram4 = new Ram();
        ram4.setMa("ram0163");
        ram4.setDungLuong(12);
        ram4.setStatus(StatusCommon.ACTIVE);
        ram4.setId(ramRepository.save(ram4).getId());

        //Bảng Rom
        Rom rom5 = new Rom();
        rom5.setMa("Rom01");
        rom5.setDungLuong(32);
        rom5.setStatus(StatusCommon.ACTIVE);
        rom5.setId(romRepository.save(rom5).getId());

        Rom rom4 = new Rom();
        rom4.setMa("Rom01");
        rom4.setDungLuong(64);
        rom4.setStatus(StatusCommon.ACTIVE);
        rom4.setId(romRepository.save(rom4).getId());

        Rom rom = new Rom();
        rom.setMa("Rom01");
        rom.setDungLuong(128);
        rom.setStatus(StatusCommon.ACTIVE);
        rom.setId(romRepository.save(rom).getId());

        Rom rom1 = new Rom();
        rom1.setMa("Rom014");
        rom1.setDungLuong(256);
        rom1.setStatus(StatusCommon.ACTIVE);
        rom1.setId(romRepository.save(rom1).getId());

        Rom rom2 = new Rom();
        rom2.setMa("Rom015");
        rom2.setDungLuong(512);
        rom2.setStatus(StatusCommon.ACTIVE);
        rom2.setId(romRepository.save(rom2).getId());

        Rom rom3 = new Rom();
        rom3.setMa("Rom0153");
        rom3.setDungLuong(1024);
        rom3.setStatus(StatusCommon.ACTIVE);
        rom3.setId(romRepository.save(rom3).getId());

        //bảng sản phẩm
//        SanPham sanPham = new SanPham();
//        sanPham.setMa("SanPham01");
//        sanPham.setTenSanPham("Iphone 14 Pro");
//        sanPham.setSim(2);
//        sanPham.setCongSac("Type C");
//        sanPham.setHeDieuHanh("IOS");
//        sanPham.setMoTa("""
//                Samsung Galaxy S22 là bước nhảy vọt trong công nghệ video trên thế hệ di động.
//                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung.
//                """);
//        sanPham.setChip(chip);
//        sanPham.setDongSanPham(dongSanPham);
//        sanPham.setHang(hang);
//        sanPham.setManHinh(manHinh);
//        sanPham.setPin(pin);
//        sanPham.setId(sanPhamRepository.save(sanPham).getId());

//        SanPham sanPham1 = new SanPham();
//        sanPham1.setMa("SanPham014");
//        sanPham1.setTenSanPham("Xiaomi Mi 11");
//        sanPham1.setSim(2);
//        sanPham1.setCongSac("Type C");
//        sanPham1.setHeDieuHanh("Android");
//        sanPham1.setMoTa("""
//                Xiaomi Mi 11 là bước nhảy vọt trong công nghệ video trên thế hệ di động.
//                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung.
//                """);
//        sanPham1.setChip(chip2);
//        sanPham1.setDongSanPham(dongSanPham2);
//        sanPham1.setHang(hang2);
//        sanPham1.setManHinh(manHinh2);
//        sanPham1.setPin(pin2);
//        sanPham1.setId(sanPhamRepository.save(sanPham1).getId());

//        SanPham sanPham2 = new SanPham();
//        sanPham2.setMa("SanPham012");
//        sanPham2.setTenSanPham("Iphone 15 Pro Max");
//        sanPham2.setSim(2);
//        sanPham2.setCongSac("Type C");
//        sanPham2.setHeDieuHanh("IOS");
//        sanPham2.setMoTa("""
//                Iphone 15 là bước nhảy vọt trong công nghệ video trên thế hệ di động.
//                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung.
//                """);
//        sanPham2.setChip(chip3);
//        sanPham2.setDongSanPham(dongSanPham3);
//        sanPham2.setHang(hang1);
//        sanPham2.setManHinh(manHinh1);
//        sanPham2.setPin(pin1);
//        sanPham2.setId(sanPhamRepository.save(sanPham2).getId());

        //Bảng khuyến mại
        KhuyenMai khuyenMai = new KhuyenMai();
        khuyenMai.setMa("KhuyenMai1");
        khuyenMai.setTenKhuyenMai("BeePhone Shop giảm 250K VNĐ");
        khuyenMai.setGiaTriKhuyenMai(new BigDecimal(250000));
        khuyenMai.setLoaiKhuyenMai(TypeDiscount.VND);
        SimpleDateFormat dateFormat5 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayKetThuc5 = null;
        try {
            ngayKetThuc5 = dateFormat5.parse("10-12-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai.setNgayBatDau(new Date());
        khuyenMai.setNgayKetThuc(ngayKetThuc5);
        khuyenMai.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        khuyenMai.setId(khuyenMaiRepository.save(khuyenMai).getId());

        KhuyenMai khuyenMai2 = new KhuyenMai();
        khuyenMai2.setMa("KhuyenMai2");
        khuyenMai2.setTenKhuyenMai("BeePhone Shop giảm 500k VNĐ");
        khuyenMai2.setGiaTriKhuyenMai(new BigDecimal(250000));
        khuyenMai2.setLoaiKhuyenMai(TypeDiscount.VND);
        SimpleDateFormat dateFormat6 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau6 = null;
        Date ngayKetThuc6 = null;
        try {
            ngayBatDau6 = dateFormat6.parse("20-05-2023");
            ngayKetThuc6 = dateFormat6.parse("30-07-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai2.setNgayBatDau(ngayBatDau6);
        khuyenMai2.setNgayKetThuc(ngayKetThuc6);
        khuyenMai2.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        khuyenMai2.setId(khuyenMaiRepository.save(khuyenMai2).getId());

        KhuyenMai khuyenMai3 = new KhuyenMai();
        khuyenMai3.setMa("KhuyenMai1");
        khuyenMai3.setTenKhuyenMai("BeePhone Shop giảm 1 triệu VNĐ");
        khuyenMai3.setGiaTriKhuyenMai(new BigDecimal(1000000));
        khuyenMai3.setLoaiKhuyenMai(TypeDiscount.VND);
        SimpleDateFormat dateFormat7 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau7 = null;
        Date ngayKetThuc7 = null;
        try {
            ngayBatDau7 = dateFormat7.parse("20-05-2024");
            ngayKetThuc7 = dateFormat7.parse("30-07-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai3.setNgayBatDau(ngayBatDau7);
        khuyenMai3.setNgayKetThuc(ngayKetThuc7);
        khuyenMai3.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        khuyenMai3.setId(khuyenMaiRepository.save(khuyenMai3).getId());

        KhuyenMai khuyenMai4 = new KhuyenMai();
        khuyenMai4.setMa("KhuyenMai16");
        khuyenMai4.setTenKhuyenMai("BeePhone Shop giảm 1 triệu 2 VNĐ");
        khuyenMai4.setGiaTriKhuyenMai(new BigDecimal(1200000));
        khuyenMai4.setLoaiKhuyenMai(TypeDiscount.VND);
        SimpleDateFormat dateFormat8 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau8 = null;
        Date ngayKetThuc8 = null;
        try {
            ngayBatDau8 = dateFormat8.parse("20-05-2023");
            ngayKetThuc8 = dateFormat8.parse("30-12-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai4.setNgayBatDau(ngayBatDau8);
        khuyenMai4.setNgayKetThuc(ngayKetThuc8);
        khuyenMai4.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        khuyenMai4.setId(khuyenMaiRepository.save(khuyenMai4).getId());

        KhuyenMai khuyenMai5 = new KhuyenMai();
        khuyenMai5.setMa("KhuyenMai17");
        khuyenMai5.setTenKhuyenMai("BeePhone Shop giảm 1 triệu 5 VNĐ");
        khuyenMai5.setGiaTriKhuyenMai(new BigDecimal(1500000));
        khuyenMai5.setLoaiKhuyenMai(TypeDiscount.VND);
        SimpleDateFormat dateFormat9 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau9 = null;
        Date ngayKetThuc9 = null;
        try {
            ngayBatDau9 = dateFormat9.parse("20-05-2023");
            ngayKetThuc9 = dateFormat9.parse("14-01-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai5.setNgayBatDau(ngayBatDau9);
        khuyenMai5.setNgayKetThuc(ngayKetThuc9);
        khuyenMai5.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        khuyenMai5.setId(khuyenMaiRepository.save(khuyenMai5).getId());

        //Bảng Voucher
        Voucher voucher = new Voucher();
        voucher.setMa("VOUCHER123");
        voucher.setTen("""
                Giảm ngay 100k cho đơn hàng của khách hàng đạt 5000k
                """);
        voucher.setGiaTriVoucher(new BigDecimal(100000));
        voucher.setDieuKienApDung(new BigDecimal(5000000));
        voucher.setGiaTriToiDa(null);
        voucher.setSoLuong(1000);
        voucher.setLoaiVoucher(TypeDiscount.VND);
        SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayKetThuc1 = null;
        try {
            ngayKetThuc1 = dateFormat1.parse("20-12-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher.setNgayBatDau(new Date());
        voucher.setNgayKetThuc(ngayKetThuc1);
        voucher.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        voucher.setId(voucherRepository.save(voucher).getId());

        Voucher voucher5 = new Voucher();
        voucher5.setMa("VOUCHER131");
        voucher5.setTen("""
                Giảm ngay 10 triệu cho đơn hàng của khách hàng đạt 31 triệu
                """);
        voucher5.setGiaTriVoucher(new BigDecimal(1000000));
        voucher5.setDieuKienApDung(new BigDecimal(31000000));
        voucher5.setGiaTriToiDa(null);
        voucher5.setSoLuong(1000);
        voucher5.setLoaiVoucher(TypeDiscount.VND);
        SimpleDateFormat dateFormat15 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayKetThuc15 = null;
        try {
            ngayKetThuc15 = dateFormat1.parse("20-10-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher5.setNgayBatDau(new Date());
        voucher5.setNgayKetThuc(ngayKetThuc15);
        voucher5.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        voucher5.setId(voucherRepository.save(voucher5).getId());

        Voucher voucher6 = new Voucher();
        voucher6.setMa("VOUCHER122");
        voucher6.setTen("""
                Giảm ngay 7000k cho đơn hàng của khách hàng đạt 50000k
                """);
        voucher6.setGiaTriVoucher(new BigDecimal(7000000));
        voucher6.setDieuKienApDung(new BigDecimal(50000000));
        voucher6.setGiaTriToiDa(null);
        voucher6.setSoLuong(1000);
        voucher6.setLoaiVoucher(TypeDiscount.VND);
        SimpleDateFormat dateFormat19 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayKetThuc19 = null;
        try {
            ngayKetThuc19 = dateFormat19.parse("20-9-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher6.setNgayBatDau(new Date());
        voucher6.setNgayKetThuc(ngayKetThuc19);
        voucher6.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        voucher6.setId(voucherRepository.save(voucher6).getId());

        Voucher voucher2 = new Voucher();
        voucher2.setMa("VOUCHER456");
        voucher2.setTen("""
                Giảm ngay 5000k cho đơn hàng của khách hàng đạt 50000k
                """);
        voucher2.setGiaTriVoucher(new BigDecimal(5000000));
        voucher2.setDieuKienApDung(new BigDecimal(50000000));
        voucher2.setGiaTriToiDa(null);
        voucher2.setSoLuong(1000);
        voucher2.setLoaiVoucher(TypeDiscount.VND);
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau2 = null;
        Date ngayKetThuc2 = null;
        try {
            ngayBatDau2 = dateFormat2.parse("20-05-2024");
            ngayKetThuc2 = dateFormat2.parse("30-07-2024");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher2.setNgayBatDau(ngayBatDau2);
        voucher2.setNgayKetThuc(ngayKetThuc2);
        voucher2.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        voucher2.setId(voucherRepository.save(voucher2).getId());

        Voucher voucher3 = new Voucher();
        voucher3.setMa("VOUCHER678");
        voucher3.setTen("""
                Giảm ngay 3 triệu cho đơn hàng của khách hàng đạt 15000k
                """);
        voucher3.setGiaTriVoucher(new BigDecimal(3000000));
        voucher3.setDieuKienApDung(new BigDecimal(15000000));
        voucher3.setGiaTriToiDa(null);
        voucher3.setSoLuong(1000);
        voucher3.setLoaiVoucher(TypeDiscount.VND);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau = null;
        Date ngayKetThuc = null;
        try {
            ngayBatDau = dateFormat.parse("20-05-2023");
            ngayKetThuc = dateFormat.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher3.setTrangThai(StatusDiscount.CHUA_DIEN_RA);
        voucher3.setNgayBatDau(ngayBatDau);
        voucher3.setNgayKetThuc(ngayKetThuc);
        voucher3.setId(voucherRepository.save(voucher3).getId());

//        SanPham sanPham = new SanPham();
//        sanPham.setMa("SP00001");
//        sanPham.setTenSanPham("Xiaomi Mi 10");
//        sanPham.setMoTa("Tốt");
//        sanPham.setDanhMucs();
    }


    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }
}
