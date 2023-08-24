package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.config.PersistenceConfiguration;
import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SuppressWarnings("unchecked")
public class AbstractRepositoryImpl<T, ID extends Serializable> implements GenericRepository<T, ID> {
  private Logger logger = LoggerFactory.getLogger(AbstractRepositoryImpl.class);

  @PersistenceContext
  private EntityManager entityManager;
  private Class<T> persistenceClass;

  public AbstractRepositoryImpl() {
    persistenceClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
  }

  protected Class<T> getPersistenceClass() {
    return this.persistenceClass;
  }

  protected EntityManager getEntityManager() {
    return this.entityManager;
  }

  @Override
  @Transactional
  public Page<T> findAll(Pageable pageable) {
    List<T> entityList = null;
    Long totalElements = 0L;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);

      Root<T> root = criteriaQuery.from(this.getPersistenceClass());
      Root<T> countRoot = countQuery.from(this.getPersistenceClass());

      PersistenceConfiguration<T> configuration = new PersistenceConfiguration<T>(criteriaBuilder, criteriaQuery, countQuery, root, countRoot);
      this.buildSortByPageable(configuration, pageable.getSort());
      this.buildSelectAllAndCountEntity(configuration);

      entityList = this.buildQueryWithPaginationByPageableAndCriteriaQuery(pageable, configuration);
      totalElements = entityManager.createQuery(countQuery).getSingleResult();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return new PageImpl<>(entityList, pageable, totalElements);
  }

  @Override
  public List<T> findAll() {
    List<T> entityList = null;

    try (EntityManager entityManager = this.getEntityManager()) {
      CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

      CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(this.getPersistenceClass());
      Root<T> root = criteriaQuery.from(this.getPersistenceClass());

      criteriaQuery.select(root);

      entityList = entityManager.createQuery(criteriaQuery).getResultList();

    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return entityList;
  }

  @Override
  @Transactional
  public Optional<T> findOneById(ID id) {
    Optional<T> entity = null;
    try (EntityManager entityManager = this.getEntityManager()) {
      entity = Optional.ofNullable(entityManager.find(this.getPersistenceClass(), id));
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
    return entity;
  }

  @Override
  @Transactional
  public T save(T entity) {
    try (EntityManager entityManager = this.getEntityManager()) {
      T createdEntity = entityManager.merge(entity);
      return createdEntity;
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
  }

  @Override
  @Transactional
  public T update(T entity) {
    try (EntityManager entityManager = this.getEntityManager()) {
      T mergedEntity = entityManager.merge(entity);
      return mergedEntity;
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
  }

  @Override
  @Transactional
  public void delete(T entity) {
    try (EntityManager entityManager = this.getEntityManager()) {
      entityManager.remove(entity);
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
  }

  @Override
  @Transactional
  public void deleteById(ID id) {
    try (EntityManager entityManager = this.getEntityManager()) {
      Optional<T> entity = this.findOneById(id);
      if (entity.isPresent()) {
        entityManager.remove(entity);
      }
    } catch (HibernateException e) {
      logger.error(e.getMessage(), e);
      throw e;
    }
  }

  @Override
  public Long getMaxSuffixCode() {
    List<T> entityList = this.findAll();
    Long result;

    String entityName = this.getPersistenceClass().getSimpleName();
    String jpqlQuery = "SELECT MAX(CAST(SUBSTRING(e.ma, 3, LENGTH(e.ma) - 2) AS LONG)) + 1 FROM " + entityName + " e";

    if (entityList.isEmpty()) {
      result = 1L;
      return result;
    }

    try (EntityManager entityManager = this.getEntityManager()) {
      Query query = entityManager.createQuery(jpqlQuery);
      result = (Long) query.getSingleResult();
    }

    return result;
  }

  protected Predicate getPredicateContains(Root<T> root, Class<?> entityDTO, String keyword, PersistenceConfiguration<T> configuration) {
    Field[] fields = entityDTO.getDeclaredFields();
    List<Predicate> predicates = new ArrayList<>();
    for (Field field : fields) {
      predicates.add(configuration.getCriteriaBuilder().like(configuration.getCriteriaBuilder().lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
    }
    return configuration.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
  }

  protected List<Order> getOrders(PersistenceConfiguration<T> configuration, Sort sortOrder) {
    List<Order> orders = new ArrayList<>();
    for (Sort.Order sort : sortOrder) {
      String propertyName = sort.getProperty();
      if (sort.isDescending()) {
        orders.add(configuration.getCriteriaBuilder().desc(configuration.getRoot().get(propertyName)));
      } else {
        orders.add(configuration.getCriteriaBuilder().asc(configuration.getRoot().get(propertyName)));
      }
    }
    return orders;
  }

  protected void buildSortByPageable(PersistenceConfiguration<T> configuration, Sort sort) {
    if (sort != null && sort.isSorted()) {
      List<Order> order = this.getOrders(configuration, sort);
      configuration.getCriteriaQuery().orderBy(order);
    }
  }

  protected void buildSelectAllAndCountEntity(PersistenceConfiguration<T> configuration) {
    configuration.getCriteriaQuery().select(configuration.getRoot());
    configuration.getCountQuery().select(configuration.getCriteriaBuilder().count(configuration.getCountRoot()));
  }

  protected void buildWhereConditionByPredicates(PersistenceConfiguration<T> configuration, Map<String, List<Predicate>> mapPredicates) {
    configuration.getCriteriaQuery().where(mapPredicates.get("predicates").toArray(new Predicate[0]));
    configuration.getCountQuery().where(mapPredicates.get("countPredicates").toArray(new Predicate[0]));
  }

  protected List<T> buildQueryWithPaginationByPageableAndCriteriaQuery(Pageable pageable, PersistenceConfiguration<T> configuration) {
    TypedQuery<T> typedQuery = this.getEntityManager().createQuery(configuration.getCriteriaQuery())
            .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
            .setMaxResults(pageable.getPageSize());
    return typedQuery.getResultList();
  }

}
