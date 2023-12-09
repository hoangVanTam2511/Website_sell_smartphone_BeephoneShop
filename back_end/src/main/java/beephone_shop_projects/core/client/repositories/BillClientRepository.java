package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.repository.IHoaDonRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BillClientRepository extends IHoaDonRepository {

    @Query(value = """
        SELECT * FROM hoa_don WHERE id_khach_hang = :id_khach_hang
        """, nativeQuery = true)
    ArrayList<HoaDon> getHoaDonByIDKhachHang(@Param("id_khach_hang") String idKhachHang);

    @Query(value = """
        SELECT * FROM hoa_don WHERE so_dien_thoai_nguoi_nhan = :so_dien_thoai AND ma = :ma
        """, nativeQuery = true)
    ArrayList<HoaDon> getHoaDonByMaHoaDonVaSoDienThoai(@Param("so_dien_thoai") String soDienThoai, @Param("ma") String maHoaDon);

    @Query(value = """
            SELECT * FROM lich_su_hoa_don WHERE hoa_don_id = :id_hoa_don
        """,nativeQuery = true)
    ArrayList<LichSuHoaDon> getLichSuHoaDon(@Param("id_hoa_don") String idHoaDon);

}
