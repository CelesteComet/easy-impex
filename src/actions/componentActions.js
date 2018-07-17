import { v4 as uuid } from 'uuid';

// import a component model function
import HeroComponentModel from '../models/HeroComponentModel';
import StoryTextComponentModel from '../models/StoryTextComponentModel';
import CMSLinkComponentModel from '../models/CMSLinkComponentModel';

// add create component action constants here
export const CREATE_HERO_COMPONENT = 'CREATE_HERO_COMPONENT';
export const CREATE_STORY_TEXT_COMPONENT = 'CREATE_STORY_TEXT_COMPONENT';
export const CREATE_CMS_LINK_COMPONENT = 'CREATE_CMS_LINK_COMPONENT';

export const CHANGE_COMPONENT_FIELD = 'CHANGE_COMPONENT_FIELD';
export const ADD_TO_HERO_COMPONENTS = 'ADD_TO_HERO_COMPONENTS';

export const createHeroComponent = () => {
	let payload = new HeroComponentModel;
	payload._uid = uuid();
	return {
		type: CREATE_HERO_COMPONENT,
		payload
	}	
};

export const createStoryTextComponent = () => {
	let payload = new StoryTextComponentModel;
	payload._uid = uuid();
	return {
		type: CREATE_STORY_TEXT_COMPONENT,
		payload
	}
}

export const createCMSLinkComponent = () => {
	let payload = new CMSLinkComponentModel;
	payload._uid = uuid();
	return {
		type: CREATE_CMS_LINK_COMPONENT,
		payload
	}
}

export const changeComponentField = payload => {
	return {
		type: CHANGE_COMPONENT_FIELD,
		payload
	};
};

export const addToHeroComponents = payload => {
	return {
		type: ADD_TO_HERO_COMPONENTS,
		payload
	}
}