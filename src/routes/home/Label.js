import style from './style.scss';

export const Label = ({ phase }) => {
  return (
    <h1 class={style.Label}>
      {
        phase
          ? [
              `Running: ${ phase.id + 1 } `,
              <span>{phase.type}</span>
            ]
          : 'Stopped'
      }
    </h1>
  );
};
