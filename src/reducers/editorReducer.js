import { 
	SHOW_EDITOR,
	HIDE_EDITOR,
	SHOW_MODAL,
	HIDE_MODAL
} from '../actions/editorActions';

const initialState = { 
	visibility: false,
	modalId: null
};

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
			break;
		case SHOW_MODAL:
			newState.modalId = action.payload._uid;
			return newState;
			break;			
		case HIDE_MODAL:
			newState.modalId = null;
			return newState;
			break;												
		default:
			return newState;
	}
}

export default editorReducer;
