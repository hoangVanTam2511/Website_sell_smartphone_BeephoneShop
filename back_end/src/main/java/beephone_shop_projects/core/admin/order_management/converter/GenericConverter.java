package beephone_shop_projects.core.admin.order_management.converter;

import org.springframework.data.domain.Page;

import java.util.List;

public interface GenericConverter<D, E> {

  D convertToDto(E entity);

  E convertToEntity(D dto);

  Page<D> convertToPageDto(Page<E> entityPage);

  Page<E> convertToPageEntity(Page<D> dtoPage);

  List<D> convertToListDto(List<E> entityList);

  List<E> convertToListEntity(List<D> dtoList);
}
