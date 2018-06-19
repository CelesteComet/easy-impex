
import { CREATE_HERO_COMPONENT } from '../actions/componentActions';

const initialState = {};

const componentReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case CREATE_HERO_COMPONENT:
			newState[action.payload.uid] = action.payload;
			return newState;
			break
		default:
			return newState;
	}
}

export default componentReducer;
