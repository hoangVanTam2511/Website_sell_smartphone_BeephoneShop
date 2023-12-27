package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.*;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindSanPhamKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.repository.SanPhamChiTietKhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamChiTietKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SanPhamChiTietKhuyenMaiServiceImpl implements SanPhamChiTietKhuyenMaiService {

    private CopyOnWriteArrayList<SanPhamChiTietKhuyenMaiResponse> listAo = new CopyOnWriteArrayList<>();


    @Autowired
    private SanPhamChiTietKhuyenMaiRepository sanPhamChiTietKhuyenMaiRepository;

    @Override
    public List<SanPhamChiTietKhuyenMaiResponseCustom> getAllSanPhamChiTietKhuyenMai(String id, Boolean check) {
        List<SanPhamChiTietKhuyenMaiResponseCustom> listResult = new ArrayList<>();
        List<SanPhamChiTietKhuyenMaiResponse> listPhanTu = new ArrayList<>();
        List<SanPhamChiTietKhuyenMaiResponse> result = sanPhamChiTietKhuyenMaiRepository.findAllChiTietSanPham(id);

        if (check == true) {
            // Thêm tất cả phần tử từ result vào listAo
            listAo.addAll(result);

            // Duyệt qua listAo và xóa các phần tử trùng lặp
            Set<String> uniqueIds = new HashSet<>();
            listAo.removeIf(sp -> !uniqueIds.add(sp.getId()));
            for (SanPhamChiTietKhuyenMaiResponse sp : listAo) {
                SanPhamChiTietKhuyenMaiResponseCustom responseCustom = new SanPhamChiTietKhuyenMaiResponseCustom();
                responseCustom.setId(sp.getId());
                responseCustom.setDuongDan(sp.getDuongDan());
                responseCustom.setTenSanPham(sp.getTenSanPham());
                responseCustom.setTenMauSac(sp.getTenMauSac());
                responseCustom.setKichThuocRam(sp.getKichThuocRam());
                responseCustom.setKichThuocRom(sp.getKichThuocRom());
                responseCustom.setDonGia(sp.getDonGia());
                responseCustom.setDelected(sp.getDelected());
                responseCustom.setIdSanPham(sp.getIdSanPham());
                List<KhuyenMaiChiTietResponse> kmct = sanPhamChiTietKhuyenMaiRepository.getListKhuyenMai(sp.getId());
                responseCustom.setKhuyenMaiChiTietResponse(kmct);
                responseCustom.setSize(kmct.size());
                BigDecimal tong = BigDecimal.ZERO;
                for (KhuyenMaiChiTietResponse km : kmct) {

                    String loaiKhuyenMai = km.getLoaiKhuyenMai();
                    BigDecimal giaTriKhuyenMai = km.getGiaTriKhuyenMai();
                    BigDecimal donGiaKhuyenMai = km.getDonGia();
                    BigDecimal chuyenDoi = BigDecimal.ZERO;
                    if (loaiKhuyenMai.equals("0")) {
                        chuyenDoi = giaTriKhuyenMai;
                    } else if (loaiKhuyenMai.equals("1")) {
                        chuyenDoi = giaTriKhuyenMai;
                    }
                    tong = tong.add(chuyenDoi);
                    responseCustom.setTong(tong);
                }
                if (kmct.size() > 0) {
                    responseCustom.setGiaTriKhuyenMai(tong.divide(new BigDecimal(kmct.size()), 0, RoundingMode.HALF_UP));
                }
                listResult.add(responseCustom);
            }
            return listResult;
        }
        if (check == false) {
            List<SanPhamChiTietKhuyenMaiResponse> itemsToRemove = new ArrayList<>();

            for (SanPhamChiTietKhuyenMaiResponse item : result) {
                for (SanPhamChiTietKhuyenMaiResponse uniqueItem : listAo) {
                    if (uniqueItem.getIdSanPham().equals(item.getIdSanPham())) {
                        itemsToRemove.add(uniqueItem);
                    }
                }
            }
            listAo.removeAll(itemsToRemove);
            for (SanPhamChiTietKhuyenMaiResponse sp : listAo) {
                SanPhamChiTietKhuyenMaiResponseCustom responseCustom = new SanPhamChiTietKhuyenMaiResponseCustom();
                responseCustom.setId(sp.getId());
                responseCustom.setDuongDan(sp.getDuongDan());
                responseCustom.setTenSanPham(sp.getTenSanPham());
                responseCustom.setTenMauSac(sp.getTenMauSac());
                responseCustom.setKichThuocRam(sp.getKichThuocRam());
                responseCustom.setKichThuocRom(sp.getKichThuocRom());
                responseCustom.setDonGia(sp.getDonGia());
                responseCustom.setDelected(sp.getDelected());
                responseCustom.setIdSanPham(sp.getIdSanPham());
                List<KhuyenMaiChiTietResponse> kmct = sanPhamChiTietKhuyenMaiRepository.getListKhuyenMai(sp.getId());
                responseCustom.setKhuyenMaiChiTietResponse(kmct);
                responseCustom.setSize(kmct.size());
                listResult.add(responseCustom);
            }

        }
        return listResult;
    }

    @Override
    public List<SanPhamChiTietKhuyenMaiResponse> removeALL() {
        listAo.clear();
        return listAo;
    }

    @Override
    public List<SanPhamChiTietSauKhuyenMaiResponse> getOne(String id) {
        return sanPhamChiTietKhuyenMaiRepository.getOneChiTietSanPham(id);
    }

    @Override
    public List<KhuyenMaiChiTietResponse> getListKhuyenMai(String id) {
        return sanPhamChiTietKhuyenMaiRepository.getListKhuyenMai(id);
    }

    @Override
    public List<DetailKhuyenMaiResponse> getDetailKhuyenMai(String id) {
        return sanPhamChiTietKhuyenMaiRepository.getDetailKhuyenMai(id);
    }

    @Override
    public Integer getSize(String id) {
        Integer size = 0;
        List<KhuyenMaiChiTietResponse> kmct = sanPhamChiTietKhuyenMaiRepository.getListKhuyenMai(id);
        size = kmct.size();
        return size;
    }

}
