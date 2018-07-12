import { v4 as uuid } from 'uuid';
import HeroComponentModel from '../models/HeroComponentModel';

export const CREATE_HERO_COMPONENT = 'CREATE_HERO_COMPONENT';
export const CHANGE_COMPONENT_FIELD = 'CHANGE_COMPONENT_FIELD';

export const createHeroComponent = () => {
	let payload = new HeroComponentModel;
	payload.uid = uuid();
	return {
		type: CREATE_HERO_COMPONENT,
		payload
	}	
};

export const changeComponentField = payload => {
	return {
		type: CHANGE_COMPONENT_FIELD,
		payload
	};
};