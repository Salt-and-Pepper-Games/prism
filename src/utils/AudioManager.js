import GameAudioMP3 from '../audio/GameAudio.mp3';
import GameAudioAC3 from '../audio/GameAudio.ac3';
import GameAudioOGG from '../audio/GameAudio.ogg';
import GameAudioM4A from '../audio/GameAudio.m4a';
import AudioInfo from '../audio/GameAudio.json';
import { Howl } from 'howler';

const spriteMap = {};
for (const sprite in AudioInfo.spritemap) {
	spriteMap[sprite] = [
		AudioInfo.spritemap[sprite].start * 1000,
		(AudioInfo.spritemap[sprite].end - AudioInfo.spritemap[sprite].start) * 1000,
		AudioInfo.spritemap[sprite].loop
	];
}

const GameAudio = new Howl({
  src: [GameAudioMP3, GameAudioM4A, GameAudioOGG, GameAudioAC3],
  sprite: spriteMap,
  html5: true,
  volume: 1.0
});

export default GameAudio;