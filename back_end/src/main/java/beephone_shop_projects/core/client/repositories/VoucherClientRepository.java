package beephone_shop_projects.core.client.repositories;

import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.repository.IVoucherRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherClientRepository extends IVoucherRepository {

    @Query(value = """
        SELECT * FROM voucher v WHERE v.ma LIKE :ma
    """, nativeQuery = true)
    Voucher findByMa(@Param("ma") String ma);
}
