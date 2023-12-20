package beephone_shop_projects.core.client.models.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
public class BillAfterBuyResponce {

    String id;

    String codeOrder;

    Integer quantityProduct;

    BigDecimal totalPrice;

    BigDecimal totalPriceAfterPrice;

    BigDecimal shipFee;

    String name;

    String phoneNumber;

    Date deliveryDate;

    String address;

    ArrayList<ProductOfBillDetail> products;

}
