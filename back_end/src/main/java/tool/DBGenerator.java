package tool;

import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.CauHinh;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.KhuyenMai;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.entity.NhaSanXuat;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.entity.Role;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.repository.IAccountRepository;
import beephone_shop_projects.repository.IAnhRepository;
import beephone_shop_projects.repository.ICauHinhRepository;
import beephone_shop_projects.repository.IChipRepository;
import beephone_shop_projects.repository.IDiaChiRepository;
import beephone_shop_projects.repository.IDongSanPhamRepository;
import beephone_shop_projects.repository.IImeiRepository;
import beephone_shop_projects.repository.IKhachHangRepository;
import beephone_shop_projects.repository.IKhuyenMaiChiTietRepository;
import beephone_shop_projects.repository.IKhuyenMaiRepository;
import beephone_shop_projects.repository.IManHinhRepository;
import beephone_shop_projects.repository.IMauSacRepository;
import beephone_shop_projects.repository.INhaSanXuatRepository;
import beephone_shop_projects.repository.IPinRepository;
import beephone_shop_projects.repository.IRamRepository;
import beephone_shop_projects.repository.IRoleRepository;
import beephone_shop_projects.repository.IRomRepository;
import beephone_shop_projects.repository.ISanPhamChiTietRepository;
import beephone_shop_projects.repository.ISanPhamRepository;
import beephone_shop_projects.repository.IVoucherRepository;
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
    private IDongSanPhamRepository dongSanPhamRepository;

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

    @Override
    public void run(String... args) throws Exception {

        //Bảng Role
        Role nhanVien = new Role();
        nhanVien.setMa("Nhanvien1");
        nhanVien.setTen("Nhân Viên");
        nhanVien.setId(roleRepository.save(nhanVien).getId());
        Role chuCuaHang = new Role();
        chuCuaHang.setMa("ChuCuaHang1");
        chuCuaHang.setTen("admin");
        chuCuaHang.setId(roleRepository.save(chuCuaHang).getId());

        //Bảng Account
        Account admin = new Account();
        admin.setMa("Account1");
        admin.setHoVaTen("Nguyễn Phùng Dũng");
        admin.setAnhDaiDien("haha");
        admin.setCanCuocCongDan("0191231002");
        admin.setNgaySinh(new Date());
        admin.setGioiTinh(true);
        admin.setEmail("dung@gmail.com");
        admin.setSoDienThoai("0395561234");
        admin.setDiaChi("Phú diễn");
        admin.setXaPhuong("Phường phú diễn");
        admin.setQuanHuyen("Quận Bắc Từ Liêm");
        admin.setTinhThanhPho("Thành phố Hà Nội");
        admin.setMatKhau("12345");
        admin.setTrangThai(1);
        admin.setIdRole(chuCuaHang);
        admin.setId(accountRepository.save(admin).getId());

        Account accountNhanVien = new Account();
        accountNhanVien.setMa("Account2");
        accountNhanVien.setHoVaTen("Trần Quang Hà");
        accountNhanVien.setAnhDaiDien("haha");
        accountNhanVien.setCanCuocCongDan("0191231002");
        accountNhanVien.setNgaySinh(new Date());
        accountNhanVien.setGioiTinh(true);
        accountNhanVien.setEmail("hatq@gmail.com");
        accountNhanVien.setSoDienThoai("0913010291");
        accountNhanVien.setDiaChi("Kiều mai");
        accountNhanVien.setXaPhuong("Phường kiều mai");
        accountNhanVien.setQuanHuyen("Quận Nam Từ Liêm");
        accountNhanVien.setTinhThanhPho("Thành phố Hà Nội");
        accountNhanVien.setMatKhau("12345");
        accountNhanVien.setTrangThai(1);
        accountNhanVien.setIdRole(nhanVien);
        accountNhanVien.setId(accountRepository.save(accountNhanVien).getId());



        //Bảng Camera
//        Camera camera = new Camera();
//        camera.setMa("camera1");
//        camera.setDoPhanGiai("120");
//        camera.setId(cam);

        //Bảng chip
        Chip chip = new Chip();
        chip.setMa("chip1");
        chip.setTenChip("Snapdragon 888");
        chip.setId(chipRepository.save(chip).getId());

        Chip chip2 = new Chip();
        chip2.setMa("chip12");
        chip2.setTenChip("A15");
        chip2.setId(chipRepository.save(chip2).getId());

        Chip chip3 = new Chip();
        chip3.setMa("chip13");
        chip3.setTenChip("Dymensity 1800");
        chip3.setId(chipRepository.save(chip3).getId());

        //Bảng Địa chỉ
        DiaChi diaChi = new DiaChi();
        diaChi.setHoTenKH("Nguyễn Thúy Hằng");
        diaChi.setSoDienThoaiKhachHang("01993910212");
        diaChi.setDiaChi("Hoàng Quốc Việt");
        diaChi.setXaPhuong("Phường Cổ Nhuế");
        diaChi.setQuanHuyen("Quận Bắc Từ Liêm");
        diaChi.setTinhThanhPho("Thành Phố Hà Nội");
        diaChi.setAccount(admin);
        diaChi.setId(diaChiRepository.save(diaChi).getId());

        DiaChi diaChi1 = new DiaChi();
        diaChi1.setHoTenKH("Trần Thanh phong");
        diaChi1.setSoDienThoaiKhachHang("0918239812");
        diaChi1.setDiaChi("Hồ Tùng Mậu");
        diaChi1.setXaPhuong("Phường Cổ Nhuế");
        diaChi1.setQuanHuyen("Quận Cầu Giấy");
        diaChi1.setTinhThanhPho("Thành Phố Hà Nội");
        diaChi1.setAccount(admin);
        diaChi1.setId(diaChiRepository.save(diaChi1).getId());

        DiaChi diaChi2 = new DiaChi();
        diaChi2.setHoTenKH("Vũ Văn Nguyên");
        diaChi2.setSoDienThoaiKhachHang("0391928712");
        diaChi2.setDiaChi("Xuân Thủy");
        diaChi2.setXaPhuong("Phường Dịch Vọng");
        diaChi2.setQuanHuyen("Quận Cầu Giấy");
        diaChi2.setTinhThanhPho("Thành Phố Hà Nội");
        diaChi2.setAccount(accountNhanVien);
        diaChi2.setId(diaChiRepository.save(diaChi2).getId());

        //Bảng Dòng Sản Phẩm
        DongSanPham dongSanPham = new DongSanPham();
        dongSanPham.setMa("dongSanPham1");
        dongSanPham.setTenDongSanPham("Galaxy Z");
        dongSanPham.setId(dongSanPhamRepository.save(dongSanPham).getId());

        DongSanPham dongSanPham2 = new DongSanPham();
        dongSanPham2.setMa("dongSanPham12");
        dongSanPham2.setTenDongSanPham("Iphone 15 Pro Max");
        dongSanPham2.setId(dongSanPhamRepository.save(dongSanPham2).getId());

        DongSanPham dongSanPham3 = new DongSanPham();
        dongSanPham3.setMa("dongSanPham13");
        dongSanPham3.setTenDongSanPham("Xiaomi Mi");
        dongSanPham3.setId(dongSanPhamRepository.save(dongSanPham3).getId());

        //Bảng Màn hình
        ManHinh manHinh = new ManHinh();
        manHinh.setMa("ManHinh01");
        manHinh.setDoPhanGiai("1080 x 2340 Pixels");
        manHinh.setKichThuoc(new BigDecimal("6.1"));
        manHinh.setId(manHinhRepository.save(manHinh).getId());

        ManHinh manHinh1 = new ManHinh();
        manHinh1.setMa("ManHinh012");
        manHinh1.setDoPhanGiai("1080 x 2340 Pixels");
        manHinh1.setKichThuoc(new BigDecimal("6.5"));
        manHinh1.setId(manHinhRepository.save(manHinh1).getId());

        ManHinh manHinh2 = new ManHinh();
        manHinh2.setMa("ManHinh013");
        manHinh2.setDoPhanGiai("1080 x 2340 Pixels");
        manHinh2.setKichThuoc(new BigDecimal("6.7"));
        manHinh2.setId(manHinhRepository.save(manHinh2).getId());

        //Bảng Màu sắc
        MauSac mauSac = new MauSac();
        mauSac.setMa("MauSac1");
        mauSac.setTenMauSac("Red");
        mauSac.setId(mauSacRepository.save(mauSac).getId());

        MauSac mauSac1 = new MauSac();
        mauSac1.setMa("MauSac12");
        mauSac1.setTenMauSac("Pink");
        mauSac1.setId(mauSacRepository.save(mauSac1).getId());

        MauSac mauSac2 = new MauSac();
        mauSac2.setMa("MauSac13");
        mauSac2.setTenMauSac("Blue");
        mauSac2.setId(mauSacRepository.save(mauSac2).getId());

        //Bảng Nhà sản xuất
        NhaSanXuat nhaSanXuat = new NhaSanXuat();
        nhaSanXuat.setMa("NhaSanXuat1");
        nhaSanXuat.setTenNhaSanXuat("CÔNG TY TNHH SAMSUNG ELECTRONICS VIỆT NAM");
        nhaSanXuat.setId(nhaSanXuatRepository.save(nhaSanXuat).getId());

        NhaSanXuat nhaSanXuat1 = new NhaSanXuat();
        nhaSanXuat1.setMa("NhaSanXuat12");
        nhaSanXuat1.setTenNhaSanXuat("CÔNG TY TNHH APPLE ELECTRONICS VIỆT NAM");
        nhaSanXuat1.setId(nhaSanXuatRepository.save(nhaSanXuat1).getId());

        NhaSanXuat nhaSanXuat2 = new NhaSanXuat();
        nhaSanXuat2.setMa("NhaSanXuat13");
        nhaSanXuat2.setTenNhaSanXuat("CÔNG TY TNHH XIAOMI ELECTRONICS VIỆT NAM");
        nhaSanXuat2.setId(nhaSanXuatRepository.save(nhaSanXuat2).getId());

        //Bảng Pin
        Pin pin = new Pin();
        pin.setMa("Pin01");
        pin.setDungLuong(6000);
        pin.setId(pinRepository.save(pin).getId());

        Pin pin1 = new Pin();
        pin1.setMa("Pin012");
        pin1.setDungLuong(4800);
        pin1.setId(pinRepository.save(pin1).getId());

        Pin pin2 = new Pin();
        pin2.setMa("Pin013");
        pin2.setDungLuong(5000);
        pin2.setId(pinRepository.save(pin2).getId());

        //Bảng Ram
        Ram ram = new Ram();
        ram.setMa("ram01");
        ram.setKichThuoc(8);
        ram.setId(ramRepository.save(ram).getId());

        Ram ram1 = new Ram();
        ram1.setMa("ram013");
        ram1.setKichThuoc(6);
        ram1.setId(ramRepository.save(ram1).getId());

        Ram ram2 = new Ram();
        ram2.setMa("ram012");
        ram2.setKichThuoc(4);
        ram2.setId(ramRepository.save(ram2).getId());

        //Bảng Rom
        Rom rom = new Rom();
        rom.setMa("Rom01");
        rom.setKichThuoc(128);
        rom.setId(romRepository.save(rom).getId());

        Rom rom1 = new Rom();
        rom1.setMa("Rom014");
        rom1.setKichThuoc(256);
        rom1.setId(romRepository.save(rom1).getId());

        Rom rom2 = new Rom();
        rom2.setMa("Rom015");
        rom2.setKichThuoc(512);
        rom2.setId(romRepository.save(rom2).getId());

        //bảng sản phẩm
        SanPham sanPham = new SanPham();
        sanPham.setMa("SanPham01");
        sanPham.setTenSanPham("Samsung Galaxy Z Fold 4");
        sanPham.setSim(2);
        sanPham.setCongSac("Type C");
        sanPham.setHeDieuHanh("Android");
        sanPham.setMoTa("""
                Samsung Galaxy S22 là bước nhảy vọt trong công nghệ video trên thế hệ di động. 
                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung. 
                """);
        sanPham.setIdChip(chip);
        sanPham.setIdDongSanPham(dongSanPham);
        sanPham.setIdNhaSanXuat(nhaSanXuat);
        sanPham.setIdManHinh(manHinh);
        sanPham.setIdPin(pin);
        sanPham.setId(sanPhamRepository.save(sanPham).getId());

        SanPham sanPham1 = new SanPham();
        sanPham1.setMa("SanPham014");
        sanPham1.setTenSanPham("Xiaomi Mi 11");
        sanPham1.setSim(2);
        sanPham1.setCongSac("Type C");
        sanPham1.setHeDieuHanh("Android");
        sanPham1.setMoTa("""
                Xiaomi Mi 11 là bước nhảy vọt trong công nghệ video trên thế hệ di động. 
                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung. 
                """);
        sanPham1.setIdChip(chip2);
        sanPham1.setIdDongSanPham(dongSanPham2);
        sanPham1.setIdNhaSanXuat(nhaSanXuat2);
        sanPham1.setIdManHinh(manHinh2);
        sanPham1.setIdPin(pin2);
        sanPham1.setId(sanPhamRepository.save(sanPham1).getId());

        SanPham sanPham2 = new SanPham();
        sanPham2.setMa("SanPham012");
        sanPham2.setTenSanPham("Iphone 15 Pro Max");
        sanPham2.setSim(2);
        sanPham2.setCongSac("Type C");
        sanPham2.setHeDieuHanh("IOS");
        sanPham2.setMoTa("""
                Iphone 15 là bước nhảy vọt trong công nghệ video trên thế hệ di động. 
                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung. 
                """);
        sanPham2.setIdChip(chip3);
        sanPham2.setIdDongSanPham(dongSanPham3);
        sanPham2.setIdNhaSanXuat(nhaSanXuat1);
        sanPham2.setIdManHinh(manHinh1);
        sanPham2.setIdPin(pin1);
        sanPham2.setId(sanPhamRepository.save(sanPham2).getId());

        //Bảng khuyến mại
        KhuyenMai khuyenMai = new KhuyenMai();
        khuyenMai.setMa("KhuyenMai1");
        khuyenMai.setTenKhuyenMai("FPT Shop giảm ngay 250K khi khách hàng mua laptop hoặc MacBook có giá từ 8 triệu đồng");
        khuyenMai.setGiaTriKhuyenMai(new BigDecimal(250000));
        khuyenMai.setLoaiKhuyenMai("VNĐ");
        SimpleDateFormat dateFormat5 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau5 = null;
        Date ngayKetThuc5 = null;
        try {
            ngayBatDau5 = dateFormat5.parse("20-05-2023");
            ngayKetThuc5 = dateFormat5.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai.setNgayBatDau(ngayBatDau5);
        khuyenMai.setNgayKetThuc(ngayKetThuc5);
        khuyenMai.setTrangThai(3);
        khuyenMai.setId(khuyenMaiRepository.save(khuyenMai).getId());

        KhuyenMai khuyenMai2 = new KhuyenMai();
        khuyenMai2.setMa("KhuyenMai2");
        khuyenMai2.setTenKhuyenMai("FPT Shop giảm ngay 500k khi khách hàng mua Iphone 15 hoặc MacBook có giá từ 12 triệu đồng");
        khuyenMai2.setGiaTriKhuyenMai(new BigDecimal(250000));
        khuyenMai2.setLoaiKhuyenMai("VNĐ");
        SimpleDateFormat dateFormat6 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau6 = null;
        Date ngayKetThuc6 = null;
        try {
            ngayBatDau6 = dateFormat6.parse("20-05-2023");
            ngayKetThuc6 = dateFormat6.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai2.setNgayBatDau(ngayBatDau6);
        khuyenMai2.setNgayKetThuc(ngayKetThuc6);
        khuyenMai2.setTrangThai(3);
        khuyenMai2.setId(khuyenMaiRepository.save(khuyenMai2).getId());

        KhuyenMai khuyenMai3 = new KhuyenMai();
        khuyenMai3.setMa("KhuyenMai1");
        khuyenMai3.setTenKhuyenMai("FPT Shop giảm ngay 10% khi khách hàng mua laptop hoặc MacBook có giá từ 5 triệu đồng");
        khuyenMai3.setGiaTriKhuyenMai(new BigDecimal(10));
        khuyenMai3.setLoaiKhuyenMai("%");
        SimpleDateFormat dateFormat7 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau7 = null;
        Date ngayKetThuc7 = null;
        try {
            ngayBatDau7 = dateFormat7.parse("20-05-2023");
            ngayKetThuc7 = dateFormat7.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai3.setNgayBatDau(ngayBatDau7);
        khuyenMai3.setNgayKetThuc(ngayKetThuc7);
        khuyenMai3.setTrangThai(3);
        khuyenMai3.setId(khuyenMaiRepository.save(khuyenMai3).getId());

        //Bảng Voucher
        Voucher voucher = new Voucher();
        voucher.setMa("Voucher1");
        voucher.setTen("""
                Giảm ngay 100k cho đơn hàng của khách hàng đạt 5000k
                """);
        voucher.setGiaTriVoucher(new BigDecimal(100000));
        voucher.setDieuKienApDung(new BigDecimal(5000000));
        voucher.setGiaTriToiDa(null);
        voucher.setSoLuong(1000);
        voucher.setLoaiVoucher("VNĐ");
        SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau1 = null;
        Date ngayKetThuc1 = null;
        try {
            ngayBatDau1 = dateFormat1.parse("20-05-2023");
            ngayKetThuc1 = dateFormat1.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher.setNgayBatDau(ngayBatDau1);
        voucher.setNgayKetThuc(ngayKetThuc1);
        voucher.setTrangThai(3);
        voucher.setId(voucherRepository.save(voucher).getId());

        Voucher voucher2 = new Voucher();
        voucher2.setMa("Voucher12");
        voucher2.setTen("""
                Giảm ngay 5000k cho đơn hàng của khách hàng đạt 50000k
                """);
        voucher2.setGiaTriVoucher(new BigDecimal(5000000));
        voucher2.setDieuKienApDung(new BigDecimal(50000000));
        voucher2.setGiaTriToiDa(null);
        voucher2.setSoLuong(1000);
        voucher2.setLoaiVoucher("VNĐ");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau2 = null;
        Date ngayKetThuc2 = null;
        try {
            ngayBatDau2 = dateFormat2.parse("20-05-2023");
            ngayKetThuc2 = dateFormat2.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher2.setNgayBatDau(ngayBatDau2);
        voucher2.setNgayKetThuc(ngayKetThuc2);
        voucher2.setTrangThai(3);
        voucher2.setId(voucherRepository.save(voucher2).getId());

        Voucher voucher3 = new Voucher();
        voucher3.setMa("Voucher13");
        voucher3.setTen("""
                Giảm ngay 30% cho đơn hàng của khách hàng đạt 15000k
                """);
        voucher3.setGiaTriVoucher(new BigDecimal(30));
        voucher3.setDieuKienApDung(new BigDecimal(15000000));
        voucher3.setGiaTriToiDa(new BigDecimal(3000000));
        voucher3.setSoLuong(1000);
        voucher3.setLoaiVoucher("%");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date ngayBatDau = null;
        Date ngayKetThuc = null;
        try {
            ngayBatDau = dateFormat.parse("20-05-2023");
            ngayKetThuc = dateFormat.parse("30-07-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher3.setTrangThai(3);
        voucher3.setNgayBatDau(ngayBatDau);
        voucher3.setNgayKetThuc(ngayKetThuc);
        voucher3.setId(voucherRepository.save(voucher3).getId());


        //Bảng Cấu hình
        CauHinh cauHinh = new CauHinh();
        cauHinh.setIdRam(ram);
        cauHinh.setIdRom(rom);
        cauHinh.setIdMauSac(mauSac);
        cauHinh.setId(cauHinhRepository.save(cauHinh).getId());

        CauHinh cauHinh1 = new CauHinh();
        cauHinh1.setIdRam(ram1);
        cauHinh1.setIdRom(rom1);
        cauHinh1.setIdMauSac(mauSac1);
        cauHinh1.setId(cauHinhRepository.save(cauHinh1).getId());

        CauHinh cauHinh2 = new CauHinh();
        cauHinh2.setIdRam(ram2);
        cauHinh2.setIdRom(rom2);
        cauHinh2.setIdMauSac(mauSac2);
        cauHinh2.setId(cauHinhRepository.save(cauHinh2).getId());

        //Bảng Chi tiết sản phẩm
        SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
        sanPhamChiTiet.setMa("CTSP1");
        sanPhamChiTiet.setDonGia(new BigDecimal(50000000));
        sanPhamChiTiet.setSoLuongTonKho(1000);
        sanPhamChiTiet.setIdSanPham(sanPham);
        sanPhamChiTiet.setIdCauHinh(cauHinh);
        sanPhamChiTiet.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet).getId());

        SanPhamChiTiet sanPhamChiTiet1 = new SanPhamChiTiet();
        sanPhamChiTiet1.setMa("CTSP13");
        sanPhamChiTiet1.setDonGia(new BigDecimal(60000000));
        sanPhamChiTiet1.setSoLuongTonKho(3000);
        sanPhamChiTiet1.setIdSanPham(sanPham1);
        sanPhamChiTiet1.setIdCauHinh(cauHinh1);
        sanPhamChiTiet1.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet1).getId());

        SanPhamChiTiet sanPhamChiTiet2 = new SanPhamChiTiet();
        sanPhamChiTiet2.setMa("CTSP14");
        sanPhamChiTiet2.setDonGia(new BigDecimal(40000000));
        sanPhamChiTiet2.setSoLuongTonKho(2000);
        sanPhamChiTiet2.setIdSanPham(sanPham2);
        sanPhamChiTiet2.setIdCauHinh(cauHinh2);
        sanPhamChiTiet2.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet2).getId());

        //Bảng Ảnh
        Anh anh = new Anh();
        anh.setMa("ảnh1");
        anh.setTenAnh("Ảnh SamSung");
        anh.setIdSanPhamChiTiet(sanPhamChiTiet);
        anh.setDuongDan("https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/v/_/v_ng_20.png");
        anh.setTrangThai(true);
        anh.setId(anhRepository.save(anh).getId());

        Anh anh1 = new Anh();
        anh1.setMa("ảnh2");
        anh1.setTenAnh("Ảnh Iphone");
        anh1.setIdSanPhamChiTiet(sanPhamChiTiet1);
        anh1.setDuongDan("https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m-iphone-14-pro_2.png");
        anh1.setTrangThai(true);
        anh1.setId(anhRepository.save(anh1).getId());

        Anh anh2 = new Anh();
        anh2.setMa("ảnh3");
        anh2.setTenAnh("Ảnh Xiaomi");
        anh2.setIdSanPhamChiTiet(sanPhamChiTiet2);
        anh2.setDuongDan("https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/v/_/v_ng_20.png");
        anh2.setTrangThai(true);
        anh2.setId(anhRepository.save(anh2).getId());

        //Bảng Imei
        Imei imei = new Imei();
        imei.setSoImei("167291376811223");
        imei.setTrangThai(1);
        imei.setIdSanPhamChiTiet(sanPhamChiTiet);
        imei.setId(imeiRepository.save(imei).getId());

        Imei imei1 = new Imei();
        imei1.setSoImei("112511376811223");
        imei1.setTrangThai(1);
        imei1.setIdSanPhamChiTiet(sanPhamChiTiet1);
        imei1.setId(imeiRepository.save(imei1).getId());

        Imei imei2 = new Imei();
        imei2.setSoImei("197291376811223");
        imei2.setTrangThai(1);
        imei2.setIdSanPhamChiTiet(sanPhamChiTiet2);
        imei2.setId(imeiRepository.save(imei2).getId());
    }



    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }
}
