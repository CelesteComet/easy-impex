import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Draggable from 'react-draggable';

// actions
import { changeComponentField } from '../actions/componentActions';
import { showEditor, hideEditor } from '../actions/editorActions';

class EditorComponent extends Component {
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
		this.clearInputFields = this.clearInputFields.bind(this);
		this.handleCTADrop = this.handleCTADrop.bind(this);
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

	handleInputChange(_uid ,elem) {
		console.log("HANDLING A CHANGE")
		const { changeComponentField } = this.props;
		const value = elem.target.value;
		const key = elem.target.parentElement.firstElementChild.innerText
		const payload = {_uid, key, value}
		changeComponentField(payload);
	}

	clearInputFields() {
		var elements = document.getElementsByTagName("input");
		for (var ii=0; ii < elements.length; ii++) {
		  if (elements[ii].type == "text") {
		    elements[ii].value = "";
		  }
		}		
	}

	handleCTADrop(_uid, key, value) {
		const { changeComponentField } = this.props;
		const payload = {_uid, key, value};
		console.log("HANDLING A DROP")
		changeComponentField(payload);
	}


	render() {
		this.clearInputFields();
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;		
    const { allComponents, currentComponentUID, closeEditor, hideEditor, editorVisibility } = this.props;
    const currentComponentModel = allComponents[currentComponentUID];
		const { 
			_uid,
			title, 
			subtitle, 
			text, 
			primaryCTALink,
			secondaryCTALink,
			videoCTALink,
			hPosition,
			renderVideoIcon,
			changeComponentField } = currentComponentModel;

			console.log(currentComponentModel);
			if (!editorVisibility) { return null }
			return (
				<Draggable bounds="body" handle="strong" {...dragHandlers}>
					<div className='editor box no-cursor'>
						<strong>
							<div className='move-bar'>
								<div className='_close circle' onClick={ hideEditor }></div>
							</div>
						</strong>
						<div className='_container'>
							<ul>
								{ Object.keys(currentComponentModel).map((key, i) => {
									if (key.match('CTA')) {
										return (
											<li key={i}>
												<label>{key}</label>
													<input 
														type='text' 
														ref={this[_uid]}
														value={currentComponentModel[key]} 
														onChange={ this.handleInputChange.bind(this, _uid) } 
														onDrop={(e) => {
															e.stopPropagation();
															const uniqueName = e.dataTransfer.getData("uid");
															e.target.value = uniqueName;
															this.handleCTADrop(_uid, key, uniqueName);
														}} />	
											</li>												
										);
									}									
									return (
										// consider CTA droppables
										<li key={i}>
											<label>{key}</label>
												<input 
													type='text' 
													value={currentComponentModel[key]} 
													onChange={ this.handleInputChange.bind(this, _uid) } />		
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</Draggable>
			);
	}
}

const mapStateToProps = state => {
	return {
		allComponents: state.components,
		currentComponentUID: state.navigator.componentUID,
		editorVisibility: state.editor.visibility
	};
}

const mapDispatchToProps = dispatch => {
	return {
		changeComponentField: (payload) => {
			console.log("GOING THROUGH TO DISPATCH")
			dispatch(changeComponentField(payload));
		},
		showEditor: () => {
			dispatch(showEditor());
		},
		hideEditor: () => {
			dispatch(hideEditor());
		}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(EditorComponent);