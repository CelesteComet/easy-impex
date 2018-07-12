import React, { Component } from 'react';
import logo from './logo.svg';

// CSS stuff, put into LESS files later
import './css/specialized.css';
import './css/editor.css';
import './App.css';


import { connect } from 'react-redux';

// actions
import { createHeroComponent } from './actions/componentActions';
import { changeSelectedComponent } from './actions/componentNavigatorActions';

// components
import HeroComponent from './components/HeroComponent';
import EditorComponent from './components/EditorComponent';

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
    const { components, currentComponentUID } = this.props;
    return (
      <div className="App">
        <ul>
          <li draggable onDragStart={ e => { this.drag(e) }}>HeroComponent</li>
          <li draggable onDragStart={ e => { this.drag(e) }}>QuoteComponent</li>
        </ul>
        <div className="drop-zone" onDrop={ e => { this.onDropZoneDrop(e) }} onDragOver={ this.allowDrop }>
          Drop Things Here 
        </div>
        { currentComponentUID && <EditorComponent data={ components[currentComponentUID] } /> }
        <div id="page">
          <div id="content">
              { Object.values(components).map((c) => {
                if (c._type === 'HeroComponent') {
                  return <HeroComponent data={ c } key={c.uid}/>
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    components: state.components,
    currentComponentUID: state.navigator.componentUID
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createHeroComponent: () => {
      const createHeroComponentAction = createHeroComponent();
      const { type, payload } = createHeroComponentAction;
      dispatch(createHeroComponentAction)
      dispatch(changeSelectedComponent(payload.uid));
    } 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
