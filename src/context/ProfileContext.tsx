import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ChallengesContext } from "./ChallengesContext";

interface IProfileContextData {
  name: string;
  avatar_url: string;
  resetUser: ()=> void;
}

interface IProfileProvider {
  children: ReactNode;
  name: string;
  avatar_url: string;
}

interface IResponse {
  name: string;
  avatar_url: string;
}

export const ProfileContext = createContext({ } as IProfileContextData);

export const ProfileProvider = ({ children , ...rest }: IProfileProvider) => {
  const [name, setName] = useState(rest.name);
  const [avatar_url, setAvatar_url] = useState(rest.avatar_url);
  const { resetLevel } = useContext(ChallengesContext);

  useEffect(()=>{
    if(!name) {
      getUserGithub();
    }
  },[]);

  const resetUser = useCallback(()=>{
    Cookies.remove("name");
    Cookies.remove("avatar_url");
    
    resetLevel();
    getUserGithub();
  },[])

  const getUserGithub = useCallback(async ()=>{
    try {
      const response = await axios.get<IResponse>(`https://api.github.com/users/${prompt('Digite o login do Github:')}`);
      
      setAvatar_url(response.data.avatar_url);
      Cookies.set("avatar_url", response.data.avatar_url);
      response.data.name ? 
        (setName(response.data.name), Cookies.set("name", response.data.name))
        : (setName("Default"), Cookies.set("name", "Default"))
    } catch (error) {
      console.log(error)
    }
  },[]);

  return (
    <ProfileContext.Provider value={{ name, avatar_url, resetUser }}>
      { children }
    </ProfileContext.Provider>
  )
}