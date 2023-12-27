package beephone_shop_projects.core.admin.order_management.converter;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

public class AbstractConverter<D, E, R> implements GenericConverter<D, E, R> {

  private Class<D> responseClass;
  private Class<E> entityClass;
  private Class<R> requestClass;

  public AbstractConverter() {
    Type type = getClass().getGenericSuperclass();
    ParameterizedType parameterizedType = (ParameterizedType) type;
    responseClass = (Class<D>) parameterizedType.getActualTypeArguments()[0];
    entityClass = (Class<E>) parameterizedType.getActualTypeArguments()[1];
    requestClass = (Class<R>) parameterizedType.getActualTypeArguments()[2];
  }

  private ModelMapper getModelMapper() {
    return new ModelMapper();
  }

  @Override
  public D convertEntityToResponse(E entity) {
    if (entity != null) {
      return getModelMapper().map(entity, responseClass);
    }
    return null;
  }

  @Override
  public E convertResponseToEntity(D response) {
    if (response != null) {
      return getModelMapper().map(response, entityClass);
    }
    return null;
  }

  @Override
  public E convertRequestToEntity(R req) {
    if (req != null) {
      return getModelMapper().map(req, entityClass);
    }
    return null;
  }

  @Override
  public D convertRequestToResponse(R request) {
    if (request != null) {
      return getModelMapper().map(request, responseClass);
    }
    return null;
  }

  @Override
  public Page<D> convertToPageResponse(Page<E> entityPage) {
    return entityPage.map(e -> getModelMapper().map(e, responseClass));
  }

  @Override
  public Page<E> convertToPageEntity(Page<D> dtoPage) {
    return dtoPage.map(d -> getModelMapper().map(d, entityClass));
  }

  @Override
  public List<D> convertToListResponse(List<E> entityList) {
    return entityList.stream().map(e -> getModelMapper().map(e, responseClass)).collect(Collectors.toList());
  }

  @Override
  public List<E> convertToListEntity(List<D> dtoList) {
    return dtoList.stream().map(d -> getModelMapper().map(d, entityClass)).collect(Collectors.toList());
  }

  @Override
  public List<E> convertListRequestToListEntity(List<R> reqList) {
    return reqList.stream().map(r -> getModelMapper().map(r, entityClass)).collect(Collectors.toList());
  }
}
