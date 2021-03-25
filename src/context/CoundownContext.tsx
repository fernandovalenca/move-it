import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface ICoundownContextData {
  time: number;
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: ()=> void;
  resetCountdown: ()=> void;
}

interface ICoundownProvider {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CoundownContext = createContext({} as ICoundownContextData);

export function CoundownProvider({ children }: ICoundownProvider){
  const minutesInSeconds = 1500;
  const oneMinuteInSeconds = 60;

  const [time, setTime] = useState(minutesInSeconds );
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / oneMinuteInSeconds);
  const seconds = time % oneMinuteInSeconds;

  const { startNewChallenge } = useContext(ChallengesContext);

  const startCountdown = useCallback(()=>{
    setIsActive(true);
  },[]);

  const resetCountdown = useCallback(()=>{
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(minutesInSeconds);
  },[])

  useEffect(()=>{
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    };
  },[isActive, time])

  return(
    <CoundownContext.Provider value={{
      time,
      minutes,
      seconds,
      isActive,
      hasFinished,
      startCountdown,
      resetCountdown
    }}>
      { children }
    </CoundownContext.Provider>
  )
}