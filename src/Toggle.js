import React, { useState } from 'react';
import SideBar from './components/SideBar';
import Sidebar2 from'./components/Sidebar2';

const Toggle=(props)=>{
    return(
        <>
        {props.menu?
        <SideBar/>:
        <Sidebar2/>
}
        </>
    )
}

export default Toggle;