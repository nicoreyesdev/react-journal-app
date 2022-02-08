import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import { startLoginWithForm } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) =>{
        e.preventDefault();

        if(isFormValid()) {
            dispatch(startLoginWithForm(email, password, name))
        }
    }

    const isFormValid = () =>{
        if(name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false;
        } else if (!isEmail(email)) {
            dispatch(setError('Email not valid'))
            return false;
        } else if (password !== password2 || password.length <= 5){
            dispatch(setError('Password must be 6 characters long and match'))
            return false;
        }
        dispatch(removeError());
        return true;
    }
    
    return (
        <>
            <h3 className='auth__title'>Create new account</h3>
            <form className="animate__animated animate__fadeIn animate__faster">
                
                {
                    msgError && 
                    (
                        <div className='auth__alert-error'>
                        {msgError}
                        </div>
                    )
                }

                <input
                        type="text"
                        placeholder='Name'
                        name='name'
                        className='auth__input'
                        autoComplete='off'
                        value= {name}
                        onChange={handleInputChange}
                />
                
                <input
                    type="text"
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value= {email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value= {password}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    className='auth__input'
                    value= {password2}
                    onChange={handleInputChange}
                />
                <button className='btn btn-primary btn-block mb-5' type='submit' onClick={handleRegister}>
                Register me!
                </button>
    
                <Link className="link" to="/auth/login">Already registered?</Link>
            </form>
        </>
    )
}
