package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomKhachHangRepositoryImpl implements CustomKhachHangRepository {
  private static final Logger logger = LoggerFactory.getLogger(CustomKhachHangRepositoryImpl.class);

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Page<Account> findAllKH(Pageable pageable, FindAccountRequest request) {
    List<Account> accountList = null;
    Long totalPage = 0L;
    try (EntityManager manager = this.entityManager) {
      CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
      CriteriaQuery<Account> criteriaQuery = criteriaBuilder.createQuery(Account.class);

      Root<Account> root = criteriaQuery.from(Account.class);
      criteriaQuery.select(root);

      Path<Object> sortByField = root.get("createdAt");
      Order orderByAscending = criteriaBuilder.desc(sortByField);
      criteriaQuery.orderBy(orderByAscending);

      CriteriaQuery<Long> coutQuery = criteriaBuilder.createQuery(Long.class);
      Root<Account> countRoot = coutQuery.from(Account.class);

      coutQuery.select(criteriaBuilder.count(countRoot));
      List<Predicate> predicates = new ArrayList<>();

      List<Predicate> countPredicates = new ArrayList<>();
      Predicate predicate = getPredicate(root, Account.class, criteriaBuilder, request.getKeyword());
      Predicate countPredicate = getPredicate(countRoot, Account.class, criteriaBuilder, request.getKeyword());
      Join<Account, Role> roleJoin = root.join("idRole");
      predicates.add(criteriaBuilder.equal(roleJoin.get("ma"), "role2"));

      predicates.add(predicate);
      countPredicates.add(countPredicate);

      if (request.getTrangThai() != null) {
        predicates.add(criteriaBuilder.equal(root.get("trangThai"), request.getTrangThai()));
        countPredicates.add(criteriaBuilder.equal(countRoot.get("trangThai"), request.getTrangThai()));
      }

      criteriaQuery.where(predicates.toArray(new Predicate[0]));
      coutQuery.where(countPredicates.toArray(new Predicate[0]));
      TypedQuery<Account> typedQuery = manager.createQuery(criteriaQuery).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize());
      accountList = typedQuery.getResultList();
      totalPage = manager.createQuery(coutQuery).getSingleResult();
      if (accountList == null) {
        int numberOfElements = accountList.size();
        System.out.println("Number of elements in khuyenMaiList: " + numberOfElements);
      }
    } catch (Exception e) {
      throw e;
    }
    return new PageImpl<>(accountList, pageable, totalPage);
  }

  @Override
  public Account getAccountById(String id) {
    Account entity = null;

    try (EntityManager entityManager = this.entityManager) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<Account> criteriaQuery = criteriaBuilder.createQuery(Account.class);
      Root<Account> root = criteriaQuery.from(Account.class);

      root.fetch("idRole", JoinType.LEFT);
      root.fetch("diaChiList", JoinType.LEFT);

      Predicate condition = criteriaBuilder.equal(root.get("id"), id);
      criteriaQuery.select(root).where(condition);

      entity = entityManager.createQuery(criteriaQuery).getSingleResult();

    } catch (PersistenceException e) {
      logger.error(e.getMessage());
    }
    return entity;
  }

  protected Predicate getPredicate(Root<Account> root, Class<?> entity, CriteriaBuilder criteriaBuilder, String keyword) {
    Field[] fields = entity.getDeclaredFields();
    List<Predicate> predicates = new ArrayList<>();
    for (Field field : fields) {
      predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
    }
    return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
  }
}
