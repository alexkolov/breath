import { h } from 'preact'
import style from './style.scss';

export const TimeSelector = ({ seconds, onChange }) => {
  return (
    <div class={style.TimeSelector}>
      <div class={style.Value}>
        <input value={seconds / 60} readOnly />
      </div>

      <input
        value={seconds}
        onChange={() => onChange(event.target.value)}
        min="30"
        max="3600"
        step="30"
        type="range"
        class={style.RangeSelector}
      />
    </div>
  )
};
