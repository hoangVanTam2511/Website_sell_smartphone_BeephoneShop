package beephone_shop_projects.core.admin.order_management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;

public interface GenericService<D, ID extends Serializable> {

  Page<D> findAll(Pageable pageable);

  D findOneById(ID id);

  D save(D dto) throws Exception;

  D update(D dto) throws Exception;

  void delete(D dto) throws Exception;

  void deleteById(ID id) throws Exception;
}
