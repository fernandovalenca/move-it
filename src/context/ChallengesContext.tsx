import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Cookie from 'js-cookie';

import { LevelUpModal } from "../components/LevelUpModal";

import challenges from '../../challenges.json';

interface IChallengesProvider {
  children: ReactNode;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

interface IChallenge {
  type: string;
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallenge;
  levelUp: ()=> void;
  closeLevelUpModal: ()=> void;
  startNewChallenge: ()=> void;
  completeChallenge: ()=> void;
  resetChallenge: ()=> void;
  resetLevel: ()=> void;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({ children, ...rest }: IChallengesProvider) {
  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=>{
    Cookie.set('level', level.toString());
    Cookie.set("challengesCompleted", challengesCompleted.toString());
    Cookie.set("currentExperience", currentExperience.toString());
  },[level, challengesCompleted, currentExperience]);

  const resetLevel = useCallback(()=>{
    setLevel(1);
    setCurrentExperience(0);
    setCurrentExperience(0);
  },[])

  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  const levelUp = useCallback(()=>{
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  },[]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelModalOpen(false);
  },[]);

  const startNewChallenge = useCallback(()=>{
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    new Audio('/assets/notification.mp3');

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `valendo ${ challenge.amount }xp!`,
        icon: 'assets/favicon.png',
        vibrate: [200, 100, 200],
      })
    }
    
    setActiveChallenge(challenge);
  },[])

  const completeChallenge = useCallback(()=>{
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  },[activeChallenge])

  const resetChallenge = useCallback(()=>{
    setActiveChallenge(null);
  },[])

  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        closeLevelUpModal,
        levelUp,
        startNewChallenge,
        completeChallenge,
        resetChallenge,
        resetLevel,
      }}
    >
      {children}

      { isLevelModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}