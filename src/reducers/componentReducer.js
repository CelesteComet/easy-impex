
import { 
	CREATE_HERO_COMPONENT,
	CREATE_STORY_TEXT_COMPONENT,
	CHANGE_COMPONENT_FIELD
} from '../actions/componentActions';

const initialState = {};

const componentReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case CREATE_HERO_COMPONENT:
			newState[action.payload.uid] = action.payload;
			return newState;
			break;
		case CREATE_STORY_TEXT_COMPONENT:
			newState[action.payload.uid] = action.payload;
			return newState;
			break;				
		case CHANGE_COMPONENT_FIELD:
			newState[action.payload.uid][action.payload.key] = action.payload.value;
			return newState;
			break;
		default:
			return newState;
	}
}

export default componentReducer;
