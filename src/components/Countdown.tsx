import { useContext } from 'react';
import { CoundownContext } from '../context/CoundownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { minutes, seconds, isActive, hasFinished, startCountdown, resetCountdown } = useContext(CoundownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return(
    <div>
      <div className={ styles.countdownContainer }>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { hasFinished ? (
        <button
          disabled
          type="button"
          className={ styles.countdownButton }
        >
          Ciclo finalizado
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/>
          </svg>
        </button>
      ) : (
        < >
          { isActive ? (
            <button type="button"
                className={ `${ styles.countdownButton } ${ styles.countdownButtonActive }` }
                onClick={ resetCountdown }
              >
              Abandonar ciclo
            </button>
            ) : (
            <button type="button"
              className={ styles.countdownButton }
              onClick={ startCountdown }
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}