import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import HOCBaseComponent from './HOCBaseComponent'
import EditorComponent from './EditorComponent';

// actions
import { changeComponentField } from '../actions/componentActions';


class HeroSplitComponent extends Component {
	constructor(props) {
		super(props);
		this.handleImageDrop = this.handleImageDrop.bind(this);
	}

	handleImageDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		const imageUID= e.dataTransfer.getData("_uid");
		const heroSplitUID = e.target.getAttribute("data-uid");
		const { allComponents, changeComponentField }= this.props;
		const imageComponent = allComponents[imageUID];
		const value = imageComponent.base64String;
		const payload = {_uid: heroSplitUID, key: "imageUrl", value}
		changeComponentField(payload);		
	}

	render() {
		let { 
			_uid,
			title, 
			subtitle,
			text, 
			imagePosition,
			displayStyle,
			textStyle,
			titleStyle,
			ctaStyle,
			imageUrl,
			mobileImage,
			backgroundHexColor,
			ctaDisplayType,
			textAlignment,
			textCTA,
			primaryCTA,
			secondaryCTA } = this.props.data;

		const { switchSelectedComponent, dispatch } = this.props;

		let imageDiv;
		let copy;
		let textColor;
		let ctaDisplayClass;

		if (textAlignment === "CENTER") {
			textAlignment = "text-align-center";
		} else if (textAlignment === "RIGHT") {
			textAlignment = "text-align-right";
		} else {
			textAlignment = "text-align-left";
		}

		{/* Image Position */}
		if (imagePosition === "LEFT") {
			imagePosition = "";
		} else {
			imagePosition = "c-herosplit--right";
		}

		if (displayStyle === "SINGLE") {
			if (mobileImage) {
				imageDiv = <div data-uid={ _uid } onDrop={ this.handleImageDrop } className="c-herosplit__image" data-mobileImage={mobileImage} data-desktopImage={imageUrl}></div>
			} else {
				imageDiv = <div data-uid={ _uid } onDrop={ this.handleImageDrop } className="c-herosplit__image" style={{backgroundImage: `url(${imageUrl})`}}></div>
			}
		}

		{/* DO VIDEO STUFF IN THE FUTURE */}

		{/* COPY STUFF */}



		{/* CTA Display Style */}
		if (ctaDisplayType === "Button") {
			ctaDisplayClass = "c-herosplit__button";
		} else {
			ctaDisplayClass = "c-herosplit__link";
		}

		{/* Text Color Style */}
		if (textStyle === "LIGHT") {
			textColor = "light-text";
		} else {
			textColor = "";
		}

		copy = (
			<div className={`c-herosplit__copy ${textColor}`} style={{backgroundColor: `#${backgroundHexColor}`}}>
				<div className="c-herosplit__text-block"></div>
					<div className="c-herosplit__text-block">
						<div className={`c-herosplit__text-block ${textAlignment}`}>

							{ subtitle && (
								<div className='c-herosplit__subtitle'>
									{ subtitle }
								</div>
							)}

							{ subtitle && (
								<div className={`c-herosplit__${titleStyle}`}>
									{ title }
								</div>
							)}

							{ text && (
								<div className='c-herosplit__description'>
									{ text }
								</div>
							)}

							{ textCTA && (
								<div className={`${ctaDisplayClass}`}>
									<div>
										<a href={`${textCTA}`}>{textCTA}</a>
									</div>
								</div>
							)}												

						</div>
					</div>
				<div className="c-herosplit__text-block"></div>
			</div>
		);

		return (
			<div className={"full-bleed c-herosplit " + imagePosition} onClick={(dispatch) => {switchSelectedComponent(_uid)}}>
				{ imageDiv }
				{ copy }
			</div>
		);
	}
}




const mapStateToProps = state => {
	return {
		allComponents: state.components,
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
const MutatedHeroSplitComponent = HOCBaseComponent(HeroSplitComponent);

export default connect(mapStateToProps, mapDispatchToProps)(MutatedHeroSplitComponent);






