import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { LoadingPage } from '../components/journal/LoadingPage'

import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
            
        const auth = getAuth();
        onAuthStateChanged( auth,async (user) => {
           if( user) {
               dispatch(login( user.uid, user.displayName));
               setIsLoggedIn(true)
               
               dispatch(startLoadingNotes(user.uid));
           } else{
               setIsLoggedIn(false)
           }
           setChecking(false);
        })
    
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if(checking) {
        return(
            <LoadingPage/>
        )
    }

    return (

        <Router>
            
                <Switch>
                    <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn}/>
                    <PrivateRoute exact isAuthenticated={isLoggedIn} path="/" component={JournalScreen}/> 
                    <Redirect to="/auth/login" />
                </Switch>
            
        </Router>
    )
}
