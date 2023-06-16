import { Switch, Route, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/signin">
           <Route>SignIn</Route>
        </PublicRoute>
        
        <PrivateRoute>
          <Home path="/"/>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
