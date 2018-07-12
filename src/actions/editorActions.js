import HeroComponentModel from '../models/HeroComponentModel';

export const SHOW_EDITOR = 'SHOW_EDITOR';
export const HIDE_EDITOR = 'HIDE_EDITOR';

export const hideEditor = () => {
	return {
		type: HIDE_EDITOR
	}	
};

export const showEditor = () => {
	return {
		type: SHOW_EDITOR
	}
};

