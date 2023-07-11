package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.repository.IKhuyenMaiRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends IKhuyenMaiRepository {

    @Query(value = """
            SELECT k.ma, k.ten_khuyen_mai, k.muc_giam_gia_theo_phan_tram, k.muc_giam_gia_theo_so_tien, k.ngay_bat_dau, 
            k.ngay_ket_thuc, k.dieu_kien_giam_gia, k.trang_thai FROM khuyen_mai k
            """, nativeQuery = true)
    List<KhuyenMaiResponse> getAllKhuyenMai();

    @Query(value = """
            SELECT k.ma, k.ten_khuyen_mai, k.muc_giam_gia_theo_phan_tram, k.muc_giam_gia_theo_so_tien, k.ngay_bat_dau, 
            k.ngay_ket_thuc, k.dieu_kien_giam_gia, k.trang_thai FROM khuyen_mai k WHERE k.ma = ?1
            """, nativeQuery = true)
    KhuyenMaiResponse getOneKhuyenMai(String ma);
}
