package beephone_shop_projects.core.admin.order_management.dto;

import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestDto {
  private String ma;

  private Account account;

  private Voucher voucher;

  private GioHang gioHang;

}
