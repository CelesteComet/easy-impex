export const CHANGE_CURRENT_COMPONENT = 'CHANGE_CURRENT_COMPONENT';

export const changeCurrentComponent = payload => {
	return {
		type: CHANGE_CURRENT_COMPONENT,
		payload
	}	
};

