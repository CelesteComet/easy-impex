import { 
	SET_NAME_PREFIX
} from '../actions/modifierActions';

const initialState = { 
	prefix: "",
};

const modifierReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case SET_NAME_PREFIX:
			newState.prefix = action.payload;
			return newState;
			break;									
		default:
			return newState;
	}
}

export default modifierReducer;
