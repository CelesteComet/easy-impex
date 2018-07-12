import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import HOCBaseComponent from './HOCBaseComponent'
import EditorComponent from './EditorComponent';

// actions
import { changeComponentField } from '../actions/componentActions';


class StoryTextComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialog: true
		};
	}

	render() {
		const { 
			uid,
			title, 
			subtitle, 
			paragraph, 
			textCTA,
			primaryCTA,
			secondaryCTA } = this.props.data;

		const { switchSelectedComponent, dispatch } = this.props;
		console.log(!!textCTA)
		return (
			<div className="container-fluid storytext-wrapper no-bleed" onClick={(dispatch) => {switchSelectedComponent(uid)}}>
			  <div className="row">
			    <div className="storytext col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
			      {subtitle 	&& <h2 className="storytext__subtitle">{subtitle}</h2>}
			      {title 			&& <h1 className="storytext__title">{title}</h1>}
			      {paragraph 	&& <div className="storytext__copy" dangerouslySetInnerHTML={{__html: paragraph}}></div>}
			      {textCTA 		&& <div className="storytext__action" data-promotion-ic='${textCTA.uid}'><a href="#">{textCTA}</a></div>}
			    </div>
			  </div>
			  <div className="row">

			  	{ primaryCTA && secondaryCTA && (
				    <div className="storytext__buttons col-sm-6 align-right text-align-right" data-promotion-ic='${primaryCTA.uid}'>
				      <a>{primaryCTA}</a>
				    </div>)
				  }

				  { primaryCTA && secondaryCTA && (
				    <div className="storytext__buttons col-sm-6 align-left text-align-left" data-promotion-ic='${secondaryCTA.uid}'>
				      <a>{secondaryCTA}</a>
				    </div>)
				  }

			  </div>
			  { primaryCTA && !secondaryCTA && (
				  <div className="row">
				    <div className="storytext__buttons col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 align-center text-align-center" data-promotion-ic='${primaryCTA.uid}'>
				    	<a>{primaryCTA}</a>
				    </div>
				  </div>)
				}
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
			dispatch(changeComponentField(payload))
		},
		dispatch 
	}
}
const MutatedStoryTextComponent = HOCBaseComponent(StoryTextComponent);

export default connect(mapStateToProps, mapDispatchToProps)(MutatedStoryTextComponent);






