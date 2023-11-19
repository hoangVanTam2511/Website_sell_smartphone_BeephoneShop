package beephone_shop_projects.core.admin.order_management.converter;

import org.springframework.data.domain.Page;

import java.util.List;

public interface GenericConverter<D, E, R> {

  D convertEntityToResponse(E entity);

  E convertResponseToEntity(D response);

  E convertRequestToEntity(R request);

  D convertRequestToResponse(R request);

  Page<D> convertToPageResponse(Page<E> entityPage);

  Page<E> convertToPageEntity(Page<D> responsePage);

  List<D> convertToListResponse(List<E> entityList);

  List<E> convertToListEntity(List<D> responseList);

  List<E> convertListRequestToListEntity(List<R> requestList);
}
