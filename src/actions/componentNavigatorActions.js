export const CHANGE_SELECTED_COMPONENT = 'CHANGE_SELECTED_COMPONENT';

export const changeSelectedComponent = payload => {
	return {
		type: CHANGE_SELECTED_COMPONENT,
		payload
	}	
};

