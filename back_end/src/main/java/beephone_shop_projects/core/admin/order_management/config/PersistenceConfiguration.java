package beephone_shop_projects.core.admin.order_management.config;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PersistenceConfiguration<T> {

  private CriteriaBuilder criteriaBuilder;

  private CriteriaQuery<T> criteriaQuery;

  private CriteriaQuery<Long> countQuery;

  private Root<T> root;

  private Root<T> countRoot;

}
