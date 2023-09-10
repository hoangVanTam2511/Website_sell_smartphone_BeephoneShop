package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAll();

    Role addRole(Role role);
    Role updateRole(Role role, String id);
    Boolean deleteKH(String id);
//    Page<Role> search(Optional<String> tenSearch, Integer pageNo);

}
