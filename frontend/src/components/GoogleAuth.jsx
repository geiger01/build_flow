import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../services/refresh-token-setup.service';
import { userService } from '../services/user.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/user.action';
import { FcGoogle } from "react-icons/fc";
import { alertMessage } from '../services/alert.service'


// refresh token

const clientId =
    '705339567682-tmahsuufu2r3kvk142ve3jcridnr7p0m.apps.googleusercontent.com';

export const GoogleAuth = ({ onToggleAuthModal }) => {

    const dispatch = useDispatch()
    const onSuccess = async (res) => {
        const credentials = {
            fullname: res.profileObj.name,
            username: res.profileObj.email,
            password: res.profileObj.googleId,
            isGoogle: true
        }
        refreshTokenSetup(res);
        onToggleAuthModal(false)

        const user = await userService.signup(credentials)
        if (user) {
            dispatch(setUser())
            alertMessage('Logged in successfully', 'success', 2000)
        }
    };


    const onFailure = () => {
        alertMessage('Something went wrong', 'danger', 2000)
    };

    return (
        <GoogleLogin
            clientId={clientId}
            theme="dark"
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <button className="google-login-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle style={{ fontSize: '1.2rem' }} /> Sign in with Google</button>
            )}
            isSignedIn={false}

        />
    );
}