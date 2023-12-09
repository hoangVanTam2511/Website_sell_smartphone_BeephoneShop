package beephone_shop_projects.core.admin.account_management.repository;

import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
public class CustomKhachHangRepositoryImpl implements CustomKhachHangRepository {

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Page<Account> findAllKH(Pageable pageable, FindAccountRequest request) {
        List<Account> accountList = null;
        Long totalPage = 0L;
        try(EntityManager manager = this.entityManager) {
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
        }catch (Exception e){
            throw e;
        }
        return new PageImpl<>(accountList, pageable, totalPage);
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
