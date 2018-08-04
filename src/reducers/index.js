import { combineReducers } from "redux";
import componentReducer from './componentReducer';
import componentNavigatorReducer from './componentNavigatorReducer';
import editorReducer from './editorReducer';
import modifierReducer from './modifierReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
	components: componentReducer,
	navigator: componentNavigatorReducer,
	editor: editorReducer,
	form: formReducer
})