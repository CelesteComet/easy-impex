import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import HOCBaseComponent from './HOCBaseComponent'
import EditorComponent from './EditorComponent';

// actions
import { changeComponentField } from '../actions/componentActions';


class HeroComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialog: true
		};
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
			secondaryLink,
			videoCTALink,
			hPosition,
			videoLinkRenderType,
			image,
			mobileImage,
			renderType,
			textStyle,
			allowPadding,
			changeComponentField, } = this.props.data;

		const { switchSelectedComponent } = this.props;

		const singleVideo 		= !primaryCTALink && !secondaryLink && !text && !subtitle && videoCTALink;
		const singleHero 			= (renderType == 'SINGLE');
		const carouselHero 		=	(renderType == 'CAROUSEL');
		const sideHero				=	(renderType == 'SIDE_BY_SIDE');
		const hCenter					= (hPosition !== 'LEFT' && hPosition !== 'RIGHT'); 
		const renderVideoIcon =	(singleVideo || !sideHero && (videoLinkRenderType !== 'Button') && (!primaryCTALink) && (!secondaryLink)); 
		console.log(!!singleVideo)

		var textAlignment = "col-sm-10 col-md-5 text-align-left";
		if (sideHero) {
			textAlignment = "col-sm-10 col-md-8 text-align-center";
		} else if (hPosition == 'LEFT') {
			textAlignment = "col-sm-10 col-md-5 text-align-left";	
		} else if (hPosition == 'RIGHT') {
			textAlignment = "col-sm-10 col-md-5 text-align-right";	
		} else if (hPosition == 'singleVideo') {
			textAlignment = "col-sm-10 col-md-5 text-align-right";	
		} else {
			textAlignment = "col-sm-10 col-md-8 text-align-center";
		}

		let textStyleVar = 'text-light';
		if (textStyle == 'DARK') {
			textStyleVar = 'text-dark';
		} 

		let verticalPaddings = ' no-vertical-paddings';
		if (allowPadding === 'YES') {
			verticalPaddings = ' vertical-paddings';
		}


		return (
			<div>
				<div className={"c-hero" + (singleHero ? " banner full-bleed" : "") + (singleVideo ? " video-hero" : "") + " " + verticalPaddings} onClick={(dispatch) => {switchSelectedComponent(uid)}} data-uid={ uid }>
					<div className="c-hero__item">


	      	{mobileImage ? (
	      		<div className="c-hero__item__image" style={{backgroundImage: "url(" + image + ")"}} data-mobileImage="${mobileImage.url}" data-desktopImage="${image.url}"></div> 
	      	) : (
	      		<div className="c-hero__item__image" style={{backgroundImage: "url(" + image + ")"}}></div>
	      	)}	

		      	<div className="container-fluid">
		      		<div className="row">
		      			<div className={textAlignment + " c-hero__item__info valign-center " + textStyleVar}>
		      				{ subtitle && <h3 className="c-hero__item__subtitle">{subtitle}</h3>}
		      				{ title && <h1 className={"c-hero__item__title " + (singleVideo ? " video-title visible-desktop" : "")}>{title}</h1>}
									{	text && <div className="c-hero__item__copy">{text}</div>}



									{	(primaryCTALink || secondaryLink || (videoCTALink && !renderVideoIcon)) && (

                        <div className="c-hero__item__buttons">
                        	{primaryCTALink && (
                        		<div data-promotion-ic='${primaryCTALink.uid}'>
                        			<a>{primaryCTALink}</a>
                        		</div>
                        	)}

                        	{secondaryLink && (
                        		<div data-promotion-ic='${secondaryLink.uid}'>
                        			<a>{secondaryLink}</a>
                        		</div>
                        	)}

                        	{videoCTALink && !renderVideoIcon && (
                        		<div data-promotion-ic='${videoCTALink.uid}' className="video-cta js-video-overlay">
                        			<a>{videoCTALink}</a>
                        		</div>
                        	)}
                        </div>

									)}














		      			</div>
		      		</div>
		      	</div>


	        
					</div>
				</div>

			{singleVideo && !carouselHero && (
		    <div className="container-fluid c-hero__after single-video visible-mobile no-bleed">
		        <h2 className="video-title">{title}</h2>
		    </div>				
			)}				

			{text && renderType === 'SINGLE' && !carouselHero && (
		    <div className="container-fluid c-hero__after hero-description visible-mobile no-bleed">
		        <p>{text}</p>
		    </div>					
			)}

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
const MutatedHeroComponent = HOCBaseComponent(HeroComponent);

export default connect(mapStateToProps, mapDispatchToProps)(MutatedHeroComponent);






