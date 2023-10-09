package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.*;
import beephone_shop_projects.core.admin.promotion_management.repository.SanPhamChiTietKhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamChiTietKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class SanPhamChiTietKhuyenMaiServiceImpl implements SanPhamChiTietKhuyenMaiService {

    List<SanPhamChiTietKhuyenMaiResponse> listAo = new ArrayList<>();

    @Autowired
    private SanPhamChiTietKhuyenMaiRepository sanPhamChiTietKhuyenMaiRepository;

    @Override
    public List<SanPhamChiTietKhuyenMaiResponseCustom> getAllSanPhamChiTietKhuyenMai(String id, Boolean check) {
        List<SanPhamChiTietKhuyenMaiResponse> result = sanPhamChiTietKhuyenMaiRepository.findAllChiTietSanPham(id);
        List<SanPhamChiTietKhuyenMaiResponseCustom> listResult = new ArrayList<>();
        BigDecimal tong = BigDecimal.ZERO;
        if (check == true) {
            listAo.addAll(result);
            for (int i = 0; i < listAo.size(); i++) {
                for (int j = i + 1; j < listAo.size(); j++) {
                    if (listAo.get(i).getId().equals(listAo.get(j).getId())) {
                        listAo.remove(j);
                        j--;
                    }
                }
            }
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
                List<KhuyenMaiChiTietResponse> kmct = sanPhamChiTietKhuyenMaiRepository.getListKhuyenMai(sp.getId());
                responseCustom.setKhuyenMaiChiTietResponse(kmct);
                responseCustom.setSize(kmct.size());
                listResult.add(responseCustom);
                for (KhuyenMaiChiTietResponse km : kmct) {
                    String loaiKhuyenMai = km.getLoaiKhuyenMai();
                    BigDecimal giaTriKhuyenMai = km.getGiaTriKhuyenMai();
                    BigDecimal donGiaKhuyenMai = km.getDonGia();
                    BigDecimal chuyenDoi = BigDecimal.ZERO;
                    if (loaiKhuyenMai.equals("VNĐ")) {
                        chuyenDoi = giaTriKhuyenMai;
                    } else if (loaiKhuyenMai.equals("%")) {
                        chuyenDoi = (donGiaKhuyenMai.multiply(giaTriKhuyenMai)).divide(new BigDecimal(100));
                    }
                    tong = tong.add(chuyenDoi);
                }
                responseCustom.setGiaTriKhuyenMai(tong.divide(new BigDecimal(kmct.size()), 2, RoundingMode.HALF_UP)) ;
            }
            return listResult;
        } else if (check == false) {
            List<SanPhamChiTietKhuyenMaiResponse> itemsToRemove = new ArrayList<>();
            for (SanPhamChiTietKhuyenMaiResponse item : result) {
                for (SanPhamChiTietKhuyenMaiResponse uniqueItem : listAo) {
                    if (uniqueItem.getId().equals(item.getId())) {
                        itemsToRemove.add(uniqueItem);
                    }
                }
            }
            listAo.removeAll(itemsToRemove);
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

}
