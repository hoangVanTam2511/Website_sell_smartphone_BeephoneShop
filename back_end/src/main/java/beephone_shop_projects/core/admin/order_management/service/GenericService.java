package beephone_shop_projects.core.admin.order_management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.Optional;

public interface GenericService<D, ID extends Serializable> {

  Page<D> findAll(Pageable pageable);

  Optional<D> findOneById(ID id);

  D save(D dto);

  D update(D dto);

  void delete(D dto);

  void deleteById(ID id);

  String getCode();

}
