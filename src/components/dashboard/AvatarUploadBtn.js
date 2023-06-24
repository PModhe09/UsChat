import React, { useState , useRef} from 'react'
import { Input,Modal,Button, Alert } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../contexts/profile.context';
import ProfileAvatar from './ProfileAvatar';
import { getUserUpdates } from '../../misc/helpers';

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
        

     const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    
        setIsLoading(true);
        try {
          const blob = await getBlob(canvas);
    
          const avatarFileRef = storage
            .ref(`/profile/${profile.uid}`)
            .child('avatar');
    
          const uploadAvatarResult = await avatarFileRef.put(blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
    
          const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
    
          const updates = await getUserUpdates(
            profile.uid,
            'avatar',
            downloadUrl,
            database
          );
    
          await database.ref().update(updates);
    
          setIsLoading(false);
          Alert.info('Avatar has been uploaded', 4000);
        } catch (err) {
          setIsLoading(false);
          Alert.error(err.message, 4000);
        }
      };
  return (
    <div className='mt-3 text-center'>
     <ProfileAvatar src={profile.avatar} name={profile.name}  className="width-200 height-200 img-fullsize font-huge" />
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
            <div className="d-flex justify-content-center align-items-center h-100">
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
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="ghost" block onClick={onUploadClick} disabled={isLoading}>
                Upload new displayer
              </Button>
            </Modal.Footer>
        </Modal>
       
      </div>    
      {/* <ProfileAvatar src={profile.avatar} name={profile.name} /> */}
    </div>
  )
}

export default AvatarUploadBtn
