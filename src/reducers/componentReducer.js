import { 
	CREATE_HERO_COMPONENT,
	CREATE_HERO_WRAPPER_COMPONENT,
	CREATE_STORY_TEXT_COMPONENT,
	CREATE_HEROSPLIT_COMPONENT,
	CREATE_CMS_LINK_COMPONENT,
	CREATE_MEDIA_COMPONENT,
	CHANGE_COMPONENT_FIELD,
	ADD_TO_HERO_COMPONENTS
} from '../actions/componentActions';

const initialState = {};

const componentReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case CREATE_HERO_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;
		case CREATE_STORY_TEXT_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;	
		case CREATE_HEROSPLIT_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;				
		case CREATE_HERO_WRAPPER_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;			
		case CREATE_CMS_LINK_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;	
		case CREATE_MEDIA_COMPONENT:
			newState[action.payload._uid] = action.payload;
			return newState;
			break;																
		case CHANGE_COMPONENT_FIELD:
			newState[action.payload._uid][action.payload.key] = action.payload.value;
			return newState;
			break;
		case ADD_TO_HERO_COMPONENTS:
			newState[action.payload._uid]["heroComponents"].push(action.payload.value);
			return newState;
			break;			
		default:
			return newState;
	}
}

export default componentReducer;
