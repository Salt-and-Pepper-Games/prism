import React from 'react';
import { withRouter } from 'react-router';
import GameAudio from '../../utils/AudioManager';

class LevelPack extends React.Component {
	constructor(props) {
		super(props);
		this.levelGrid = null;
	}
	componentDidMount() {
		this.levelGrid = document.getElementById('levels-grid');
	}
	render() {
		const {
			isOpen,
			currentPack,
			cachedCurrentPack,
			onClose,
			onLevelClick,
			history,
			userLevelData,
			startTransition,
			stopTransition
		} = this.props;
		const levels = [];
		if (cachedCurrentPack) {
			for (let i = 1; i <= cachedCurrentPack.levelCount; i++) {
				levels.push(i);
			}
		}
		const body = document.getElementById('body');
		const html = document.getElementById('html');
		if (isOpen) {
			body.classList.add('modal-open');
			html.classList.add('modal-open');
		} else {
			if (this.levelGrid) {
				this.levelGrid.style.overflowY = 'hidden';
				setTimeout(() => {
					this.levelGrid.style.overflowY = 'scroll';
					this.levelGrid.scrollTop = 0;
				}, 200);
			}
			body.classList.remove('modal-open');
			html.classList.remove('modal-open');
		}
		return (
			<div>
				<div
					className={`${isOpen ? `pack-open` : ''} level-pack-background ${cachedCurrentPack ? `pack${cachedCurrentPack.packColor}bg` : ''}`}
					onClick={onClose}
				/>
				<div className={`${isOpen ? `pack-open` : ''} level-pack ${cachedCurrentPack ? `pack${cachedCurrentPack.packColor}` : ''}`}>
					<div className='level-pack-inner'>
						<div className='pack-header'>
							{cachedCurrentPack && <h1 className="pack-header">{cachedCurrentPack.packName.toUpperCase()}</h1>}
						</div>
						<i onClick={onClose} className='fa fa-close close-pack-btn'/>
						<div id='levels-grid' className='levels-grid'>
							{levels.map(level => {
								let isSolved = false;
								if (userLevelData[cachedCurrentPack.packName] && userLevelData[cachedCurrentPack.packName][level]) {
									isSolved = userLevelData[cachedCurrentPack.packName][level].solved;
								}
								return (
									<div
										onClick={() => {
											GameAudio.stop();
											startTransition();
											const id = GameAudio.play('enter_game');
											GameAudio.on('end', () => {
												stopTransition();
											}, id);
											history.push(`/game/${currentPack.packName}/${level}`);
										}}
										key={level}
										className={`level-btn btn-${cachedCurrentPack.packColor} level-${isSolved ? 'solved' : 'not-solved'}`}
									>
										<span className='level-btn-text'>{level}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(LevelPack);
