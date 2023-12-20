package beephone_shop_projects.core.client.servies.impl;

import beephone_shop_projects.core.client.models.request.AddressRequest;
import beephone_shop_projects.core.client.repositories.AccountClientRepository;
import beephone_shop_projects.core.client.repositories.AddressClientRepository;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AddressClientServiceImpl {

    @Autowired
    private AddressClientRepository addressClientRepository;

    @Autowired
    private AccountClientRepository accountClientRepository;

    public ArrayList<?> findAddressById(String id){
        return addressClientRepository.findAddressById(id);
    }

    public String addNewAddress(AddressRequest req){
        Account account = accountClientRepository.findById(req.getId()).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        DiaChi diaChi = new DiaChi();
        diaChi.setAccount(account);
        diaChi.setDiaChi(req.getStress());
        diaChi.setXaPhuong(req.getWard());
        diaChi.setQuanHuyen(req.getDistrict());
        diaChi.setTinhThanhPho(req.getProvince());

        addressClientRepository.save(diaChi);
        return "Thành công";
    }

    public String deleteAddress(String id){
        DiaChi diaChi = addressClientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy địa chỉ"));

        diaChi.setDelected(false);
        addressClientRepository.save(diaChi);
        return "Thành công";
    }

}
