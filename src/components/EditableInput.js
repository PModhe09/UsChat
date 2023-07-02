import React, { useCallback, useState } from 'react'
import { Input,Icon,InputGroup, Alert} from 'rsuite'

const EditableInput = ({initalValue,onSave,label=null,placeholder="Your NickName ?",emptyMsg="Input is empty",WrapperClassName='',...InputProps}) => {
    const [input,setInput]=useState(initalValue);
    const [isEditable,setIsEditable]=useState(false);
    const onInputChange=useCallback((value)=>{
        setInput(value);
    },[]);
    const onEditClick=useCallback(()=>{
        setIsEditable(p=>!p);
        setInput(initalValue);
    },[initalValue])
    const onSaveClick= async()=>{
        const trimmed=input.trim();
        if(trimmed===''){
            Alert.info(emptyMsg,4000)
        }
        if(trimmed!=initalValue){
            await onSave(trimmed);
        }
    }
  return (
    <div className={WrapperClassName}>
      {label}
      <InputGroup>
      <Input {...InputProps} placeholder={placeholder} value={input} onChange={onInputChange} disabled={!isEditable}/>
      <InputGroup.Button onClick={onEditClick}>
        <Icon icon={isEditable?'close' : 'edit2'}/>
      </InputGroup.Button>
      {isEditable && (
        <InputGroup.Button onClick={onSaveClick}>
        <Icon icon="check"/>
      </InputGroup.Button>
      )}
      </InputGroup>

      {input}
    </div>
  )
}

export default EditableInput
