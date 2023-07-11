package beephone_shop_projects.repository;

import beephone_shop_projects.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAccountRepository extends JpaRepository<Account,String> {
}
