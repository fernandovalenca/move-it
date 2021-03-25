import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { ChallengesProvider } from "../context/ChallengesContext";
import { CoundownProvider } from "../context/CoundownContext";

import styles from '../styles/components/Home.module.css';
import { ProfileProvider } from "../context/ProfileContext";

interface IHomeProps {
  name: string;
  avatar_url: string;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

export default function Home({ level, currentExperience, challengesCompleted, name, avatar_url }: IHomeProps) {
  return(
    <ChallengesProvider level={level} currentExperience={currentExperience} challengesCompleted={challengesCompleted} >
      <ProfileProvider name={name} avatar_url={avatar_url}>
        <div className={ styles.container }>
          <Head>
            <title>Início | Move.it</title>
          </Head>
          <ExperienceBar />

          <CoundownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
          </CoundownProvider>
        </div>
      </ProfileProvider>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level = 1, challengesCompleted = 0, currentExperience = 0, name = '', avatar_url = '/assets/favicon.png' } = ctx.req.cookies;

  return {
    props: {
      name,
      avatar_url,
      level: Number(level),
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
    }
  }
}
