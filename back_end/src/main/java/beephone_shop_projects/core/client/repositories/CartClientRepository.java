package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.repository.IGioHangRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartClientRepository extends IGioHangRepository {

    @Query(value = """
            SELECT * FROM gio_hang
            WHERE id_khach_hang = :id_khach_hang
    """, nativeQuery = true)
    GioHang getGioHangByIDKhachHang(@Param("id_khach_hang")String idKhachHang);


}
