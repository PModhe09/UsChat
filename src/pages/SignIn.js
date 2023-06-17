import { Container,Grid, Panel,Row,Col, Button, Icon, Alert } from "rsuite"
import {auth,database} from '../misc/firebase'
import firebase from "firebase/app"

const SignIn = () => {
    const signInWithProvider=async (provider)=>{

       try{
           const {additionalUserInfo,user}=await auth.signInWithPopup(provider);
        //    console.log(additionalUserInfo.isNewUser);
           if(additionalUserInfo.isNewUser){
            // console.log("inside if");
             await database.ref(`/profiles/${user.uid}`).set({
                name:user.displayName,
                createdAt:firebase.database.ServerValue.TIMESTAMP,
             })
           }
           Alert.success('Signed In',4000);
          }catch(err){
              Alert.error(err.message,4000);
          }
    
    };
    const onGoogleSignIn=()=>{
        signInWithProvider(new firebase.auth.GoogleAuthProvider());

    }
  return (
    <div>
      <Container>
       <Grid className="mt-page">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
                <Panel>
                   <div className="text-center">
                      <h2 >Thanks for Coming to UsChat!</h2>
                      <p>Progressive Web Chat platform built for Every device..!</p>
                   </div>
                   <div className="mt-3">
                       <Button block color="red" onClick={onGoogleSignIn}>
                          <Icon icon="google"/> SignIn with Google
                        </Button>
                   </div>
                </Panel>
            </Col>
          </Row>
       </Grid>
      </Container>
    </div>
  )
}

export default SignIn
