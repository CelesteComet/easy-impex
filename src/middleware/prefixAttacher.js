import { 
	CREATE_HERO_COMPONENT,
	CREATE_HERO_WRAPPER_COMPONENT,
	CREATE_STORY_TEXT_COMPONENT,
	CREATE_HEROSPLIT_COMPONENT,
	CREATE_CMS_LINK_COMPONENT,
	CREATE_MEDIA_COMPONENT,
} from '../actions/componentActions';

const prefixAttacher = store => next => action => {
	const actionsToAttachPrefixTo = [
		CREATE_HERO_COMPONENT,
		CREATE_HERO_WRAPPER_COMPONENT,
		CREATE_STORY_TEXT_COMPONENT,
		CREATE_HEROSPLIT_COMPONENT,
		CREATE_CMS_LINK_COMPONENT,
		CREATE_MEDIA_COMPONENT	
	];
	const state = store.getState();

	let prefix = "";

	if (state.form.simple) {
		if (state.form.simple.values) {
			prefix = state.form.simple.values.prefix;
		}
	}
	
	if (actionsToAttachPrefixTo.includes(action.type)) {
		if (action.payload.code !== undefined) {
			action.payload.code = prefix + action.payload.code;
		} else {
			action.payload.uid = prefix + action.payload.uid;
			action.payload.name = prefix + action.payload.name;
		}
	}

	return next(action);
}

export default prefixAttacher;