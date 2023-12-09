package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.PaymentConverter;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.model.response.PaymentMethodResponse;
import beephone_shop_projects.core.admin.order_management.repository.HinhThucThanhToanCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.infrastructure.config.vnpay.VNPayBase;
import beephone_shop_projects.infrastructure.config.vnpay.VNPayRequest;
import beephone_shop_projects.infrastructure.config.vnpay.VNPayRequestCustom;
import beephone_shop_projects.infrastructure.config.vnpay.VNPayService;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vnpay")
@CrossOrigin(origins = "http://localhost:3000")
public class VNPayController {

  @Autowired
  private VNPayService vnPayService;

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private OrderRepositoryImpl orderRepository;

  @Autowired
  private OrderConverter orderConverter;

  @Autowired
  private HinhThucThanhToanCustomRepository hinhThucThanhToanRepository;

  @Autowired
  private PaymentConverter paymentConverter;

  @PostMapping("/payment")
  public ResponseObject createPaymentVnPayOrderPending(@RequestBody VNPayRequest req) {
    String vnpayUrl = vnPayService.createOrder(req.getTotal(), req.getInfo(), req.getCode());
    return new ResponseObject(vnpayUrl);
  }

  @PutMapping("/payment/delivery")
  public ResponseObject createPaymentCashOrderDelivery(@RequestBody OrderRequest req) throws Exception {
    OrderResponse orderCurrent = hoaDonService.getOrderDetailsById(req.getId());
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }
    HinhThucThanhToan hinhThucThanhToan = new HinhThucThanhToan();
    boolean checkCodeExists = false;
    String code;

    do {
      code = RandomCodeGenerator.generateRandomNumber();
      Optional<HinhThucThanhToan> payment = hinhThucThanhToanRepository.getPaymentMethodById(code);

      if (!payment.isPresent()) {
        checkCodeExists = false;
      } else {
        checkCodeExists = true;
      }
    } while (checkCodeExists);

    hinhThucThanhToan.setMa(code);
    hinhThucThanhToan.setHoaDon(orderConverter.convertResponseToEntity(orderCurrent));
    hinhThucThanhToan.setSoTienThanhToan(req.getTienKhachTra());
    hinhThucThanhToan.setLoaiThanhToan(req.getHoanTien().equals("Hoàn tiền") ? 1 : 0);
    hinhThucThanhToan.setHinhThucThanhToan(req.getHinhThucThanhToan().equals("Chuyển khoản thường") ? 2 : 1);
    hinhThucThanhToan.setTrangThai(1);
    hinhThucThanhToan.setCreatedAt(new Date());
    hinhThucThanhToan.setCreatedBy(req.getCreatedByPayment());
    hinhThucThanhToanRepository.save(hinhThucThanhToan);

    if (req.getHoanTien().equals("Hoàn tiền")) {
      orderCurrent.setTienTraKhach(req.getTienKhachTra());
      orderRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    } else {
      if (orderCurrent.getTienKhachTra() != null) {
        orderCurrent.setTienKhachTra(orderCurrent.getTienKhachTra().add(req.getTienKhachTra()));
      } else {
        orderCurrent.setTienKhachTra(req.getTienKhachTra());
      }
      orderRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    }

    orderRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    if (orderCurrent.getPaymentMethods() != null) {
      orderCurrent.setPaymentMethods(null);
      List<HinhThucThanhToan> payments = hinhThucThanhToanRepository.getPaymentMethodsById(orderCurrent.getId());
      orderCurrent.setPaymentMethods(paymentConverter.convertToListResponse(payments));
    }
    return new ResponseObject(orderCurrent);

  }

  @PutMapping("/payment/cash")
  public ResponseObject createPaymentCashOrderPending(@RequestBody OrderRequest req) throws Exception {
    OrderResponse orderCurrent = hoaDonService.getOrderPendingById(req.getId());
    if (orderCurrent == null) {
      throw new RestApiException("Đơn hàng không tồn tại!");
    }
    HinhThucThanhToan hinhThucThanhToan = new HinhThucThanhToan();
    boolean checkCodeExists = false;
    String code;

    do {
      code = RandomCodeGenerator.generateRandomNumber();
      Optional<HinhThucThanhToan> payment = hinhThucThanhToanRepository.getPaymentMethodById(code);

      if (!payment.isPresent()) {
        checkCodeExists = false;
      } else {
        checkCodeExists = true;
      }
    } while (checkCodeExists);

    hinhThucThanhToan.setMa(code);
    hinhThucThanhToan.setHoaDon(orderConverter.convertResponseToEntity(orderCurrent));
    hinhThucThanhToan.setSoTienThanhToan(req.getTienKhachTra());
    hinhThucThanhToan.setLoaiThanhToan(0);
    hinhThucThanhToan.setHinhThucThanhToan(req.getHinhThucThanhToan().equals("Chuyển khoản thường") ? 2 : 1);
    hinhThucThanhToan.setTrangThai(1);
    hinhThucThanhToan.setCreatedAt(new Date());
    hinhThucThanhToan.setCreatedBy(req.getCreatedByPayment());
    hinhThucThanhToanRepository.save(hinhThucThanhToan);

    if (orderCurrent.getTienKhachTra() != null) {
      orderCurrent.setTienKhachTra(orderCurrent.getTienKhachTra().add(req.getTienKhachTra()));
    } else {
      orderCurrent.setTienKhachTra(req.getTienKhachTra());
    }
    orderRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
    if (orderCurrent.getPaymentMethods() != null) {
      orderCurrent.setPaymentMethods(null);
      List<HinhThucThanhToan> payments = hinhThucThanhToanRepository.getPaymentMethodsById(orderCurrent.getId());
      orderCurrent.setPaymentMethods(paymentConverter.convertToListResponse(payments));
    }
    return new ResponseObject(orderCurrent);

  }

  @PutMapping("/update-order")
  public ResponseObject updateInfoPaymentOrder(@RequestBody VNPayRequestCustom req) throws Exception {
    VNPayBase vnPayBase = new VNPayBase();
    if ("00".equals(req.getTransactionStatus())) {
      BigDecimal totalPrice = req.getTotal();
      BigDecimal dividedResult = totalPrice.divide(BigDecimal.valueOf(100));

      OrderResponse orderResponse = hoaDonService.getOrderDetailsById(req.getInfo());
      if (orderResponse != null) {
        boolean transactionIsExists = false;
        if (orderResponse.getPaymentMethods() != null) {
          for (PaymentMethodResponse payment : orderResponse.getPaymentMethods()) {
            if (payment.getMa().equals(req.getTransactionId())) {
              transactionIsExists = true;
            }
          }
        }
        if (!transactionIsExists) {
          HinhThucThanhToan payment = new HinhThucThanhToan();
          payment.setMa(req.getTransactionId());
          payment.setTrangThai(1); //1 Thành công, 0 Thất bại
          payment.setHoaDon(orderConverter.convertResponseToEntity(orderResponse));
          payment.setGhiChu("");
          payment.setSoTienThanhToan(dividedResult);
          payment.setLoaiThanhToan(0); // 0 Thanh toán, 1 Hoàn trả
          payment.setHinhThucThanhToan(0); // 0 Chuyển khoảnVNPAY, 1 Tiền mặt, 2 Chuyển
          payment.setCreatedAt(new Date());
          hinhThucThanhToanRepository.save(payment);

          if (orderResponse.getTienKhachTra() != null) {
            orderResponse.setTienKhachTra(orderResponse.getTienKhachTra().add(dividedResult));
          } else {
            orderResponse.setTienKhachTra(dividedResult);
          }
          orderRepository.save(orderConverter.convertResponseToEntity(orderResponse));

          vnPayBase.setOrderCode(req.getCode());
          vnPayBase.setOrderInfo(req.getInfo());
          vnPayBase.setPaymentTime(req.getPaymentTime());
          vnPayBase.setTransactionId(req.getTransactionId());
          vnPayBase.setTotalPrice(dividedResult);
          vnPayBase.setStatus("00");
          vnPayBase.setContent("Thanh toán thành công");
        } else {
          vnPayBase.setOrderCode(req.getCode());
          vnPayBase.setOrderInfo(req.getInfo());
          vnPayBase.setPaymentTime(req.getPaymentTime());
          vnPayBase.setTransactionId(req.getTransactionId());
          vnPayBase.setTotalPrice(dividedResult);
          vnPayBase.setStatus("00");
          vnPayBase.setContent("Thanh toán thành công");
        }
      } else {
        vnPayBase.setOrderCode(req.getCode());
        vnPayBase.setOrderInfo(req.getInfo());
        vnPayBase.setContent("Thanh toán thất bại");
        vnPayBase.setPaymentTime(req.getPaymentTime());
        vnPayBase.setStatus("01");
      }
    } else {
      vnPayBase.setOrderCode(req.getCode());
      vnPayBase.setOrderInfo(req.getInfo());
      vnPayBase.setContent("Thanh toán thất bại");
      vnPayBase.setPaymentTime(req.getPaymentTime());
      vnPayBase.setStatus("01");
    }

    return new ResponseObject(vnPayBase);
  }
}
