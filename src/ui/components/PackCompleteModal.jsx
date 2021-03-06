import React from 'react';
import GameAudio from '../../utils/AudioManager';
import { withRouter } from 'react-router';
import startCase from 'lodash.startcase';

const PackCompleteModal = ({
	isOpen,
	currentPack,
	userLevelData,
	returnToMainScreen,
	restartPack,
	restartLevel,
	soundOn,
	startTransition,
	stopTransition,
	history
}) => {

	return (
		<div>
			<div className={`${isOpen ? 'open' : 'hidden'} pack${currentPack ? currentPack.packColor : '-'}bg pack-complete-modal-overlay`}/>
			<div className={`${isOpen ? 'open' : 'hidden'} pack-complete-modal pack${currentPack ? currentPack.packColor : ''}`}>
				<div className={`pack-complete-modal-inner${currentPack ? currentPack.packColor === 'white' ? '-white' : '' : ''} game-wrapper-${currentPack ? currentPack.packColor : ''}`}>
					<div className="pack-complete-text-wrapper">
						<p className='pack-complete-text'>{`${currentPack ? startCase(currentPack.packName) : '...'} pack completed.`}</p>
						<p className='pack-complete-percentage'>{`0%`}</p>
						<p className='pack-complete-percentage-label'>{`Perfection`}</p>
					</div>
					<div className="pack-complete-modal-btn">
						<div className='pack-complete-btn-wrapper'>
							<p className="pack-complete-text btn-label">Home</p>
							<i
								className="pack-complete-exit-btn fa fa-sign-out fa-flip-horizontal"
								onClick={() => {
									GameAudio.stop();
									startTransition();
									const id = GameAudio.play('exit_game');
									GameAudio.volume(soundOn ? .5 : 0.0, id);
									GameAudio.on('end', () => {
										stopTransition();
									}, id);
									returnToMainScreen(history);
								}}
							/>
						</div>
						<div className='pack-complete-btn-wrapper'>
							<p className="pack-complete-text btn-label">Replay</p>
							<i
								onClick={
									() => {
										if (currentPack.levelCount > 1) {
											const id = GameAudio.play('enter_game');
											GameAudio.volume(soundOn ? .5 : 0.0, id);
											return restartPack(history, currentPack ? currentPack.packName : '')
										}
										else {
											return restartLevel()
										}
									}
								}
								className={`pack-complete-restart-btn fa fa-refresh`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


export default withRouter(PackCompleteModal);
