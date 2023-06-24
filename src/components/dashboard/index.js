import React from 'react'
import { Drawer,Button, Divider ,Alert} from 'rsuite';
import { useProfile } from '../../contexts/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdates } from '../../misc/helpers';

const DashBoard = ({onSignOut}) => {
  const {profile}=useProfile();

  const onSave = async newData => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newData,
        database
      );

      await database.ref().update(updates);

      Alert.success('Nickname has been updated', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
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
       <AvatarUploadBtn/>
       <ProviderBlock/>
       <Divider/>
       <EditableInput
        name="nickname"
        initialValue={profile.name}
        onSave={onSave}
        label={<h6 className='mb-2'>NickName</h6>}
       />
    </Drawer.Body>
    <Drawer.Footer>
      <Button block color='red' onClick={onSignOut} >SignOut</Button>
    </Drawer.Footer>
    </>

  )
}

export default DashBoard;
