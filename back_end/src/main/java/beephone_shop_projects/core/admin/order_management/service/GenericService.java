package beephone_shop_projects.core.admin.order_management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public interface GenericService<D, R, ID extends Serializable> {

  Page<D> findAll(Pageable pageable);

  List<D> findAll();

  D findOneById(ID id);

  D save(R req) throws Exception;

  D update(R req) throws Exception;

  void delete(R req) throws Exception;

  boolean deleteById(ID id) throws Exception;
}
