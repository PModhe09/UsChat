import React from 'react'
import { Drawer,Button } from 'rsuite';
import { useProfile } from '../../contexts/profile.context';

const DashBoard = ({onSignOut}) => {
  const {profile}=useProfile();
  return (
    <>
    <Drawer.Header>
         <Drawer.Title>
           Dashboard
         </Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
    {/* {console.log(profile.name)} */}
       <h3>Hi , {profile.name}</h3>
    </Drawer.Body>
    <Drawer.Footer>
      <Button block color='red' onClick={onSignOut} >SignOut</Button>
    </Drawer.Footer>
    </>

  )
}

export default DashBoard;
