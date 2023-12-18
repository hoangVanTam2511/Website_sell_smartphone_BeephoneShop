package beephone_shop_projects.infrastructure.config.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;

@Service
public class EmailService {
  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Autowired
  public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
    this.mailSender = mailSender;
    this.templateEngine = templateEngine;
  }

  public void sendEmail(String to, String subject, String body) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(body);
    mailSender.send(message);
  }

  @Async
  public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

    try {
      helper.setTo(to);
      helper.setSubject(subject);
      String htmlContent = templateEngine.process(templateName, context);
      helper.setText(htmlContent, true);
      // Thêm file đính kèm
//      FileSystemResource file = new FileSystemResource(new File(attachmentPath));
//      helper.addAttachment(file.getFilename(), file);
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      // Handle exception
    }
  }

  public void sendEmailWithHtmlTemplateVoucher(String to, String subject, String templateName, Context context) {
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

    try {
      helper.setTo(to);
      helper.setSubject(subject);
      String htmlContent = templateEngine.process(templateName, context);
      helper.setText(htmlContent, true);
      // Thêm file đính kèm
//      FileSystemResource file = new FileSystemResource(new File(attachmentPath));
//      helper.addAttachment(file.getFilename(), file);
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      // Handle exception
    }
  }

}
