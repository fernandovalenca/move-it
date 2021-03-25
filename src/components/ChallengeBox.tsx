import { useCallback, useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { CoundownContext } from '../context/CoundownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CoundownContext);

  const handleChallengeSucceeded = useCallback(()=>{
    resetCountdown();
    completeChallenge();
  },[completeChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(()=>{
    resetCountdown();
    resetChallenge();
  },[resetCountdown, resetChallenge]);

  return(
    <div className={ styles.challengeBoxContainer }>
      { activeChallenge ? (
        <div className={ styles.challengeActive }>
          <header>Ganhe { activeChallenge.amount } xp</header>
          <main>
            <img src={`assets/icons/${ activeChallenge.type }.svg`} alt="Desafio"/>
            <strong>Novo desafio</strong>
            <p>
              { activeChallenge.description }
            </p>
          </main>
          <footer>
              <button
                type="button"
                className={ styles.challengeFailedButton }
                onClick={ handleChallengeFailed }
              >
                Falhei
              </button>
              <button
                type="button"
                className={ styles.challengeSucceededButton }
                onClick={ handleChallengeSucceeded }
              >
                Completei
              </button>
            </footer>
        </div>
      ) : (
        <div className={ styles.challengeNotActive }>
          <strong>
            Finalize um ciclo para receber um desafio
          </strong>
          <p>
            <img src="assets/icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}