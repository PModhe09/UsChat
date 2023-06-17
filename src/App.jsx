import { Switch, Route, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import SignIn from './pages/SignIn';
import { ProfileProvider } from './contexts/profile.context';


function App() {
  return (
    <BrowserRouter>
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
           <SignIn/>
        </PublicRoute>
        
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
