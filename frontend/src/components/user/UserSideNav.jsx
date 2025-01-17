import React from 'react'
import { UserDetails } from './UserDetails'


export const UserSideNav = ({ windowWidth }) => {
    return (
        <div className="user-side-nav">
            <div className="top-user-side-nav-div">
                <h5 className="top-user-side-nav-txt">User Profile</h5>
            </div>
            <UserDetails windowWidth={windowWidth} />
        </div>
    )
}
