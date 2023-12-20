package beephone_shop_projects.core.client.repositories;


import beephone_shop_projects.entity.Account;
import beephone_shop_projects.repository.IAccountRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountClientRepository extends IAccountRepository {

    @Query(value = """
            SELECT * FROM account acc WHERE acc.email = :email and trang_thai IN (0,2) LIMIT 0, 1
            """, nativeQuery = true)
    Account checkEmailAndPass(@Param("email") String email);

    @Query(value = """
            SELECT * FROM account acc WHERE acc.email = :email 
            """, nativeQuery = true)
    Account findByEmail(@Param("email") String email);

    @Query(value = """
            SELECT * FROM account acc WHERE acc.so_dien_thoai = :so_dien_thoai 
            """, nativeQuery = true)
    Account findByPhoneNumber(@Param("so_dien_thoai") String soDienThoai);

    @Query(value = """
            SELECT * FROM account acc WHERE acc.ma IS NULL
        """, nativeQuery = true)
    Account findByMa();
}
