import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HeroComponent from './HeroComponent';
import { createHeroComponent } from '../actions/componentActions';
import { showModal } from '../actions/editorActions';

class HeroWrapperComponent extends Component {
	constructor(props) {
		super(props);
		this.createHero = this.createHero.bind(this);
	}

	createHero() {

	}

	render() {
		const {
			heroComponentUIDs, // array
			renderType, // string
			allComponents,
			createHeroComponent // object
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
				<button onClick={ createHeroComponent }>ADD HERO COMPONENT</button>
			</div>
		);		






	}
}

const mapStateToProps = state => {
	return {
		allComponents: state.components
	}
}

const createComponent = (componentActionFunction, dispatch) => {
  const action = componentActionFunction();
  const { type, payload } = action;
  const { _uid }  = payload;
  dispatch(action);
  dispatch(showModal({_uid}));
};

const mapDispatchToProps = dispatch => {
  return {
    createHeroComponent: () => {
      createComponent(createHeroComponent, dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroWrapperComponent);