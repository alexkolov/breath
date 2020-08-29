import NoSleep from 'nosleep.js';
import { useState } from 'preact/hooks';
import style from './style';
import beepAudio from '../../assets/beep.mp3'

const noSleep = new NoSleep();
const beep = new Audio(beepAudio);

const phases = [
	{
		id: 0,
		type: 'inhale',
		length: 6
	},
	{
		id: 1,
		type: 'exhale',
		length: 6
	}
];

let counter;

const Label = ({ phase }) => {
	console.log('in Label', phase);
	return (
		phase
		? <h1>
				Running: #{ phase.id + 1 } <span>{phase.type}</span>
			</h1>
		: <h1>Stopped</h1>
	)
};

const Home = () => {
	console.log('Version 0.2');
	const [phase, setPhase] = useState(null);

	const run = (index) => {
		console.log('running: ', index);
		beep.play();
		setPhase(phases[index]);
		counter = setTimeout(
			() => {
				const nextIndex = phases[index + 1] ? index + 1 : 0;
				console.log('nextIndex', nextIndex);
				run(nextIndex);
			},
			phases[index].length * 1000
		);
		console.log('counter in run', counter);
	};

	const stop = () => {
		setPhase(null);
		console.log('counter in stop', counter);
		if (counter) {
			console.log('closing');
			clearTimeout(counter);
		}
	};

	const toggle = () => {
		console.log('toggle');

		if (!phase) {
			noSleep.enable();
			run(0);
		} else {
			noSleep.disable();
			stop();
		}
	};

	return (
		<div class={style.home}>
			<Label phase={phase} />

			<button
				onClick={ toggle }
			>
				Toggle
			</button>
		</div>
	);
}

export default Home;
