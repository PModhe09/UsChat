import { Button, Drawer } from "rsuite"
import { useMediaQuery, useModalState } from "../../../misc/custom-hooks"
import EditableInput from "../../EditableInput";
import { useCurrentRoom } from "../../../contexts/current-room.context";
import { memo } from "react";
import { database } from "../../../misc/firebase";
import {useParams} from 'react-router-dom';
import {Alert} from "rsuite";
const EditRoomBtnDrawer = () => {
    const {isOpen,open,close}=useModalState();
    const {chatId}=useParams()
    const name=useCurrentRoom(v=>v.name);
    const description=useCurrentRoom(v=>v.description);
    const isMobile=useMediaQuery('(max-width:992px)');

    const updateData=(key,value)=>{
         database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>
           Alert.success('Room Info successfully updated',4000)
         )
         .catch(err=>{
            Alert.error(err.message,4000);
         })
    }

    const onDescriptionSave=(newDescription)=>{
       updateData('description',newDescription);
    }

    const onNameSave=(newName)=>{
       updateData('name',newName);
    }
  return (
    <div>
       <Button className="br-circle" size="sm" color="red" onClick={open}>
         A
       </Button>
       <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
           <Drawer.Header>
              <Drawer.Title>Edit Room</Drawer.Title>
           </Drawer.Header>
           <Drawer.Body>
                <EditableInput initalValue={name} onSave={onNameSave} label={<h6 className="mb-2">Name</h6>} emptyMsg="Name can not be empty"/>
                <EditableInput componentClass="textarea" rows={5} initalValue={description} onSave={onDescriptionSave} emptyMsg="Description can not be empty" WrapperClassName="mt-3"/>
           </Drawer.Body>
           <Drawer.Footer>
              <Button block onClick={close}>
                Close
              </Button>
           </Drawer.Footer>
       </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnDrawer)
