import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import GenerateImpexButton from './GenerateImpexButton';
import _ from 'lodash';
import { connect } from 'react-redux';

import HOCBaseComponent from './HOCBaseComponent'

const componentNames = [
	"HeroComponent", 
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
    const { createHeroComponent, createStoryTextComponent } = this.props;
    const table = {
      "HeroComponent": createHeroComponent,
      "StoryTextComponent": createStoryTextComponent
    };
    table[componentType]();
  }

  handleImageDrop(e) {
  	e.stopPropagation();
  	e.preventDefault();
  	let files = e.dataTransfer.files
  	let arrayOfFileNames = [];
  	for (let i = 0; i < files.length; i++) {
		  arrayOfFileNames.push(files[i].name);
  	}

  	console.log(arrayOfFileNames);

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
		const { createCMSLinkComponent, CMSLinkComponents, switchSelectedComponent, dispatch } = this.props;
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
			    	{componentNames.map(componentName => {
			    		return <MenuItem eventKey={3.1} draggable onDragStart={ e => { this.drag(e) }}>{componentName}</MenuItem>
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
		state 
	}
}

const mapDispatchToProps = dispatch => {
	return { dispatch }
}

const MutatedNavBarComponent = HOCBaseComponent(NavBar);

export default connect(mapStateToProps, mapDispatchToProps)(MutatedNavBarComponent);








