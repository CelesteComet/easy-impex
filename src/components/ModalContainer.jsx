import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

// actions
import { changeComponentField } from '../actions/componentActions';
import { showModal, hideModal} from '../actions/editorActions';

// components
import HeroComponent from './HeroComponent';

class ModalContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDrags: 0,
			deltaPosition: {
				x: 0,
				y: 0
			},
			controlledPosition: {
				x: -400, y: 200	
			},
		};
		this.handleDrag = this.handleDrag.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
	}

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }	

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }	

	render() {
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
		const { hideModal } = this.props;
		const componentData = this.props.allComponents[this.props.modalId];
		return (
			<div>
				<Draggable bounds="body" handle="strong" {...dragHandlers} style="resize: both;">
					<div className='editor _modal box no-cursor'>
						<strong>
							<div className='move-bar'>
								<div className='_close circle' onClick={ hideModal }></div>
							</div>
						</strong>			
						<div className='_container'>
							<HeroComponent data={ componentData } />
						</div>
					</div>
				</Draggable>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		allComponents: state.components,
		currentComponentUID: state.navigator.componentUID,
		editorVisibility: state.editor.visibility,
		modalId: state.editor.modalId
	};
}

const mapDispatchToProps = dispatch => {
	return {
		changeComponentField: (payload) => {
			dispatch(changeComponentField(payload));
		},
		showModal: _uid => {
			dispatch(showModal(_uid));
		},
		hideModal: _uid => {
			dispatch(hideModal(_uid));
		}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
