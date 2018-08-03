class MediaComponentModel {
	constructor() {
		this._type						= "MediaComponent";
		this._uid 						= "UID name";
		this.code             = "name";
		this.mime             = "image/jpeg";
		this.realFileName     = "image.jpg";
		this["@media"] 				= "image.jpg";
		this.base64String			= undefined;
	}
}

export default MediaComponentModel;

