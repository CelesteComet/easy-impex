import React, { Component } from 'react';
import logo from './logo.svg';

// CSS stuff, put into LESS files later
import './css/specialized.css';
import './css/editor.css';
import './App.css';


import { connect } from 'react-redux';

// actions
import { createHeroComponent, createStoryTextComponent } from './actions/componentActions';
import { changeSelectedComponent } from './actions/componentNavigatorActions';

// components
import HeroComponent from './components/HeroComponent';
import EditorComponent from './components/EditorComponent';
import StoryTextComponent from './components/StoryTextComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.onDropZoneDrop = this.onDropZoneDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
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
          <li draggable onDragStart={ e => { this.drag(e) }}>StoryTextComponent</li>
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
                if (c._type === 'StoryTextComponent') {
                  return <StoryTextComponent data={ c } key={c.uid}/>
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

const createComponent = (componentActionFunction, dispatch) => {
  const action = componentActionFunction();
  const { type, payload } = action;
  dispatch(action);
  dispatch(changeSelectedComponent(payload.uid));
};

const mapDispatchToProps = dispatch => {
  return {
    createHeroComponent: () => {
      createComponent(createHeroComponent, dispatch);
    },
    createStoryTextComponent: () => {
      createComponent(createStoryTextComponent, dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
