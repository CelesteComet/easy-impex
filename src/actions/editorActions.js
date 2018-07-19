import HeroComponentModel from '../models/HeroComponentModel';

export const SHOW_EDITOR = 'SHOW_EDITOR';
export const HIDE_EDITOR = 'HIDE_EDITOR';

export const SHOW_HERO_MODAL = 'SHOW_HERO_MODAL';
export const HIDE_HERO_MODAL = 'HIDE_HERO_MODAL';

export const showEditor = () => {
	return {
		type: SHOW_EDITOR
	}
};

export const hideEditor = () => {
	return {
		type: HIDE_EDITOR
	}	
};

export const showHeroModal = () => {
	return {
		type: SHOW_HERO_MODAL 
	}	
};

export const hideHeroModal = () => {
	return {
		type: HIDE_HERO_MODAL 
	}
};

