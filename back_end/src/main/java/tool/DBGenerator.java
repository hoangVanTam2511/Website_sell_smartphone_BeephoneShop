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
        nhanVien.setMa("role1");
        nhanVien.setTen("Nhân Viên");
        nhanVien.setId(roleRepository.save(nhanVien).getId());

        Role chuCuaHang = new Role();
        chuCuaHang.setMa("role2");
        chuCuaHang.setTen("Khách Hàng");
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
        mauSac.setTenMauSac("YELLOW");
        mauSac.setId(mauSacRepository.save(mauSac).getId());

        MauSac mauSac1 = new MauSac();
        mauSac1.setMa("MauSac12");
        mauSac1.setTenMauSac("SLIVER");
        mauSac1.setId(mauSacRepository.save(mauSac1).getId());

        MauSac mauSac2 = new MauSac();
        mauSac2.setMa("MauSac13");
        mauSac2.setTenMauSac("BLACK");
        mauSac2.setId(mauSacRepository.save(mauSac2).getId());

        MauSac mauSac3 = new MauSac();
        mauSac3.setMa("MauSac13");
        mauSac3.setTenMauSac("BLUE");
        mauSac3.setId(mauSacRepository.save(mauSac3).getId());

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
        ram.setKichThuoc(6);
        ram.setId(ramRepository.save(ram).getId());

        Ram ram1 = new Ram();
        ram1.setMa("ram013");
        ram1.setKichThuoc(6);
        ram1.setId(ramRepository.save(ram1).getId());

        Ram ram2 = new Ram();
        ram2.setMa("ram012");
        ram2.setKichThuoc(6);
        ram2.setId(ramRepository.save(ram2).getId());

        Ram ram3 = new Ram();
        ram3.setMa("ram0123");
        ram3.setKichThuoc(6);
        ram3.setId(ramRepository.save(ram3).getId());

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

        Rom rom3 = new Rom();
        rom3.setMa("Rom0153");
        rom3.setKichThuoc(1024);
        rom3.setId(romRepository.save(rom3).getId());

        //bảng sản phẩm
        SanPham sanPham = new SanPham();
        sanPham.setMa("SanPham01");
        sanPham.setTenSanPham("Iphone 14 Pro");
        sanPham.setSim(2);
        sanPham.setCongSac("Type C");
        sanPham.setHeDieuHanh("IOS");
        sanPham.setMoTa("""
                Samsung Galaxy S22 là bước nhảy vọt trong công nghệ video trên thế hệ di động. 
                Đồng thời, điện thoại cũng mở ra loạt cải tiến đột phá hàng đầu hiện nay từ màn hình vát phẳng “nịnh” mắt đến bộ xử lý 4nm tiên tiến đầu tiên trên thế hệ smartphone Samsung. 
                """);
        sanPham.setChip(chip);
        sanPham.setDongSanPham(dongSanPham);
        sanPham.setNhaSanXuat(nhaSanXuat);
        sanPham.setManHinh(manHinh);
        sanPham.setPin(pin);
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
        sanPham1.setChip(chip2);
        sanPham1.setDongSanPham(dongSanPham2);
        sanPham1.setNhaSanXuat(nhaSanXuat2);
        sanPham1.setManHinh(manHinh2);
        sanPham1.setPin(pin2);
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
        sanPham2.setChip(chip3);
        sanPham2.setDongSanPham(dongSanPham3);
        sanPham2.setNhaSanXuat(nhaSanXuat1);
        sanPham2.setManHinh(manHinh1);
        sanPham2.setPin(pin1);
        sanPham2.setId(sanPhamRepository.save(sanPham2).getId());

        //Bảng khuyến mại
        KhuyenMai khuyenMai = new KhuyenMai();
        khuyenMai.setMa("KhuyenMai1");
        khuyenMai.setTenKhuyenMai("FPT Shop giảm ngay 250K khi khách hàng mua laptop hoặc MacBook có giá từ 8 triệu đồng");
        khuyenMai.setGiaTriKhuyenMai(new BigDecimal(250000));
        khuyenMai.setLoaiKhuyenMai("VNĐ");
        SimpleDateFormat dateFormat5 = new SimpleDateFormat("dd-MM-yyyy");
//        Date ngayBatDau5 = null;
        Date ngayKetThuc5 = null;
        try {
//            ngayBatDau5 = dateFormat5.parse("20-05-2023");
            ngayKetThuc5 = dateFormat5.parse("10-12-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        khuyenMai.setNgayBatDau(new Date());
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
            ngayBatDau7 = dateFormat7.parse("20-05-2024");
            ngayKetThuc7 = dateFormat7.parse("30-07-2024");
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
//        Date ngayBatDau1 = null;
        Date ngayKetThuc1 = null;
        try {
//            ngayBatDau1 = dateFormat1.parse("20-05-2023");
            ngayKetThuc1 = dateFormat1.parse("20-12-2023");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        voucher.setNgayBatDau(new Date());
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
            ngayBatDau2 = dateFormat2.parse("20-05-2024");
            ngayKetThuc2 = dateFormat2.parse("30-07-2024");
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
        cauHinh.setRam(ram);
        cauHinh.setRom(rom);
        cauHinh.setMauSac(mauSac);
        cauHinh.setId(cauHinhRepository.save(cauHinh).getId());

        CauHinh cauHinh1 = new CauHinh();
        cauHinh1.setRam(ram);
        cauHinh1.setRom(rom);
        cauHinh1.setMauSac(mauSac1);
        cauHinh1.setId(cauHinhRepository.save(cauHinh1).getId());

        CauHinh cauHinh2 = new CauHinh();
        cauHinh2.setRam(ram);
        cauHinh2.setRom(rom);
        cauHinh2.setMauSac(mauSac2);
        cauHinh2.setId(cauHinhRepository.save(cauHinh2).getId());

        CauHinh cauHinh3 = new CauHinh();
        cauHinh3.setRam(ram);
        cauHinh3.setRom(rom);
        cauHinh3.setMauSac(mauSac3);
        cauHinh3.setId(cauHinhRepository.save(cauHinh3).getId());

        //Bảng Cấu hình 1
        CauHinh cauHinh4 = new CauHinh();
        cauHinh4.setRam(ram);
        cauHinh4.setRom(rom1);
        cauHinh4.setMauSac(mauSac);
        cauHinh4.setId(cauHinhRepository.save(cauHinh4).getId());

        CauHinh cauHinh5 = new CauHinh();
        cauHinh5.setRam(ram);
        cauHinh5.setRom(rom1);
        cauHinh5.setMauSac(mauSac1);
        cauHinh5.setId(cauHinhRepository.save(cauHinh5).getId());

        CauHinh cauHinh6 = new CauHinh();
        cauHinh6.setRam(ram);
        cauHinh6.setRom(rom1);
        cauHinh6.setMauSac(mauSac2);
        cauHinh6.setId(cauHinhRepository.save(cauHinh6).getId());

        CauHinh cauHinh7 = new CauHinh();
        cauHinh7.setRam(ram);
        cauHinh7.setRom(rom1);
        cauHinh7.setMauSac(mauSac3);
        cauHinh7.setId(cauHinhRepository.save(cauHinh7).getId());

        //Bảng Cấu hình 2
        CauHinh cauHinh8 = new CauHinh();
        cauHinh8.setRam(ram);
        cauHinh8.setRom(rom2);
        cauHinh8.setMauSac(mauSac);
        cauHinh8.setId(cauHinhRepository.save(cauHinh8).getId());

        CauHinh cauHinh9 = new CauHinh();
        cauHinh9.setRam(ram);
        cauHinh9.setRom(rom2);
        cauHinh9.setMauSac(mauSac1);
        cauHinh9.setId(cauHinhRepository.save(cauHinh9).getId());

        CauHinh cauHinh10 = new CauHinh();
        cauHinh10.setRam(ram);
        cauHinh10.setRom(rom2);
        cauHinh10.setMauSac(mauSac2);
        cauHinh10.setId(cauHinhRepository.save(cauHinh10).getId());

        CauHinh cauHinh11 = new CauHinh();
        cauHinh11.setRam(ram);
        cauHinh11.setRom(rom2);
        cauHinh11.setMauSac(mauSac3);
        cauHinh11.setId(cauHinhRepository.save(cauHinh11).getId());

        //Bảng Cấu hình 3
        CauHinh cauHinh12 = new CauHinh();
        cauHinh12.setRam(ram);
        cauHinh12.setRom(rom3);
        cauHinh12.setMauSac(mauSac);
        cauHinh12.setId(cauHinhRepository.save(cauHinh12).getId());

        CauHinh cauHinh13 = new CauHinh();
        cauHinh13.setRam(ram);
        cauHinh13.setRom(rom3);
        cauHinh13.setMauSac(mauSac1);
        cauHinh13.setId(cauHinhRepository.save(cauHinh13).getId());

        CauHinh cauHinh14 = new CauHinh();
        cauHinh14.setRam(ram);
        cauHinh14.setRom(rom3);
        cauHinh14.setMauSac(mauSac2);
        cauHinh14.setId(cauHinhRepository.save(cauHinh14).getId());

        CauHinh cauHinh15 = new CauHinh();
        cauHinh15.setRam(ram);
        cauHinh15.setRom(rom3);
        cauHinh15.setMauSac(mauSac3);
        cauHinh15.setId(cauHinhRepository.save(cauHinh15).getId());

        //Bảng Chi tiết sản phẩm
        SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
        sanPhamChiTiet.setMa("CTSP1");
        sanPhamChiTiet.setDonGia(new BigDecimal(26390000));
        sanPhamChiTiet.setSoLuongTonKho(10);
        sanPhamChiTiet.setSanPham(sanPham);
        sanPhamChiTiet.setCauHinh(cauHinh);
        sanPhamChiTiet.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet).getId());

        SanPhamChiTiet sanPhamChiTiet1 = new SanPhamChiTiet();
        sanPhamChiTiet1.setMa("CTSP1");
        sanPhamChiTiet1.setDonGia(new BigDecimal(26390000));
        sanPhamChiTiet1.setSoLuongTonKho(10);
        sanPhamChiTiet1.setSanPham(sanPham);
        sanPhamChiTiet1.setCauHinh(cauHinh1);
        sanPhamChiTiet1.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet1).getId());

        SanPhamChiTiet sanPhamChiTiet2 = new SanPhamChiTiet();
        sanPhamChiTiet2.setMa("CTSP1");
        sanPhamChiTiet2.setDonGia(new BigDecimal(26390000));
        sanPhamChiTiet2.setSoLuongTonKho(10);
        sanPhamChiTiet2.setSanPham(sanPham);
        sanPhamChiTiet2.setCauHinh(cauHinh2);
        sanPhamChiTiet2.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet2).getId());

        SanPhamChiTiet sanPhamChiTiet3 = new SanPhamChiTiet();
        sanPhamChiTiet3.setMa("CTSP1");
        sanPhamChiTiet3.setDonGia(new BigDecimal(26390000));
        sanPhamChiTiet3.setSoLuongTonKho(10);
        sanPhamChiTiet3.setSanPham(sanPham);
        sanPhamChiTiet3.setCauHinh(cauHinh3);
        sanPhamChiTiet3.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet3).getId());

        // sanPhamChiTiet Lan 2
        SanPhamChiTiet sanPhamChiTiet4 = new SanPhamChiTiet();
        sanPhamChiTiet4.setMa("CTSP2");
        sanPhamChiTiet4.setDonGia(new BigDecimal(35190000));
        sanPhamChiTiet4.setSoLuongTonKho(20);
        sanPhamChiTiet4.setSanPham(sanPham);
        sanPhamChiTiet4.setCauHinh(cauHinh4);
        sanPhamChiTiet4.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet4).getId());

        SanPhamChiTiet sanPhamChiTiet5 = new SanPhamChiTiet();
        sanPhamChiTiet5.setMa("CTSP2");
        sanPhamChiTiet5.setDonGia(new BigDecimal(35190000));
        sanPhamChiTiet5.setSoLuongTonKho(20);
        sanPhamChiTiet5.setSanPham(sanPham);
        sanPhamChiTiet5.setCauHinh(cauHinh5);
        sanPhamChiTiet5.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet5).getId());

        SanPhamChiTiet sanPhamChiTiet6 = new SanPhamChiTiet();
        sanPhamChiTiet6.setMa("CTSP2");
        sanPhamChiTiet6.setDonGia(new BigDecimal(35190000));
        sanPhamChiTiet6.setSoLuongTonKho(20);
        sanPhamChiTiet6.setSanPham(sanPham);
        sanPhamChiTiet6.setCauHinh(cauHinh6);
        sanPhamChiTiet6.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet6).getId());

        SanPhamChiTiet sanPhamChiTiet7 = new SanPhamChiTiet();
        sanPhamChiTiet7.setMa("CTSP2");
        sanPhamChiTiet7.setDonGia(new BigDecimal(35190000));
        sanPhamChiTiet7.setSoLuongTonKho(20);
        sanPhamChiTiet7.setSanPham(sanPham);
        sanPhamChiTiet7.setCauHinh(cauHinh7);
        sanPhamChiTiet7.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet7).getId());

        // sanPhamChiTiet Lan 3
        SanPhamChiTiet sanPhamChiTiet8 = new SanPhamChiTiet();
        sanPhamChiTiet8.setMa("CTSP3");
        sanPhamChiTiet8.setDonGia(new BigDecimal(41790000));
        sanPhamChiTiet8.setSoLuongTonKho(50);
        sanPhamChiTiet8.setSanPham(sanPham);
        sanPhamChiTiet8.setCauHinh(cauHinh8);
        sanPhamChiTiet8.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet8).getId());

        SanPhamChiTiet sanPhamChiTiet9 = new SanPhamChiTiet();
        sanPhamChiTiet9.setMa("CTSP3");
        sanPhamChiTiet9.setDonGia(new BigDecimal(41790000));
        sanPhamChiTiet9.setSoLuongTonKho(50);
        sanPhamChiTiet9.setSanPham(sanPham);
        sanPhamChiTiet9.setCauHinh(cauHinh9);
        sanPhamChiTiet9.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet9).getId());

        SanPhamChiTiet sanPhamChiTiet10 = new SanPhamChiTiet();
        sanPhamChiTiet10.setMa("CTSP3");
        sanPhamChiTiet10.setDonGia(new BigDecimal(41790000));
        sanPhamChiTiet10.setSoLuongTonKho(50);
        sanPhamChiTiet10.setSanPham(sanPham);
        sanPhamChiTiet10.setCauHinh(cauHinh10);
        sanPhamChiTiet10.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet10).getId());

        SanPhamChiTiet sanPhamChiTiet11 = new SanPhamChiTiet();
        sanPhamChiTiet11.setMa("CTSP3");
        sanPhamChiTiet11.setDonGia(new BigDecimal(41790000));
        sanPhamChiTiet11.setSoLuongTonKho(50);
        sanPhamChiTiet11.setSanPham(sanPham);
        sanPhamChiTiet11.setCauHinh(cauHinh11);
        sanPhamChiTiet11.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet11).getId());

        // sanPhamChiTiet Lan 4
        SanPhamChiTiet sanPhamChiTiet12 = new SanPhamChiTiet();
        sanPhamChiTiet12.setMa("CTSP4");
        sanPhamChiTiet12.setDonGia(new BigDecimal(50000000));
        sanPhamChiTiet12.setSoLuongTonKho(70);
        sanPhamChiTiet12.setSanPham(sanPham);
        sanPhamChiTiet12.setCauHinh(cauHinh12);
        sanPhamChiTiet12.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet12).getId());

        SanPhamChiTiet sanPhamChiTiet13 = new SanPhamChiTiet();
        sanPhamChiTiet13.setMa("CTSP4");
        sanPhamChiTiet13.setDonGia(new BigDecimal(50000000));
        sanPhamChiTiet13.setSoLuongTonKho(70);
        sanPhamChiTiet13.setSanPham(sanPham);
        sanPhamChiTiet13.setCauHinh(cauHinh13);
        sanPhamChiTiet13.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet13).getId());

        SanPhamChiTiet sanPhamChiTiet14 = new SanPhamChiTiet();
        sanPhamChiTiet14.setMa("CTSP4");
        sanPhamChiTiet14.setDonGia(new BigDecimal(50000000));
        sanPhamChiTiet14.setSoLuongTonKho(70);
        sanPhamChiTiet14.setSanPham(sanPham);
        sanPhamChiTiet14.setCauHinh(cauHinh14);
        sanPhamChiTiet14.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet14).getId());

        SanPhamChiTiet sanPhamChiTiet15 = new SanPhamChiTiet();
        sanPhamChiTiet15.setMa("CTSP4");
        sanPhamChiTiet15.setDonGia(new BigDecimal(50000000));
        sanPhamChiTiet15.setSoLuongTonKho(70);
        sanPhamChiTiet15.setSanPham(sanPham);
        sanPhamChiTiet15.setCauHinh(cauHinh15);
        sanPhamChiTiet15.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet15).getId());

//        SanPhamChiTiet sanPhamChiTiet1 = new SanPhamChiTiet();
//        sanPhamChiTiet1.setMa("CTSP13");
//        sanPhamChiTiet1.setDonGia(new BigDecimal(60000000));
//        sanPhamChiTiet1.setSoLuongTonKho(3000);
//        sanPhamChiTiet1.setSanPham(sanPham1);
//        sanPhamChiTiet1.setCauHinh(cauHinh1);
//        sanPhamChiTiet1.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet1).getId());
//
//        SanPhamChiTiet sanPhamChiTiet2 = new SanPhamChiTiet();
//        sanPhamChiTiet2.setMa("CTSP14");
//        sanPhamChiTiet2.setDonGia(new BigDecimal(40000000));
//        sanPhamChiTiet2.setSoLuongTonKho(2000);
//        sanPhamChiTiet2.setSanPham(sanPham2);
//        sanPhamChiTiet2.setCauHinh(cauHinh2);
//        sanPhamChiTiet2.setId(iSanPhamChiTietRepository.save(sanPhamChiTiet2).getId());

        //Bảng Ảnh
        Anh anh = new Anh();
        anh.setMa("ảnh1");
        anh.setTenAnh("Ảnh Iphone");
        anh.setSanPhamChiTiet(sanPhamChiTiet);
        anh.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_18_1.png");
        anh.setTrangThai(true);
        anh.setId(anhRepository.save(anh).getId());

        Anh anh1 = new Anh();
        anh1.setMa("ảnh2");
        anh1.setTenAnh("Ảnh Iphone");
        anh1.setSanPhamChiTiet(sanPhamChiTiet1);
        anh1.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/b/_/b_c_1_10.png");
        anh1.setTrangThai(true);
        anh1.setId(anhRepository.save(anh1).getId());

        Anh anh2 = new Anh();
        anh2.setMa("ảnh3");
        anh2.setTenAnh("Ảnh Iphone");
        anh2.setSanPhamChiTiet(sanPhamChiTiet2);
        anh2.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh2.setTrangThai(true);
        anh2.setId(anhRepository.save(anh2).getId());

        Anh anh3 = new Anh();
        anh3.setMa("ảnh4");
        anh3.setTenAnh("Ảnh Iphone");
        anh3.setSanPhamChiTiet(sanPhamChiTiet3);
        anh3.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh3.setTrangThai(true);
        anh3.setId(anhRepository.save(anh3).getId());

        //Bảng Ảnh 1
        Anh anh4 = new Anh();
        anh4.setMa("ảnh1");
        anh4.setTenAnh("Ảnh Iphone");
        anh4.setSanPhamChiTiet(sanPhamChiTiet4);
        anh4.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_18_1.png");
        anh4.setTrangThai(true);
        anh4.setId(anhRepository.save(anh4).getId());

        Anh anh5 = new Anh();
        anh5.setMa("ảnh2");
        anh5.setTenAnh("Ảnh Iphone");
        anh5.setSanPhamChiTiet(sanPhamChiTiet5);
        anh5.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/b/_/b_c_1_10.png");
        anh5.setTrangThai(true);
        anh5.setId(anhRepository.save(anh5).getId());

        Anh anh6 = new Anh();
        anh6.setMa("ảnh3");
        anh6.setTenAnh("Ảnh Iphone");
        anh6.setSanPhamChiTiet(sanPhamChiTiet6);
        anh6.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh6.setTrangThai(true);
        anh6.setId(anhRepository.save(anh6).getId());

        Anh anh7 = new Anh();
        anh7.setMa("ảnh4");
        anh7.setTenAnh("Ảnh Iphone");
        anh7.setSanPhamChiTiet(sanPhamChiTiet7);
        anh7.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh7.setTrangThai(true);
        anh7.setId(anhRepository.save(anh7).getId());

        //Bảng Ảnh 2
        Anh anh8 = new Anh();
        anh8.setMa("ảnh1");
        anh8.setTenAnh("Ảnh Iphone");
        anh8.setSanPhamChiTiet(sanPhamChiTiet8);
        anh8.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_18_1.png");
        anh8.setTrangThai(true);
        anh8.setId(anhRepository.save(anh8).getId());

        Anh anh9 = new Anh();
        anh9.setMa("ảnh2");
        anh9.setTenAnh("Ảnh Iphone");
        anh9.setSanPhamChiTiet(sanPhamChiTiet9);
        anh9.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/b/_/b_c_1_10.png");
        anh9.setTrangThai(true);
        anh9.setId(anhRepository.save(anh9).getId());

        Anh anh10 = new Anh();
        anh10.setMa("ảnh3");
        anh10.setTenAnh("Ảnh Iphone");
        anh10.setSanPhamChiTiet(sanPhamChiTiet10);
        anh10.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh10.setTrangThai(true);
        anh10.setId(anhRepository.save(anh10).getId());

        Anh anh11 = new Anh();
        anh11.setMa("ảnh4");
        anh11.setTenAnh("Ảnh Iphone");
        anh11.setSanPhamChiTiet(sanPhamChiTiet11);
        anh11.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh11.setTrangThai(true);
        anh11.setId(anhRepository.save(anh11).getId());

        //Bảng Ảnh 3
        Anh anh12 = new Anh();
        anh12.setMa("ảnh1");
        anh12.setTenAnh("Ảnh Iphone");
        anh12.setSanPhamChiTiet(sanPhamChiTiet12);
        anh12.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_18_1.png");
        anh12.setTrangThai(true);
        anh12.setId(anhRepository.save(anh12).getId());

        Anh anh13 = new Anh();
        anh13.setMa("ảnh2");
        anh13.setTenAnh("Ảnh Iphone");
        anh13.setSanPhamChiTiet(sanPhamChiTiet13);
        anh13.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/b/_/b_c_1_10.png");
        anh13.setTrangThai(true);
        anh13.setId(anhRepository.save(anh13).getId());

        Anh anh14 = new Anh();
        anh14.setMa("ảnh3");
        anh14.setTenAnh("Ảnh Iphone");
        anh14.setSanPhamChiTiet(sanPhamChiTiet14);
        anh14.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh14.setTrangThai(true);
        anh14.setId(anhRepository.save(anh14).getId());

        Anh anh15 = new Anh();
        anh15.setMa("ảnh4");
        anh15.setTenAnh("Ảnh Iphone");
        anh15.setSanPhamChiTiet(sanPhamChiTiet15);
        anh15.setDuongDan("https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png");
        anh15.setTrangThai(true);
        anh15.setId(anhRepository.save(anh15).getId());

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
