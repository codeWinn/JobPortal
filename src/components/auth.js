import {Route} from 'react-router-dom'
export const PrivateCandidateRoute = ({ component: Component, ...rest }) => {
     const { location } = rest;
     const role = helper.fetchRole();
     let isCandidate = false;
     if (role == constant.CANDIDATE_ROLE) {
         isCandidate = true;
     }
     const adminRol = isCandidate == true ? true : false;
     return (
         <Route {...rest} render={(props) =>
             adminRol ?
                 <Component {...rest} {...props} /> :
                 <Redirect to={{ 
                     pathname: constant.LOGIN_SCREEN,
                     state: {
                         prevLocation: location
                     }
                 }} />
         } />
     );
 };