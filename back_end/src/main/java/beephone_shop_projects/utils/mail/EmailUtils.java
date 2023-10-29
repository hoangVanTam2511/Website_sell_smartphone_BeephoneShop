package beephone_shop_projects.utils.mail;

import beephone_shop_projects.infrastructure.constant.MailConstant;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;


@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Async
    public void sendEmailEvent(MailBeePhoneRequest request) {
        String htmlBody = MailConstant.HEADER.replace("{title}", "");
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.toString());
            ClassPathResource resource = new ClassPathResource(MailConstant.LOGO_PATH1);
            ClassPathResource resource1 = new ClassPathResource(MailConstant.CAM_ON);
            ClassPathResource resource2 = new ClassPathResource(MailConstant.CAM_KET);
            ClassPathResource resource3 = new ClassPathResource(MailConstant.LIEN_HE);
            ClassPathResource resource4 = new ClassPathResource(MailConstant.THEO_DOI);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setBcc(request.getMails());
            mimeMessageHelper.setSubject(request.getSubject());
            mimeMessageHelper.setText(htmlBody + MailConstant.CONTENT_EVENT_MAIL
                    .replace("{tenKhachHang}", request.getTenKhachHang())
                    .replace("{maDonHang}", request.getMaDonHang())
                    .replace("{ngayDatHang}", request.getNgayDatHang())
                    .replace("{hinhThucThanhToan}", request.getHinhThucThanhToan())
                    .replace("{hinhThucGiaoHang}", request.getHinhThucGiaoHang())
                    .replace("{diaChi}", request.getDiaChi())
                    .replace("{sdtNhanHang}", request.getSdtNhanHang())
                    .replace("{thanhTien}", request.getThanhTien())
                    .replace("{phiVanChuyen}", request.getPhiVanChuyen())
                    .replace("{giamGia}", request.getGiamGia())
                    .replace("{tongCong}", request.getTongCong())
                    + MailConstant.FOOTER, true);
            mimeMessageHelper.addInline("logoImage", resource);
            mimeMessageHelper.addInline("camOnImage", resource1);
            mimeMessageHelper.addInline("camKetImage", resource2);
            mimeMessageHelper.addInline("lienHeImage", resource3);
            mimeMessageHelper.addInline("theoDoiImage", resource4);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
