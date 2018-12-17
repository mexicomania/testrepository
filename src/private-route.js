import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import welcome from './components/welcome/welcome';

const PrivateRoute = ({ component: Component, authed,location, ...rest }) => {
  const { isLoggedIn } = authed;

    class PrivateRoute1 extends React.Component{
    
    render(){
      return(
        (authed) ? (
          <Route {...rest} render={props => (<Component {...props} />)}/>
        ) : (<Route {...rest} component={welcome}/>)
      )
    };
  }

  return <PrivateRoute1 />;

//     return  (
//   <Route
//     {...rest}
//     render={props => (
//         authed
//             ? <Component {...props} />
//             : <Redirect to="/" />
//     )}
//   />
// )
};

export default PrivateRoute;