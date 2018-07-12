import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { changeComponentField } from '../actions/componentActions';

class EditorComponent extends Component {
	constructor(props) {
		super(props);
	}

	handleInputChange(uid ,elem) {
		const { changeComponentField } = this.props;
		const value = elem.target.value;
		const key = elem.target.labels[0].innerText;
		const payload = {uid, key, value}
		changeComponentField(payload);
	}

	render() {
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
			changeComponentField } = this.props.data;

			return (
				<div className='editor'>
					<ul>
						{ Object.keys(this.props.data).map((e, i) => {
							return (
								<label key={i}>{e}
									<input 
										type='text' 
										defaultValue={this.props.data[e]} 
										onChange={ this.handleInputChange.bind(this, uid) }
									/>		
								</label>
							);
						})}
					</ul>
				</div>
			);
	}
}

const mapStateToProps = state => {
	return {
		state
	};
}

const mapDispatchToProps = dispatch => {
	return {
		changeComponentField: (payload) => {
			dispatch(changeComponentField(payload));
		}	
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(EditorComponent);