import NoSleep from 'nosleep.js';
import { useState } from 'preact/hooks';
import { phases } from '../../data/programs';
import { Program } from '../../utils/program';
import { Label } from './Label';
import { TimeSelector } from './TimeSelector';
import { ToggleButton } from './ToggleButton';
import style from './style.scss';
import beepAudio from '../../assets/beep.mp3'

const noSleep = new NoSleep();
const beep = new Audio(beepAudio);
const program = new Program(phases, 90);
let counter;

const Home = () => {
	const [state, setState] = useState(program.state);

	const updateTimeTotal = (seconds) => {
		program.timeTotal = seconds;
		setState(program.state);
	};

	const run = () => {
		if (program.forward()) {
			beep.play();
			counter = setTimeout(
				() => run(),
				program.currentPhase.length * 1000
			);
		}
		setState(program.state);
	};

	const stop = () => {
		program.stop();
		setState(program.state);
		if (counter) {
			clearTimeout(counter);
		}
	};

	const toggle = () => {
		if (!program.isActive) {
			noSleep.enable();
			run();
		} else {
			noSleep.disable();
			stop();
		}
	};

	return (
		<div class={style.Home}>
			<div class={style.Middle}>
				<Label phase={state.currentPhase} />
				<TimeSelector
					seconds={state.timeStats.timeTotal}
					onChange={updateTimeTotal}
				/>
			</div>

			<div class={style.Bottom}>
				<ToggleButton
					onToggle={toggle}
					icon={state.isActive ? 'break' : 'play'}
				/>
			</div>
		</div>
	);
}

export default Home;
