import React from 'react';
import GameAudio from '../../utils/AudioManager';
import { withRouter } from 'react-router';

const PackCompleteModal = ({
	isOpen,
	currentPack,
	userLevelData,
	returnToMainScreen,
	restartPack,
	soundOn,
	startTransition,
	stopTransition,
	history
}) => {

	return (
		<div>
			<div className={`${isOpen ? 'open' : 'hidden'} pack${currentPack ? currentPack.packColor : '-'}bg pack-complete-modal-overlay`}/>
			<div className={`${isOpen ? 'open' : 'hidden'} pack-complete-modal pack${currentPack ? currentPack.packColor : ''}`}>
				<div className="pack-complete-text-wrapper">
					<p className='pack-complete-text'>{`Congratulations on completing the ${currentPack ? currentPack.packName : '...'} pack!`}</p>
					<p className='pack-complete-text'>{`0% of levels were completed perfectly...`}</p>
				</div>
				<div className="pack-complete-modal-btn">
					<i
						className="pack-complete-exit-btn fa fa-sign-out fa-flip-horizontal"
						onClick={() => {
							GameAudio.stop();
							startTransition();
							const id = GameAudio.play('enter_game');
							GameAudio.volume(soundOn ? .5 : 0.0, id);
							GameAudio.on('end', () => {
								stopTransition();
							}, id);
							returnToMainScreen(history);
						}}
					/>
					<i
						onClick={() => restartPack(history, currentPack ? currentPack.packName : '')}
						className={`pack-complete-restart-btn fa fa-refresh`}
					/>
				</div>
			</div>
		</div>
	);
};


export default withRouter(PackCompleteModal);