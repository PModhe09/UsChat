import { Redirect,Route} from "react-router-dom/cjs/react-router-dom.min"
import { useProfile } from "../contexts/profile.context";

const PublicRoute   = ({children,...routeProps}) => {
  const {profile}=useProfile(); 
  if(profile){
    return(
        <Redirect to="/"/>
    )
  }
  return (
          <Route {...routeProps}>{children}</Route>
  )
}

export default PublicRoute;
