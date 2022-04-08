import React, { useContext } from 'react'
import { AuthenticationContext } from '../../context/authenticationContext'

export default function Trainee() {
    const { authentication } = useContext(AuthenticationContext);

    return (
        <div>
            {authentication}
        </div>
    )
}
