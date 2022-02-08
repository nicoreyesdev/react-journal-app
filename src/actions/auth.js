import {  createUserWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider} from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';
 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                console.log(e.code);
                Swal.fire(
                'Error',
                e.code === 'auth/user-not-found'?'User not found':'Password is wrong',
                'error')
            })
    }
}

export const startLoginWithForm = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {

                await updateProfile( user, {displayName: name});
            })
            .catch( e=> {
                Swal.fire(
                    'Error',
                    'Email already in use',
                    'error')
            })

    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
            
        dispatch(logout());
        dispatch(noteLogout());
            
    } 
}

export const logout = () => ({
    type: types.logout
})