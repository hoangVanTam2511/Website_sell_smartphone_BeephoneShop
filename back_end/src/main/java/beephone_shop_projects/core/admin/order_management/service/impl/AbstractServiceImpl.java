package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.GenericConverter;
import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.order_management.service.GenericService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public class AbstractServiceImpl<E, D, R, ID extends Serializable> implements GenericService<D, R, ID> {

  private GenericRepository<E, ID> repo;
  private GenericConverter<D, E, R> converter;

  public AbstractServiceImpl(GenericRepository repo, GenericConverter converter) {
    this.repo = repo;
    this.converter = converter;
  }

  @Override
  public Page<D> findAll(Pageable pageable) {
    Page<E> entityPage = repo.findAll(pageable);
    return converter.convertToPageResponse(entityPage);
  }

  @Override
  public List<D> findAll() {
    List<E> entityList = repo.findAll();
    return converter.convertToListResponse(entityList);
  }

  @Override
  public D findOneById(ID id) {
    E entity = repo.findOneById(id);
    return converter.convertEntityToResponse(entity);
  }

  @Override
  public D save(R req) throws Exception {
    E entity = converter.convertRequestToEntity(req);
    E createdEntity = repo.save(entity);
    return converter.convertEntityToResponse(createdEntity);
  }

  @Override
  public D update(R req) throws Exception {
    E entity = converter.convertRequestToEntity(req);
    E updatedEntity = repo.save(entity);
    return converter.convertEntityToResponse(updatedEntity);
  }

  @Override
  public void delete(R req) throws Exception {
    E entity = converter.convertRequestToEntity(req);
    repo.delete(entity);
  }

  @Override
  public boolean deleteById(ID id) throws Exception {
    return repo.deleteById(id);
  }

}
