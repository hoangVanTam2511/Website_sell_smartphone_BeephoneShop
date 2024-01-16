package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.models.request.NotificationRequest;
import beephone_shop_projects.core.client.repositories.NotificationClientRepository;
import beephone_shop_projects.entity.ThongBao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NotificationServiceImpl {

    @Autowired
    private NotificationClientRepository notificationClientRepository;

    public void addNotification(NotificationRequest notificationRequest){

        ThongBao thongBao = new ThongBao();
        thongBao.setDuongDan(notificationRequest.getDuongDan());
        thongBao.setNoiDung(notificationRequest.getNoiDung());
        thongBao.setTieuDe(notificationRequest.getTieuDe());

        notificationClientRepository.save(thongBao);
    }

    public ArrayList<ThongBao> getAllNotification(){
        return (ArrayList<ThongBao>) notificationClientRepository.findAll();
    }
}
