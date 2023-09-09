package beephone_shop_projects.core.admin.account_management.controller;

import beephone_shop_projects.core.admin.account_management.service.RoleService;
import beephone_shop_projects.entity.Role;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role/")
@CrossOrigin(origins = {"*"})
public class RoleRescontroller {
    @Autowired
    private RoleService roleService;

    @GetMapping("hien-thi")
    public List<Role> hienThi() {
        return  roleService.getAll();
    }

    @PostMapping("add")
    public ResponseEntity addRole(@Valid @RequestBody Role role) {
        return new ResponseEntity(roleService.addRole(role), HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity updateRole(@Valid @RequestBody Role role,
                           @PathVariable("id") String id) {
        return new ResponseEntity(roleService.updateRole(role,id), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public Boolean deleteRole(@PathVariable("id") String id) {
        return roleService.deleteKH(id);
    }
}
