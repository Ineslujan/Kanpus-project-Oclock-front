import React, {useEffect, useContext} from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { test } from '../../requests/test'

export default function Group() {

    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    // useEffect(() => {
    //     const test = async () => {
    //         const datas = await test(authentication.token);
    //         if(datas.status === 200){
    //             setAuthentication(...authentication,
    //                 authentication.token = datas.headers.authorization,)
    //             console.log(datas.data)
    //         }
    //     } 
    //     test();
    // }, [])
    
const load = async ()=> {
    const datas = await test(authentication.token);
    if(datas.status === 200){
        setAuthentication({
            role: authentication.role,
            token: datas.headers.authorization
        })
        console.log(datas)
        
    } 
    console.log(datas)
}

  return (
    <div>{authentication.token}
    <button onClick={load}>test</button>
    </div>
  )
}
