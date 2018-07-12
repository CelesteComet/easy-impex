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
			secondaryCTALink,
			videoCTALink,
			hPosition,
			renderVideoIcon,
			image,
			changeComponentField, } = this.props.data;

		const { switchSelectedComponent } = this.props;

		var heroAlignment = "col-sm-10 col-md-5 text-align-left";
		switch(hPosition) {
			case "LEFT":
				heroAlignment = "col-sm-10 col-md-5 text-align-left"
				break;
			case "RIGHT":
				heroAlignment = "col-sm-10 col-md-5 text-align-right"
				break;
			default:
				break;
		}
		return (
			<div onClick={(dispatch) => {switchSelectedComponent(uid)}} data-uid={ uid }>
				<div className="c-hero banner full-bleed">
				    <div className="c-hero__item">
              <div className="c-hero__item__image" style={{backgroundImage: "url(" + image + ")" }} data-mobileImage="${mobileImage.url}" data-desktopImage="http://via.placeholder.com/350x150"></div>
              <div className="c-hero__item__image"></div>

			        <div className="container-fluid">
			            <div className="row">
			                <div className={heroAlignment + " c-hero__item__info valign-center"}>
			                        <h3 className="c-hero__item__subtitle">{subtitle}</h3>

			                        <h1 className="c-hero__item__title ${singleVideo? ' video-title visible-desktop' : ''}">{title}</h1>

			                        <div className="c-hero__item__copy">{text}</div>

			                        <div className="c-hero__item__buttons">
			                                <div data-promotion-ic='${primaryCTALink.uid}'>
			                                	{ primaryCTALink && <a>{primaryCTALink}</a> }
			                                	{/*<cms:component component="${primaryLink}"/> */}
			                                </div>
			                                <div data-promotion-ic='${secondaryLink.uid}'>
			                                	{/*<cms:component component="${secondaryLink}"/> */}
			                                	{ secondaryCTALink && <a>{secondaryCTALink}</a> }
			                                </div>
			                                <div data-promotion-ic='${videoCTALink.uid}' className="video-cta js-video-overlay">
			                                	{/*<cms:component component="${videoCTALink}" /> */}
			                                </div>
			                        </div>

			                        <div className="c-hero__item__video js-video-overlay valign-center visible-mobile">
			                            <img src="/images/youtube-icon.svg"/>
			                            <div data-promotion-ic='${videoCTALink.uid}'>
			                            	{/*<cms:component component="${videoCTALink}" /> */}
			                            </div>
			                        </div>
			                </div>
			            </div>
			            { videoCTALink && renderVideoIcon && 
		                <div className="c-hero__item__video js-video-overlay valign-center visible-desktop${(!singleVideo && hCenter) ? ' hide' : ''}">
		                    <img src="/images/youtube-icon.svg"/>
		                    <div data-promotion-ic='${videoCTALink.uid}'>
		                    	{/*<cms:component component="${videoCTALink}" /> */}
		                    </div>
		                </div>
	              	}
				        </div>
				    </div>
				</div>

		    <div className="container-fluid c-hero__after single-video visible-mobile no-bleed">
		        <h2 className="video-title">{title}</h2>
		    </div>

		    <div className="container-fluid c-hero__after hero-description visible-mobile no-bleed">
		        <p>{text}</p>
		    </div>
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






