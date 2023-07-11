package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.entity.Role;
import beephone_shop_projects.repository.IRoleRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface RoleRepository extends IRoleRepository {
    Role findByMa(String ma);
}
