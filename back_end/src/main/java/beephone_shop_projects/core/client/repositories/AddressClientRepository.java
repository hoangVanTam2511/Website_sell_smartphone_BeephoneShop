package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.repository.IDiaChiRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface AddressClientRepository extends IDiaChiRepository {

    @Query(value = """
        SELECT * FROM dia_chi_khach_hang WHERE id_account =  :id_account
        AND delected = 1
        """, nativeQuery = true)
    ArrayList<DiaChi> findAddressById(@Param("id_account") String idAccount);

}
