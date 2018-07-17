import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import ImpexService from '../services/ImpexService';


function GenerateImpexButton({ state }) {
	return (
	  <NavItem eventKey={1} href="#" onClick={() => {ImpexService(state)}}>
	  	Generate IMPEX
	  </NavItem>				
	);
}

const mapStateToProps = state => {
	return { state }
}

const mapDispatchToProps = dispatch => {
	return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateImpexButton);