const componentTitles = {
	StoryTextComponent: "INSERT_UPDATE StoryTextComponent; $contentCV[unique = true]; uid[unique = true]    ; title; primaryCTA(uid, $contentCV); subtitle; paragraph",
	CMSLinkComponent: "INSERT_UPDATE CMSLinkComponent; $contentCV[unique = true]; uid[unique = true]       ; name                     ; linkName              ; url                            ; target(code)[default = 'sameWindow']",
	HeroComponent: "INSERT_UPDATE HeroComponent; $contentCV[unique = true]; uid[unique = true]; hPosition(code); name            ; title                   ; subtitle                  ; image(code, $contentCV); mobileImage(code, $contentCV); textStyle(code); videoLinkRenderType(code); primaryCTALink(uid, $contentCV); secondaryLink(uid, $contentCV); VideoCTALink(uid, $contentCV); text",
	MediaComponent: "INSERT_UPDATE Media; $contentCV[unique = true]; code[unique = true] ; mime      ; realFileName                                            ; @media[translator = de.hybris.platform.impex.jalo.media.MediaDataTranslator][forceWrite = true]; folder(qualifier)[default = 'images']"
}



function ImpexService(state) {
	let someString = "";	
	console.log('impex service running');
	const sortedComponentsHash = {};

	const components = Object.values(state.components);
	components.forEach(comp => {

		if (sortedComponentsHash[comp._type] === undefined) {
			sortedComponentsHash[comp._type] = [];
		}

		sortedComponentsHash[comp._type].push(comp);

	});

	Object.keys(sortedComponentsHash).forEach(componentType => {
		// create the title 
		let title = componentTitles[componentType];
		someString += title + "\n"

		// get all the keys needed

		// returns an array of all the properties
		const necessaryProperties = title.split(";").map(a => {return a.trim()})
			.map(a => {
				let match = a.match("^(.+)\\(");
				if (match) {
					return match[1];
				} else {
					let regexp = new RegExp("([^\[]+)\\[")
					match = regexp.exec(a);
				}

				if (match) {
					return match[1];
				} else {
					return a;
				}
			});


		// add the shit
		sortedComponentsHash[componentType].forEach(componentData => {
			// got through all the necessary properties and key the shit out of the data
			let componentString = "";
			necessaryProperties.forEach(prop => {
				// we dont want shitty props
				if (prop.match(/INSERT_UPDATE/) || prop.match(/\$contentCV\[unique = true\]/)) {
					componentString += ";";
					return;	
				} 

				// if the key value is undefined
				if (componentData[prop] === undefined) {
					componentString += ";";
				} else {
					componentString += (componentData[prop] + ";");
				}

			});


			
			componentString += "\n";
			someString += componentString;
		})


		console.log(someString);

		let blob = new Blob([someString], {type: "text/plain"});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'stuff.impex';
    a.click();




	});
}

export default ImpexService;