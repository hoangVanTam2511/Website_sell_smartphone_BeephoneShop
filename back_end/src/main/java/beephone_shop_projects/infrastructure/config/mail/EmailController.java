package beephone_shop_projects.infrastructure.config.mail;

import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.voucher_management.model.request.CreateVoucherRequest;
import beephone_shop_projects.core.admin.voucher_management.service.VoucherService;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin("*")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        return "Email sent successfully!";
    }

    @PostMapping("/send-html-email")
    public String sendHtmlEmail(@RequestBody EmailRequest emailRequest) {
        List<Account> khachHang = accountRepository.sendMailAccount();

        Context context = new Context();
        context.setVariable("message", emailRequest.getBody());
        for (Account account : khachHang) {
            emailService.sendEmailWithHtmlTemplate(account.getEmail(), "Phiếu giảm giá mới dành cho quý khách hàng của BeePhoneShop", "email-template", context);
        }
        return "HTML email sent successfully!";
    }

    @PostMapping("/send-html-email/voucher")
    public String sendHtmlEmailVoucher(@RequestBody SendVoucherEmailRequest request) {
        Context context = new Context();
        List<Account> khachHang = accountRepository.sendMailAccount();
        for (Account account1 : khachHang) {
            context.setVariable("fullNameCustomer", account1.getHoVaTen());
        }
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formattedGiaTriVoucher = currencyFormatter.format(request.getGiaTriVoucher());

        NumberFormat currencyFormatter1 = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formattedConditionVoucher = currencyFormatter1.format(request.getDieuKienApDung());

        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd-MM-yyyy"); // Định dạng mong muốn
        String formattedDate = dateFormat.format(request.getStartTime()); // Chuyển đổi Date thành chuỗi theo định dạng


        SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss dd-MM-yyyy"); // Định dạng mong muốn
        String formattedDate1 = dateFormat1.format(request.getEndTime()); // Chuyển đổi Date thành chuỗi theo định dạng


        context.setVariable("nameVoucher", request.getTen());
        context.setVariable("valueVoucher", formattedGiaTriVoucher);
        context.setVariable("conditionVoucher", formattedConditionVoucher);
        context.setVariable("codeVoucher", request.getMa());
        context.setVariable("startTime", formattedDate);
        context.setVariable("endTime", formattedDate1);

        for (Account account : khachHang) {
            emailService.sendEmailWithHtmlTemplateVoucher(account.getEmail(), "Phiếu giảm giá mới dành cho quý khách hàng của BeePhoneShop", "template-voucher", context);
        }
        return "HTML email sent successfully!";
    }


}
