import React, { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience / experienceToNextLevel * 100);

    return (
        <header className={ styles.experienceBar }>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${ percentToNextLevel }%` }} />
                
                {
                currentExperience > 0 && 
                <span className={ styles.currentExperience } style={{ left: `${ percentToNextLevel }%` }}>
                    { currentExperience } xp
                </span>
                }
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    )
}