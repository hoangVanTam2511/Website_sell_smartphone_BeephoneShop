import React from 'react'
import logo from './1.png'
import { stepClasses } from '@mui/material'
const Logo = (props ) => {
    
    return (
        <img src={logo} style={{width:100,transform:`translateX(${80}px)`}} alt="Logo" />
        )
    }
    
    export default Logo
