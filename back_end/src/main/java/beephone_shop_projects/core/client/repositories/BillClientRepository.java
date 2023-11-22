package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.HoaDon;
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
}
