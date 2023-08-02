import React from 'react'
import { Dropdown, Button, ButtonToolbar, Popover, IconButton as IconButtonRs, Whisper } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import style from './style1.css'
import 'rsuite/dist/rsuite-no-reset.min.css';

export default function DropDownFilter() {
  //Api dropdown: https://rsuitejs.com/components/dropdown/
  //Install: npm i rsuite

  const renderMenuSort = ({ onClose, left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu style={{ backgroundColor: "white", boxShadow: "0 0.2rem 0.8rem #00000080" }} className='p-3 dropdown-menu-sort'>
          <a class="c-btnbox">
            <span className=''>Phổ biến</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Giá tăng</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Giá giảm</span>
          </a>
          <div class="filter-button ">
            <span class="btn-filter-close">Đóng</span>
            <span class="btn-filter-readmore" style={{ marginLeft: "6px" }}>Xem kết quả</span
            >
          </div>
        </Dropdown.Menu>
      </Popover>
    );
  };
  const renderMenuPrice = ({ onClose, left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu className='p-3 dropdown-menu-price'>
          <a class="c-btnbox">
            <span className=''>Từ 1 - 3 triệu</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Từ 3 - 5 triệu</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Từ 5 - 7 triệu</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Từ 7 - 10 triệu</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Từ 10 - 15 triệu</span>
          </a>
          <a class="c-btnbox">
            <span className=''>Trên 15 triệu</span>
          </a>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const renderMenuBrand = ({ onClose, left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu className='p-3 dropdown-menu-brand'>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/Realme42-b_37.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg"
              width="68"
              height="30"
            />
          </a>
          <a class="c-btnbox filter-manu">
            <img
              src="//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg"
              width="68"
              height="30"
            />
          </a>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <>
      <div className='mt-3 d-flex'>
        <Whisper placement="bottomStart" trigger="click" speaker={renderMenuBrand}>
          <div className='filter'>
            <div class="filter-item rounded-2">
              <span>Hãng</span>
              <ArrowDownIcon className='text-dark' />
            </div>
          </div>
        </Whisper>
        <Whisper placement="bottomStart" trigger="click" speaker={renderMenuPrice}>
          <div className='filter' style={{ marginLeft: "12px" }}>
            <div class="filter-item rounded-2">
              <span>Mức giá</span>
              <ArrowDownIcon className='text-dark' />
            </div>
          </div>
        </Whisper>
        <Whisper placement="bottomStart" trigger="click" speaker={renderMenuSort}>
          <div className='filter' style={{ marginLeft: "12px" }}>
            <div class="filter-item rounded-2">
              <span>Sắp xếp</span>
              <ArrowDownIcon className='text-dark' />
            </div>
          </div>
        </Whisper>
      </div>
    </>
  )

}
