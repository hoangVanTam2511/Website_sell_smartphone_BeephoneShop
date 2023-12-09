package beephone_shop_projects.infrastructure.config.mail;

import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.client.repositories.AccountClientRepository;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;

import java.util.List;

@RestController
@RequestMapping("/email")
public class EmailController {
  private final EmailService emailService;

  @Autowired
  private AccountClientRepository accountClientRepository;

  private final PasswordEncoder passwordEncoder;

  BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

  @Autowired
  public EmailController(EmailService emailService, PasswordEncoder passwordEncoder) {
    this.emailService = emailService;
    this.passwordEncoder = passwordEncoder;
  }

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        return "Email sent successfully!";
    }

    @PostMapping("/send-html-email")
    public String sendHtmlEmail(@RequestBody EmailRequest emailRequest) {
        Context context = new Context();
        context.setVariable("message", emailRequest.getBody());

        emailService.sendEmailWithHtmlTemplate(emailRequest.getTo(), emailRequest.getSubject(), "email-template", context);
        return "HTML email sent successfully!";
    }

    @PostMapping("/send-html-email/voucher")
    public String sendHtmlEmailVoucher(@RequestBody EmailRequest emailRequest) {
        Context context = new Context();
        context.setVariable("message", emailRequest.getBody());
        List<Account> khachHang = accountRepository.sendMailAccount();
        for (Account account: khachHang) {
            emailService.sendEmailWithHtmlTemplate(account.getEmail(), emailRequest.getSubject(), "template-voucher", context);
        }
        return "HTML email sent successfully!";
    }

  @PostMapping("/send-html-email-get-pass")
  public String sendHtmlEmailGetPass(@RequestBody ForgetPassRequest forgetPassRequest) {
    Account account = accountClientRepository.findByEmail(forgetPassRequest.getEmail());

    if(account == null){
      throw new RuntimeException("Không tìm thấy tài khoản");
    }
    Context context = new Context();

    //create new pass
    String newPass = "Abc123.";
    account.setMatKhau(passwordEncoder.encode(newPass));
    accountClientRepository.save(account);
    //send new pass
    context.setVariable("password", newPass);

    emailService.sendEmailWithHtmlTemplate(forgetPassRequest.getEmail(), "Mật khẩu của bạn", "email-get-pass-template", context);
    return "HTML email sent successfully!";
  }
}
