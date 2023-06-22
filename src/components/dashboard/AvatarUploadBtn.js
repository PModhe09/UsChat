import React, { useState , useRef} from 'react'
import { Input,Modal,Button, Alert } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../contexts/profile.context';

const fileInputTypes=".png,.jpeg,.jpg";

const acceptedFileTypes=[
    'image/png',
    'image/jpeg',
    'image/pjpeg'
]

const isValidFile=file=>{
    acceptedFileTypes.includes(file.type);
}

const getBlob=(canvas)=>{
    return new Promise((resolve,reject)=>{
    canvas.toBlob((blob)=>{
        if(blob){
           resolve(blob);
        }
        else{
          reject(new Error('File process error'))
        }
    })

})
}

const AvatarUploadBtn = () => {
    const {isOpen,open,close}=useModalState();
    const [img,setImg]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const {profile}=useProfile();
    const avatarEditorRef=useRef();

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
        

    const onUploadClick=async()=>{
       const canvas=avatarEditorRef.current.getImageScaledToCanvas();
       try {
        setIsLoading(true);
        const blob=await getBlob(canvas);
        const avatarFileRef=storage.ref(`/profile/${profile.uid}`).child('avatar');
        const uploadAvatarResult=await avatarFileRef.put(blob,{
            cacheControl:`public,max-age=${3600*24*4}`
        })
        const downloadUrl=await uploadAvatarResult.ref.getDownloadURL();
        const userAvatarRef=database.ref(`/profiles/${profile.uid}`).child('avatar');
        userAvatarRef.set(downloadUrl);
        setIsLoading(true);
        Alert.info("Displayer has been updated",4000);
       } catch (error) {
          setIsLoading(true);
          Alert.error(error.message,4000);
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
        ref={avatarEditorRef}
        width={200}
        height={200}
        border={10}
        borderRadius={100}
        rotate={0}
      />)
                }
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="ghost" block onClick={onUploadClick} disabled={isLoading}>
                Upload new displayer
              </Button>
            </Modal.Footer>
        </Modal>
      </div>    
    </div>
  )
}

export default AvatarUploadBtn
