import { Switch, Route, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import SignIn from './pages/SignIn';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/signin">
           <SignIn/>
        </PublicRoute>
        
        <PrivateRoute>
          <Home path="/"/>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
