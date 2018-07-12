import { 
	SHOW_EDITOR,
	HIDE_EDITOR
} from '../actions/editorActions';

const initialState = {visibility: false};

const editorReducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case SHOW_EDITOR:
			newState.visibility = true;
			return newState;
			break;
		case HIDE_EDITOR:
			newState.visibility = false;
			return newState;
			break			
		default:
			return newState;
	}
}

export default editorReducer;
