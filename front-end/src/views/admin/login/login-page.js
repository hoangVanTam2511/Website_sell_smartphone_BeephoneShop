import React, { useEffect, useState } from 'react'
import './login-page.css'
import Logo from '../../../components/partials/components/logo.png'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  useEffect(() => {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()

    let email = document.querySelector('.email')
    let psd = document.querySelector('.password')
    let check = document.querySelector('#rem')
    let msg = document.querySelectorAll('.msg')

    if (email.value === '') {
      msg[0].innerText = 'Vui lòng nhập đúng định dạng email.'
    }
    if (psd.value === '') {
      msg[1].innerText =
        'Vui lòng nhập đúng mật khẩu'
    } else {
      var userLogin = {
        'email' : email.value,
        'password' : psd.value
      }
      msg[0].innerText = ''
      msg[1].innerText = ''
      dispatch(loginUser(userLogin)).then((data) => {
        if( data.payload.id === null || data.payload.id === ""){
        //   toast.error('Đăng nhập không thành công.');
        }else{
          if(data.payload.idRole.ma === 'role2'){
            alert("Bạn không có quyền truy cập hệ thống.Vui lòng liên hệ quản trị viên.")
          }else{
            alert("Đăng nhập thành công")
            navigate('/home')
          }
        }
      })
    }

    email.value = ''
    psd.value = ''
    check.checked = ''
  }
  return (
    <>
      <div className='body'>
        <img src={Logo} class='logo' />

        <form onsubmit='refresh(); return false'>
          <h3>Đăng nhập</h3>

          <div class='inputbox'>
            <label>Nhập email của bạn</label>
            <input type='text' class='email' />
            <p class='msg'></p>
          </div>

          <div class='inputbox'>
            <label>Nhập mật khẩu</label>
            <input type='password' class='password' />
            <p class='msg'></p>
          </div>

          <input
            type='submit'
            value='Đăng nhập'
            onClick={e => login(e)}
            class='submit'
          />

          <div class='helpBox'>
            <div class='checkBox' style={{ marginLeft: '9px' }}>
              <input type='checkbox' id='rem' />
              <label for='rem'>Nhớ mật khẩu</label>
            </div>

            <a href='##'>Quên mật khẩu</a>
          </div>

          <p class='sign'>
            Bạn chưa có tài khoản
            <a style={{ marginLeft: '5px' }} href='##'>
              Đăng kí ngay
            </a>
            .
          </p>

          <p class='msg'>
            BEEPHONE-version 1.0.0 - 2023
            <a href='##'>Learn more.</a>
          </p>
        </form>

        <i
          class='fa fa-youtube-play'
          style={{ fontSize: `1.2em` }}
          title='youtube channel...'
        >
          {' '}
          <a href='https://www.youtube.com/@MR.shortzed333' target='_blank'>
            Youtube
          </a>
        </i>
      </div>
    </>
  )
}
export default LoginPage
