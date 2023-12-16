package beephone_shop_projects.core.client.models.response;

import beephone_shop_projects.entity.DiaChi;
import beephone_shop_projects.entity.Role;
import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.StatusAccountCus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {

    private String id;

    private String ma;

    private String hoVaTen;

    private String email;

    private String soDienThoai;

    private String anhDaiDien;

    @Enumerated(EnumType.ORDINAL)
    private StatusAccountCus trangThai;

    private String idRole;

    private String token;

    private String tenChucVu;

    private Boolean gioiTinh;

}
