import React, { Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { changeSelectedComponent } from '../actions/componentNavigatorActions';
import { showEditor, hideEditor } from '../actions/editorActions';

function HOCBaseComponent(WrappedComponent) {
	return class NewComponent extends Component {
		constructor(props) {
			super(props);
			this.switchSelectedComponent = this.switchSelectedComponent.bind(this);	
		}

		switchSelectedComponent(uid) {
			const { dispatch } = this.props;
			dispatch(changeSelectedComponent(uid));
			dispatch(showEditor());
		}

		render() {
			return (
				<WrappedComponent {...this.props} switchSelectedComponent={ this.switchSelectedComponent } />
			);
		}
	}
}

export default HOCBaseComponent;
