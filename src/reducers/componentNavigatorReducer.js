import { 
	CHANGE_CURRENT_COMPONENT,
} from '../actions/componentNavigatorActions';

const initialState = {componentUID: null}

const componentNavigatorReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case CHANGE_CURRENT_COMPONENT:
			newState.componentUID = action.payload;
			return newState;
			break;
		default:
			return newState;
	}
}

export default componentNavigatorReducer;
