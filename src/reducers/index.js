import { combineReducers } from "redux";
import componentReducer from './componentReducer';
import componentNavigatorReducer from './componentNavigatorReducer';
import editorReducer from './editorReducer';

export default combineReducers({
	components: componentReducer,
	navigator: componentNavigatorReducer,
	editor: editorReducer
})