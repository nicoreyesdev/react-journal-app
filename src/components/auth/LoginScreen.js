
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import isEmail from 'validator/lib/isEmail'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    
    const {msgError} = useSelector(state => state.ui)

    const {loading} = useSelector( state => state.ui)

    const [formValues, handleInputChange ] = useForm({
        email: '',
        password: '' 
    })

    const {email, password} = formValues;

    const isFormValid = () =>{
        if (!isEmail(email)) {
            dispatch(setError('Email not valid'))
            return false;
        } else if (password.length <= 5){
            dispatch(setError('Password must be 6 characters long and match'))
            return false;
        }
        dispatch(removeError());
        return true;
    }

    const handleLogin = (e)=> {
        e.preventDefault();
        if(isFormValid()) {
            dispatch( startLoginEmailPassword(email, password));
        } 
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    
    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form className="animate__animated animate__fadeIn animate__faster" onSubmit={handleLogin}>
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
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <button className='btn btn-primary btn-block' type='submit' disabled= {loading}>
                Login
                </button>
                <div className='auth__social-networks'>
                    <p>Login with social networks</p>
                    
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>
                <Link className="link" to="/auth/register">Create new account</Link>
            </form>
        </>
    )
}
