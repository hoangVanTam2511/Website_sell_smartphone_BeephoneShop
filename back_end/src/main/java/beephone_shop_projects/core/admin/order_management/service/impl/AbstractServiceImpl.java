package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.GenericConverter;
import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.order_management.service.GenericService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.Optional;

import static beephone_shop_projects.core.admin.order_management.constant.SystemConstant.PREFIX_CODE_ORDER;
import static beephone_shop_projects.core.admin.order_management.constant.SystemConstant.SUFFIX_CODE;

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
  public Optional<D> findOneById(ID id) {
    Optional<E> entity = repo.findOneById(id);
    return (Optional<D>) converter.convertToDto((E) entity);
  }

  @Override
  public D save(D dto) {
    E entity = converter.convertToEntity(dto);
    E createdEntity = repo.save(entity);
    return converter.convertToDto(createdEntity);
  }

  @Override
  public D update(D dto) {
    E entity = converter.convertToEntity(dto);
    E updatedEntity = repo.update(entity);
    return converter.convertToDto(updatedEntity);
  }

  @Override
  public void delete(D dto) {
    E entity = converter.convertToEntity(dto);
    repo.delete(entity);
  }

  @Override
  public void deleteById(ID id) {
    repo.deleteById(id);
  }

  @Override
  public String getCode() {
    return PREFIX_CODE_ORDER + SUFFIX_CODE + repo.getMaxSuffixCode();
  }

}
