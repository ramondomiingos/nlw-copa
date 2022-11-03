import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

interface userProps{
    name:string;
    avatarUrl : string;
}
export interface AuthContextDataProps {
    user: userProps;
    isUserLoading: boolean;
    singIn: () => Promise<void>;
}
interface AuthProviderProps {
    children : ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider( { children} : AuthProviderProps){
    const [ isUserLoading, setIsUserLoading] = useState(false);
    const [ user, setUser] = useState<userProps>( {} as userProps)

    const [ request, response, promptAsync ] = Google.useAuthRequest({
        clientId: process.env.clientId,
        redirectUri: AuthSession.makeRedirectUri( { useProxy: true}),
        scopes : [ 'profile', 'email']

    })
  
    async function singIn(){
       try{ 
        setIsUserLoading(true)
        await promptAsync();

       }catch(err){
        console.log(err)
        throw err;
       }
       finally{
        setIsUserLoading(false)
       }

      
    }
    async function signInWithGoogle( access_token :string){
        console.log( "token de autenticacao==>>"+  access_token)
    }
    useEffect ( () =>{
         if(response?.type == 'success' && response.authentication?.accessToken){
             signInWithGoogle(response.authentication.accessToken);

         }
    },[response])
    return (
        <AuthContext.Provider value={{
            singIn,
            isUserLoading,
            user
        }}>
        {children}
        </AuthContext.Provider>
    )

}
