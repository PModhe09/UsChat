import React, { useCallback } from 'react'
import { Button,Drawer,Icon,Alert } from 'rsuite'
import { useMediaQuery, useModalState } from '../../misc/custom-hooks'
import  Dashboard  from '.';
import { auth } from '../../misc/firebase';


const DashBoardToggle = () => {
  const {isOpen,close,open}=useModalState();
  const isMobile=useMediaQuery('(max-width:992px)');

  const onSignOut=useCallback(()=>{
    console.log("inside")
    auth.signOut();
    Alert.info('Signed out from device',4000);
    close();
  },[close])
  return (
    <>
        <Button block color="blue" onClick={open}>
            <Icon icon="dashboard"/>Profile
        </Button>
        <Drawer full ={isMobile} show={isOpen} onHide={close} placement='left'>
               <Dashboard onSignOut={onSignOut}/>
        </Drawer>

    </>
  )
}

export default DashBoardToggle
