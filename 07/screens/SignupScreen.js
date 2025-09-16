import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { createUser } from '../utils/auth'
import { AuthContext } from '../store/auth-context';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Authentication failed', 
        'Could not create user'
      )
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay message="Creating user ..."/>
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
