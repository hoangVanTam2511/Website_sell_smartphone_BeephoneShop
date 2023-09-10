package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.PrimaryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "camera")
public class Camera extends PrimaryEntity {

    private String ma;

    private String doPhanGiai;

}
