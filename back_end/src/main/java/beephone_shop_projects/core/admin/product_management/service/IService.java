package beephone_shop_projects.core.admin.product_management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IService <T>{

    Page<T> getAll(Pageable pageable);

    void insert(T t);

    void update(T t,String id);

    void delete(String id);

}
