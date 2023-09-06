package beephone_shop_projects.core.admin.order_management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

public interface GenericService<D, ID extends Serializable> {

  Page<D> findAll(Pageable pageable);

  Optional<D> findOneById(ID id);

  D save(D dto) throws Exception;

  D update(D dto) throws Exception;

  void delete(D dto) throws Exception;

  void deleteById(ID id) throws Exception;

  String getCode() throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException;

}
