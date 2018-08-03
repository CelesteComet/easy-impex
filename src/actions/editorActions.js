import HeroComponentModel from '../models/HeroComponentModel';

export const SHOW_EDITOR = 'SHOW_EDITOR';
export const HIDE_EDITOR = 'HIDE_EDITOR';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

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

export const showModal = payload => {
	return {
		type: SHOW_MODAL, 
		payload
	}	
};

export const hideModal = payload => {
	return {
		type: HIDE_MODAL,
		payload 
	}
};

