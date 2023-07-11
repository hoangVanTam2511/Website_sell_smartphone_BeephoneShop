package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVoucherRepository extends JpaRepository<Voucher,String> {
}
