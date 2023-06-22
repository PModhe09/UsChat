import React, { useState } from 'react'
import { auth } from '../../misc/firebase'
import { Tag,Icon } from 'rsuite';

const ProviderBlock = () => {
    const [isConnected,setIsConnected]=useState({
        'google.com':auth.currentUser.providerData.some(
            data=>data.providerId==='google.com'
        ),
    });
  return (
    <div>
    {isConnected["google.com"] && 
      <Tag color="red" closable>
      <Icon icon="google"/> Connected
      </Tag>
    }
      {/* {console.log(auth.currentUser)} */}
    
    </div>
  )
}

export default ProviderBlock
