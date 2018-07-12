class HeroComponentModel {
	constructor() {
		this.uid 							= "UID name";
		this._type						= "HeroComponent";
		this.name  						= "CMS name";
		this.hPosition 				= "LEFT";
		this.title						= "title";
		this.subtitle					= "subtitle";
		this.image						= "http://via.placeholder.com/350x150";
		this.mobileImage 	    = undefined;
		this.textStyle 				= "LIGHT";
		this.primaryCTALink   = undefined;
		this.secondaryCTALink = undefined; 
		this.videoCTALink			= undefined;
		this.renderVideoIcon  = true;
		this.text 						= "lorem ipsum";
	}
}

export default HeroComponentModel;