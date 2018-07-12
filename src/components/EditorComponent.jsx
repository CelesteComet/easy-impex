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

	handleInputChange(uid ,elem) {
		const { changeComponentField } = this.props;
		const value = elem.target.value;
		const key = elem.target.parentElement.firstElementChild.innerText
		const payload = {uid, key, value}
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


	render() {
		this.clearInputFields();
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;		
    const { allComponents, currentComponentUID, closeEditor, hideEditor, editorVisibility } = this.props;
    const currentComponentModel = allComponents[currentComponentUID];
		const { 
			uid,
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
								<div className='close circle' onClick={ hideEditor }></div>
							</div>
						</strong>
						<div className='container'>
							<ul>
								{ Object.keys(currentComponentModel).map((key, i) => {
									return (
										<li key={i}>
											<label>{key}</label>
												<input 
													type='text' 
													value={currentComponentModel[key]} 
													onChange={ this.handleInputChange.bind(this, uid) } />		
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