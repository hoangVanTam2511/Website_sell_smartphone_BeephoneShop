package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.GenericConverter;
import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.order_management.service.GenericService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;

public class AbstractServiceImpl<E, D, ID extends Serializable> implements GenericService<D, ID> {

  private GenericRepository<E, ID> repo;
  private GenericConverter<D, E> converter;

  public AbstractServiceImpl(GenericRepository repo, GenericConverter converter) {
    this.repo = repo;
    this.converter = converter;
  }

  @Override
  public Page<D> findAll(Pageable pageable) {
    Page<E> entityPage = repo.findAll(pageable);
    return converter.convertToPageDto(entityPage);
  }

  @Override
  public D findOneById(ID id) {
    E entity = repo.findOneById(id);
    return converter.convertToDto(entity);
  }

  @Override
  public D save(D dto) throws Exception {
    E entity = converter.convertToEntity(dto);
    E createdEntity = repo.save(entity);
    return converter.convertToDto(createdEntity);
  }

  @Override
  public D update(D dto) throws Exception {
    E entity = converter.convertToEntity(dto);
    E updatedEntity = repo.update(entity);
    return converter.convertToDto(updatedEntity);
  }

  @Override
  public void delete(D dto) throws Exception {
    E entity = converter.convertToEntity(dto);
    repo.delete(entity);
  }

  @Override
  public void deleteById(ID id) throws Exception {
    repo.deleteById(id);
  }

}
