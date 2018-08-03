import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import GenerateImpexButton from './GenerateImpexButton';
import _ from 'lodash';
import { connect } from 'react-redux';

// components 
import HOCBaseComponent from './HOCBaseComponent'

// actions
import { createMediaComponent, changeComponentField } from '../actions/componentActions';

const componentNames = [
	"HeroComponent",
	"HeroWrapperComponent",
	"HeroSplitComponent",
	"QuoteComponent", 
	"StoryTextComponent"
];

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onDropZoneDrop = this.onDropZoneDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
  }

  onDropZoneDrop(e) {
    const componentType = e.dataTransfer.getData("text");
    const { createHeroComponent, createHeroSplitComponent, createStoryTextComponent } = this.props;
    const table = {
      "HeroComponent": createHeroComponent,
      "HeroSplitComponent": createHeroSplitComponent,
      "StoryTextComponent": createStoryTextComponent
    };
    table[componentType]();
  }

  handleImageDrop(e) {
  	e.stopPropagation();
  	e.preventDefault();

  	const { createMediaComponent } = this.props;

  	let files = e.dataTransfer.files
  	let arrayOfFileNames = [];
  	for (let i = 0; i < files.length; i++) {
  		let filename = files[i].name;
  		
		  arrayOfFileNames.push(files[i].name);
  	}

  	for (let i = 0; i < files.length; i++) {
			let file = files[i];
  		let reader = new FileReader();
  		reader.addEventListener("load", () => {
  			let base64String = reader.result;
  			let filename = files[i].name;
  			createMediaComponent(filename, base64String);
  		});
  		reader.readAsDataURL(file)
	  }

  }

	toDataURL(url, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.onload = function() {
	    var reader = new FileReader();
	    reader.onloadend = function() {
	      callback(reader.result);
	    }
	    reader.readAsDataURL(xhr.response);
	  };
	  xhr.open('GET', url);
	  xhr.responseType = 'blob';
	  xhr.send();
	} 

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e, _uid, _type, uid)  {
    e.dataTransfer.setData("text", e.target.innerHTML);
    e.dataTransfer.setData("_uid", _uid);
    e.dataTransfer.setData("_type", _type);
    e.dataTransfer.setData("uid", uid);
  }

	render() {
		const { createCMSLinkComponent, CMSLinkComponents, Images, switchSelectedComponent, dispatch } = this.props;
		const CMSLinkComponentPOJOs = CMSLinkComponents.map(c => { return {name: c.name, _uid: c._uid, uid: c.uid} });
		return (
			<Navbar fixedTop>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">Impex Generator</a>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			  	{/* TODO GET RID OF THE DAMN IDS  */}
			  	
			    <NavDropdown eventKey={3} title="Images" id="basic-nav-dropdown">
			    	<form>
			    		<input type="file" id="fileElem" multiple onDrop={ this.handleImageDrop } onDragOver={(e) => {e.preventDefault()}} />
			    	</form>
			    	{Images.map(mediaImage=> {
			    		return <MenuItem eventKey={3.1} draggable onDragStart={ e => { this.drag(e) }}>{mediaImage.realFileName}</MenuItem>
			    	})}
			    </NavDropdown>
			    
			    <NavDropdown eventKey={3} title="UI Components" id="basic-nav-dropdown">
			    	{componentNames.map(componentName => {
			    		return <MenuItem eventKey={3.1} draggable onDragStart={ e => { this.drag(e) }}>{componentName}</MenuItem>
			    	})}
			    </NavDropdown>
			    <NavDropdown eventKey={3} title="CMS Link Components" id="basic-nav-dropdown">
			    	<MenuItem eventKey={3.1} onClick={() => { createCMSLinkComponent() }}>Create</MenuItem>

			    	<MenuItem divider />
			    	{ CMSLinkComponentPOJOs.map(CMSLinkComponentPOJO => {
			    		return (
			    		<MenuItem 
			    			draggable 
			    			onDragStart={ e => {this.drag(e, CMSLinkComponentPOJO._uid, CMSLinkComponentPOJO._type, CMSLinkComponentPOJO.uid) }} 
			    			onClick={(dispatch) => {switchSelectedComponent(CMSLinkComponentPOJO._uid)}} 
			    			data-uid={ CMSLinkComponentPOJO._uid }>{CMSLinkComponentPOJO.name}</MenuItem> 
			    		)
			    	})}
			    </NavDropdown>			    
			    <GenerateImpexButton />
			  </Nav>
			</Navbar>
		);
	}
}

const mapStateToProps = state => {
	return { 
		CMSLinkComponents: Object.values(_.pickBy(state.components, (value, key) => {
			return value._type === 'CMSLinkComponent';
		})),
		Images: Object.values(_.pickBy(state.components, (value, key) => {
			return value._type === 'MediaComponent';
		})),
		state 
	}
}

const mapDispatchToProps = dispatch => {
	return { 
		createMediaComponent: (filename, base64String) => {
			dispatch(createMediaComponent(filename, base64String));
		}
	}
}

const MutatedNavBarComponent = HOCBaseComponent(NavBar);

export default connect(mapStateToProps, mapDispatchToProps)(MutatedNavBarComponent);








