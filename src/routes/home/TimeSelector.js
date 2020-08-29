import style from './style.scss';

export const TimeSelector = ({ seconds, onChange }) => {
  return (
    <div class={style.TimeSelector}>
      <input value={seconds / 60} readOnly />
      <input
        onChange={() => onChange(event.target.value)}
        min="30"
        max="3600"
        step="30"
        type="range"
      />
    </div>
  )
};
