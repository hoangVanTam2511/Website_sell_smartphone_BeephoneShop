package beephone_shop_projects.core.admin.order_management.converter;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

public class AbstractConverter<D, E> implements GenericConverter<D, E> {

  private Class<D> dtoClass;
  private Class<E> entityClass;

  public AbstractConverter() {
    Type type = getClass().getGenericSuperclass();
    ParameterizedType parameterizedType = (ParameterizedType) type;
    dtoClass = (Class<D>) parameterizedType.getActualTypeArguments()[0];
    entityClass = (Class<E>) parameterizedType.getActualTypeArguments()[1];
  }

  private ModelMapper getModelMapper() {
    return new ModelMapper();
  }

  @Override
  public D convertToDto(E entity) {
    if (entity != null) {
      return getModelMapper().map(entity, dtoClass);
    }
    return null;
  }

  @Override
  public E convertToEntity(D dto) {
    if (dto != null) {
      return getModelMapper().map(dto, entityClass);
    }
    return null;
  }

  @Override
  public Page<D> convertToPageDto(Page<E> entityPage) {
    return entityPage.map(e -> getModelMapper().map(e, dtoClass));
  }

  @Override
  public Page<E> convertToPageEntity(Page<D> dtoPage) {
    return dtoPage.map(d -> getModelMapper().map(d, entityClass));
  }

  @Override
  public List<D> convertToListDto(List<E> entityList) {
    return entityList.stream().map(e -> getModelMapper().map(e, dtoClass)).collect(Collectors.toList());
  }

  @Override
  public List<E> convertToListEntity(List<D> dtoList) {
    return dtoList.stream().map(d -> getModelMapper().map(d, entityClass)).collect(Collectors.toList());
  }
}
