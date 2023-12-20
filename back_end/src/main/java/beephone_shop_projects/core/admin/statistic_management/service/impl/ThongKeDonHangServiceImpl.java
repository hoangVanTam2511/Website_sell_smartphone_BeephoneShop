package beephone_shop_projects.core.admin.statistic_management.service.impl;

import beephone_shop_projects.core.admin.statistic_management.model.request.FindByMonthAndYearRequest;
import beephone_shop_projects.core.admin.statistic_management.model.request.ThongKeKhoangNgayDonHangRequest;
import beephone_shop_projects.core.admin.statistic_management.model.response.*;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeDonHangRepository;
import beephone_shop_projects.core.admin.statistic_management.repository.ThongKeSanPhamRepository;
import beephone_shop_projects.core.admin.statistic_management.service.ThongKeDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class ThongKeDonHangServiceImpl implements ThongKeDonHangService {

    @Autowired
    private ThongKeDonHangRepository thongKeDonHangRepository;

    @Autowired
    private ThongKeSanPhamRepository thongKeSanPhamRepository;

    @Override
    public ThongKeDonHangResponse getDonHangAll() {
        return thongKeDonHangRepository.getDonHangAll();
    }

    @Override
    public ThongKeDonHangResponse getDonHangAllTheoNam(FindByMonthAndYearRequest request) {
        return thongKeDonHangRepository.getDonHangAllTheoNam(request);
    }

    @Override
    public ThongKeDonHangResponse getDonHangInMonth() {
        return thongKeDonHangRepository.getDonHangInMonth();
    }

    @Override
    public ThongKeDonHangResponse getDonHangInDay() {
        return thongKeDonHangRepository.getDonHangInDay();
    }

    @Override
    public List<ThongKeDonHangKhoangNgay> getDonHangKhoangNgay(ThongKeKhoangNgayDonHangRequest request) {
        return thongKeDonHangRepository.getDonHangKhoangNgay(request);
    }

    @Override
    public ThongKeTocDoTangTruongCustom getTocDoTangTruongCuaHang() {
        ThongKeTocDoTangTruongCustom thongKeTocDoTangTruongCustom = new ThongKeTocDoTangTruongCustom();

        ThongKeDonHangResponse donHangInDay = thongKeDonHangRepository.getDonHangInDay();
        ThongKeDonHangResponse donHangInYesterday = thongKeDonHangRepository.getDonHangInYesterday();
        ThongKeDonHangResponse donHangInMonth = thongKeDonHangRepository.getDonHangInMonth();
        ThongKeDonHangResponse donHangLastMonth = thongKeDonHangRepository.getDonHangLastMonth();
        ThongKeDonHangResponse donHangInYear = thongKeDonHangRepository.getDonHangInYear();
        ThongKeDonHangResponse donHangLastYear = thongKeDonHangRepository.getDonHangLastYear();
        ThongKeSanPhamResponse sanPhamInMonth = thongKeSanPhamRepository.getSanPhamInMonth();
        ThongKeSanPhamResponse sanPhamLastMonth = thongKeSanPhamRepository.getSanPhamLastMonth();

        BigDecimal zero = BigDecimal.ZERO;

        BigDecimal tangTruongDoanhThuNgay = BigDecimal.ZERO;
        BigDecimal tangTruongDoanhThuThang = BigDecimal.ZERO;
        BigDecimal tangTruongDoanhThuNam = BigDecimal.ZERO;
        BigDecimal tangTruongSoHoaDonNgay = BigDecimal.ZERO;
        BigDecimal tangTruongSoHoaDonThang = BigDecimal.ZERO;
        BigDecimal tangTruongSoHoaDonNam = BigDecimal.ZERO;
        BigDecimal tangTruongSoSanPhamThang = BigDecimal.ZERO;

        BigDecimal doanhThuNgay = BigDecimal.ZERO;
        BigDecimal doanhThuThang = BigDecimal.ZERO;
        BigDecimal doanhThuNam = BigDecimal.ZERO;
        Integer soHoaDonNgay = 0;
        Integer soHoaDonThang = 0;
        Integer soHoaDonNam = 0;
        Integer soSanPhamThang = 0;

        if (donHangInYesterday != null && donHangInYesterday.getTongTien() != null && donHangInYesterday.getTongTien().compareTo(zero) != 0 ) {
            tangTruongDoanhThuNgay = donHangInDay.getTongTien().subtract(donHangInYesterday.getTongTien())
                    .divide(donHangInYesterday.getTongTien(), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if (donHangInDay != null){
            doanhThuNgay = donHangInDay.getTongTien();
        }

        if (donHangLastMonth != null && donHangLastMonth.getTongTien() != null &&
                donHangLastMonth.getTongTien().compareTo(zero) != 0) {
            tangTruongDoanhThuThang = donHangInMonth.getTongTien().subtract(donHangLastMonth.getTongTien())
                    .divide(donHangLastMonth.getTongTien(), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(donHangInMonth != null){
            doanhThuThang = donHangInMonth.getTongTien();
        }

        if (donHangLastYear != null && donHangLastYear.getTongTien() != null &&
                donHangLastYear.getTongTien().compareTo(zero) != 0) {
            tangTruongDoanhThuNam = donHangInYear.getTongTien().subtract(donHangLastYear.getTongTien())
                    .divide(donHangLastYear.getTongTien(), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(donHangInYear != null){
            doanhThuNam = donHangInYear.getTongTien();
        }

        if (donHangInYesterday != null && donHangInYesterday.getSoLuong() != null &&
                donHangInYesterday.getSoLuong() != 0) {
            tangTruongSoHoaDonNgay = BigDecimal.valueOf(donHangInDay.getSoLuong() - donHangInYesterday.getSoLuong())
                    .divide(BigDecimal.valueOf(donHangInYesterday.getSoLuong()), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(donHangInDay != null){
            soHoaDonNgay = donHangInDay.getSoLuong();
        }

        if (donHangLastMonth != null && donHangLastMonth.getSoLuong() != null &&
                donHangLastMonth.getSoLuong() != 0) {
            tangTruongSoHoaDonThang = BigDecimal.valueOf(donHangInMonth.getSoLuong() - donHangLastMonth.getSoLuong())
                    .divide(BigDecimal.valueOf(donHangLastMonth.getSoLuong()), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(donHangInMonth != null){
            soHoaDonThang = donHangInMonth.getSoLuong();
        }

        if (donHangLastYear != null && donHangLastYear.getSoLuong() != null &&
                donHangLastYear.getSoLuong() != 0) {
            tangTruongSoHoaDonNam = BigDecimal.valueOf(donHangInYear.getSoLuong() - donHangLastYear.getSoLuong())
                    .divide(BigDecimal.valueOf(donHangLastYear.getSoLuong()), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(donHangInYear != null){
            soHoaDonNam = donHangInYear.getSoLuong();
        }

        if (sanPhamLastMonth != null && sanPhamLastMonth.getSoLuong() != null &&
                sanPhamLastMonth.getSoLuong() != 0) {
            tangTruongSoSanPhamThang = BigDecimal.valueOf(sanPhamInMonth.getSoLuong() - sanPhamLastMonth.getSoLuong())
                    .divide(BigDecimal.valueOf(sanPhamLastMonth.getSoLuong()), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        if(sanPhamInMonth != null){
            soSanPhamThang = sanPhamInMonth.getSoLuong();
        }

        thongKeTocDoTangTruongCustom.setDoanhThuNgay(doanhThuNgay);
        thongKeTocDoTangTruongCustom.setTangTruongDoanhThuNgay(tangTruongDoanhThuNgay);
        thongKeTocDoTangTruongCustom.setDoanhThuThang(doanhThuThang);
        thongKeTocDoTangTruongCustom.setTangTruongDoanhThuThang(tangTruongDoanhThuThang);
        thongKeTocDoTangTruongCustom.setDoanhThuNam(doanhThuNam);
        thongKeTocDoTangTruongCustom.setTangTruongDoanhThuNam(tangTruongDoanhThuNam);
        thongKeTocDoTangTruongCustom.setSoHoaDonNgay(soHoaDonNgay);
        thongKeTocDoTangTruongCustom.setTangTruongSoHoaDonNgay(tangTruongSoHoaDonNgay);
        thongKeTocDoTangTruongCustom.setSoHoaDonThang(soHoaDonThang);
        thongKeTocDoTangTruongCustom.setTangTruongSoHoaDonThang(tangTruongSoHoaDonThang);
        thongKeTocDoTangTruongCustom.setSoHoaDonNam(soHoaDonNam);
        thongKeTocDoTangTruongCustom.setTangTruongSoHoaDonNam(tangTruongSoHoaDonNam);
        thongKeTocDoTangTruongCustom.setSoSanPhamThang(soSanPhamThang);
        thongKeTocDoTangTruongCustom.setTangTruongSoSanPhamThang(tangTruongSoSanPhamThang);

        return thongKeTocDoTangTruongCustom;
    }


    @Override
    public List<ThongKeTrangThaiDonHang> getAllTrangThaiDonHang(String chonTheo) {
        return thongKeDonHangRepository.getAllTrangThaiDonHang(chonTheo);
    }


}
