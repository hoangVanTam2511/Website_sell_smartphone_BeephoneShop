package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiChiTietResponse;
import beephone_shop_projects.repository.IKhuyenMaiChiTietRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KhuyenMaiChiTietRepository extends IKhuyenMaiChiTietRepository {

//    @Query(value = """
//            SELECT kc.don_gia, kc.don_gia_sau_khuyen_mai FROM khuyen_mai_chi_tiet kc
//            """, nativeQuery = true)
//    List<KhuyenMaiChiTietResponse> getAllKhuyenMaiChiTiet();

//    @Query(value = """
//            SELECT kc.don_gia, kc.don_gia_sau_khuyen_mai FROM khuyen_mai_chi_tiet kc WHERE kc. = ?1
//            """, nativeQuery = true)
//    KhuyenMaiResponse getOneKhuyenMai(String ma);
}
