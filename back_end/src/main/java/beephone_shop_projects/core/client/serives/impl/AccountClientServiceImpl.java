package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.client.models.request.AccountLoginRequest;
import beephone_shop_projects.core.client.repositories.AccountClientRepository;
import beephone_shop_projects.core.client.repositories.CartClientRepository;
import beephone_shop_projects.core.client.repositories.CartDetailClientRepository;
import beephone_shop_projects.core.client.serives.AccountClientService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.GioHang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
public class AccountClientServiceImpl implements AccountClientService {

    @Autowired
    private AccountClientRepository accountClientRepository;


    @Autowired
    private CartDetailClientRepository cartDetailClientRepository;

    @Autowired
    private CartClientRepository cartClientRepository;

    @Override
    public Account checkEmailAndPass(AccountLoginRequest accountLoginRequest) {
        Account account = accountClientRepository.checkEmailAndPass(accountLoginRequest.getEmail(), accountLoginRequest.getPassword());
        if(account != null){
            return account;
        }else{  
           throw new RuntimeException("Email hoặc mật khẩu không đúng");
        }
    }

    public Account getAccountByIDAccount(String idAccount){
        return accountClientRepository.findById(idAccount).isPresent()?accountClientRepository.findById(idAccount).get():null;
    }

    public Account createAccountAnonymous(){
        Account account = accountClientRepository.findByMa();
        if(account == null){
            accountClientRepository.save(new Account());
            account = accountClientRepository.findByMa();
        }
            else{
                GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(account.getId());
                if(gioHang != null){
                    cartDetailClientRepository.deleteGioHangChiTietByIdGioHang(gioHang.getId());
                }
            }
        return account;
    }

    public Account login(AccountLoginRequest accountLoginRequest) {
        Account account = accountClientRepository.checkEmailAndPass(accountLoginRequest.getEmail(), accountLoginRequest.getPassword());
        if(account != null){
            return account;
        }else{
            throw new RuntimeException("Email hoặc mật khẩu không đúng");
        }
    }

//    public UserDto login(CredentialsDto credentialsDto) {
//        User user = userRepository.findByLogin(credentialsDto.getLogin())
//                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
//
//        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
//            return userMapper.toUserDto(user);
//        }
//        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
//    }

    public Account findByEmail(String email){
        return accountClientRepository.findByEmail(email);
    }

}
