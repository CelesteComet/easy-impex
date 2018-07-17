import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class HeroComponentWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			heroComponents, // array
			renderType // string
		} = this.props;

		if (renderType === 'SINGLE') {
			return (
				<Fragment>
					{heroComponents[0]}
				</Fragment>
			);
		}


		if (renderType === 'SIDE_BY_SIDE') {
			return (
				<div className="container-fluid side-by_side no-bleed">
					<div className="row">
						{heroComponents.map(heroComponent => {
							return (
								<div className='col-sm-12 col-md-6' key={heroComponent.props.data._uid}>
									{heroComponent}
								</div>
							);
						})}
					</div>
				</div>
			);
		}


		return (
			<Fragment>
				{heroComponents[0]}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return { state }
}

const mapDispatchToProps = dispatch => {
	return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroComponentWrapper)