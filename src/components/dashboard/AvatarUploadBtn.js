import React, { useState } from 'react'
import { Input,Modal,Button, Alert } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';

const fileInputTypes=".png,.jpeg,.jpg";

const acceptedFileTypes=[
    'image/png',
    'image/jpeg',
    'image/pjpeg'
]

const isValidFile=file=>{
    acceptedFileTypes.includes(file.type);
}

const AvatarUploadBtn = () => {
    const {isOpen,open,close}=useModalState();
    const [img,setImg]=useState(null);
    const onFileInputChange=(ev)=>{
        const currFiles=ev.target.files;
        if(currFiles.length===1){
            const file=currFiles[0];
            if(!isValidFile(file)){
                setImg(file);
                open();
            }
            else{
                Alert.warning(`Wrong file input type ${file.type}`,4000);
            }
        }
        
    }
  return (
    <div className='mt-3 text-center'>
      <div>
        <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
            Select a new display
            <input type="file" className="d-none" id="avatar-upload" accept={fileInputTypes} onChange={onFileInputChange}/>
        </label>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
             <Modal.Title>Upload your displayer!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {img &&
                   ( <AvatarEditor
        image={img}
        width={200}
        height={200}
        border={10}
        borderRadius={100}
        rotate={0}
      />)
                }
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="ghost" block>
                Upload new displayer
              </Button>
            </Modal.Footer>
        </Modal>
      </div>    
    </div>
  )
}

export default AvatarUploadBtn
