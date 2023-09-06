package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.RoleService;
import beephone_shop_projects.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository repository;

    @Override
    public List<Role> getAll() {
//        Pageable pageable = PageRequest.of(pageNo, 3);
        return repository.findAll();
    }

    @Override
    public Role addRole(Role role) {
        Role roleN = new Role().builder()
                .ma(role.getMa())
                .ten(role.getTen())
                .build();
        return repository.save(roleN);
    }

    @Override
    public Role updateRole(Role role, String id) {
        Optional<Role> optionalRole = repository.findById(id);
        if (optionalRole.isPresent()) {
            optionalRole.get().setMa(role.getMa());
            optionalRole.get().setTen(role.getTen());
            repository.save(optionalRole.get());
        }
        return optionalRole.get();
    }

    @Override
    public Boolean deleteKH(String id) {
        repository.deleteById(id);
        return true;
    }
}
