package beephone_shop_projects.core.client.repositories;


import beephone_shop_projects.entity.Account;
import beephone_shop_projects.repository.IAccountRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountClientRepository extends IAccountRepository {

    @Query(value = """
            SELECT * FROM account acc WHERE acc.email = :email AND acc.mat_khau = :pass
            """, nativeQuery = true)
    Account checkEmailAndPass(@Param("email") String email,@Param("pass") String pass);

    @Query(value = """
            SELECT * FROM account acc WHERE acc.email = :email 
            """, nativeQuery = true)
    Account findByEmail(@Param("email") String email);

    @Query(value = """
            SELECT * FROM account acc WHERE acc.ma IS NULL
        """, nativeQuery = true)
    Account findByMa();
}
