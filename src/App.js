import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

// actions
import { createHeroComponent } from './actions/componentActions';

// components
import HeroComponent from './components/HeroComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.onDropZoneDrop = this.onDropZoneDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
  }

  onDropZoneDrop(e) {
    const data = e.dataTransfer.getData("text");
    const { createHeroComponent } = this.props;
    createHeroComponent();
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e)  {
    e.dataTransfer.setData("text", e.target.innerHTML);
  }

  render() {
    const { components } = this.props;
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          <li draggable onDragStart={ e => { this.drag(e) }}>HeroComponent</li>
          <li draggable onDragStart={ e => { this.drag(e) }}>QuoteComponent</li>
        </ul>
        <div className="drop-zone" onDrop={ e => { this.onDropZoneDrop(e) }} onDragOver={ this.allowDrop }>
          Drop Things Here 
        </div>
        <ul>
          { Object.values(components).map(c => {
            if (c._type === 'HeroComponent') {
              return <HeroComponent data={ c } />
            }
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    components: state.components
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createHeroComponent: () => {
      dispatch(createHeroComponent());
    } 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
