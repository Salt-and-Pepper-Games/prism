const React = require('react');

class LevelPack extends React.Component {
	constructor(props) {
		super(props);
		this.levelGrid;
	}
	componentDidMount() {
		this.levelGrid = document.getElementById('level-grid');
	}
	render() {
		const { isOpen, currentPack, cachedCurrentPack, setCurrentLevel, onClose, onLevelClick } = this.props;
		const levels = [];
		if (cachedCurrentPack) {
			for (let i = 1; i <= /*cachedCurrentPack.levelCount*/ 100; i++) {
				levels.push(i);
			}
		}
		const el = document.getElementById('body');
		if (isOpen) {
			el.classList.add('modal-open');
		} else {
			if (this.levelGrid) {
				setTimeout(() => {
					this.levelGrid.scrollTop = 0;
				}, 200);
			}
			el.classList.remove('modal-open');
		}
		return (
			<div>
				<div
					className={`${isOpen ? `pack-open` : ''} level-pack-background ${cachedCurrentPack ? `pack${cachedCurrentPack.packName}bg` : ''}`}
					onClick={onClose}
				/>
				<div className={`${isOpen ? `pack-open` : ''} level-pack ${cachedCurrentPack ? `pack${cachedCurrentPack.packName}` : ''}`}>
					<div className='level-pack-inner'>
						<div className='pack-header'>
							{cachedCurrentPack && <h1>{cachedCurrentPack.packName.toUpperCase()}</h1>}
						</div>
						<i onClick={onClose} className='fa fa-close close-pack-btn'/>
						<div id='level-grid' className="levels-grid">
							{levels.map(level =>
								<div onClick={() => onLevelClick(level, currentPack)} key={level} className={`level-btn btn-${cachedCurrentPack.packName}`}>
									<span className='level-btn-text'>{level}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = LevelPack;
