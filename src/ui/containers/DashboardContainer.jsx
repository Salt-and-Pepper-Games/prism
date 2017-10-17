import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.jsx';
import * as uiActionCreators from '../../actionCreators/uiActionCreators';

const mapStateToProps = state => {
	return {
		stats: state.game.user.stats,
		levelData: state.game.user.levelData,
		packInfo: state.ui.ui.packInfo,
		isOpen: state.ui.ui.dashboardOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeDashboard: () => dispatch(uiActionCreators.toggleDashboard())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);