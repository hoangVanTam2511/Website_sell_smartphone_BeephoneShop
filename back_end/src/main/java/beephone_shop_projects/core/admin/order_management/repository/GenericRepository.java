package beephone_shop_projects.core.admin.order_management.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface GenericRepository<T, ID extends Serializable> {

  Page<T> findAll(Pageable pageable);

  List<T> findAll();

  Optional<T> findOneById(ID id);

  T save(T entity) throws Exception;

  T update(T entity) throws Exception;

  void delete(T entity) throws Exception;

  void deleteById(ID id) throws Exception;

  String getMaxEntityCode();

}
