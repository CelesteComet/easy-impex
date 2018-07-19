import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import HeroComponent from './HeroComponent';

class HeroWrapperComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			heroComponentUIDs, // array
			renderType, // string
			allComponents // object
		} = this.props;
		if (renderType === 'SINGLE') {
			const heroModel = allComponents[heroComponentUIDs[0]];
			return (
				<Fragment>
					<HeroComponent data={heroModel}/>
				</Fragment>
			);
		}

		if (renderType === 'SIDE_BY_SIDE') {
			return (
				<div className="container-fluid side-by_side no-bleed">
					<div className="row">
						{heroComponentUIDs.map(heroComponentUID => {
							const heroModel = allComponents[heroComponentUID];
							return (
								<div className='col-sm-12 col-md-6' key={heroComponentUID}>
									<HeroComponent data={heroModel} />
								</div>
							);
						})}
					</div>
				</div>
			);
		}

		return (
			<div>
				Drop some heroes 
			</div>
		);		






	}
}

const mapStateToProps = state => {
	return {
		allComponents: state.components
	}
}

const mapDispatchToProps = dispatch => {
	return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroWrapperComponent);