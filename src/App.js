import React, { Component } from 'react';
import logo from './logo.svg';

// CSS stuff, put into LESS files later
import './css/specialized.css';
import './css/editor.css';
import './App.css';


import { connect } from 'react-redux';

// actions
import { 
  createHeroComponent, 
  createStoryTextComponent,
  createCMSLinkComponent
} from './actions/componentActions';

import { changeSelectedComponent } from './actions/componentNavigatorActions';


// UI 
import NavBar from './components/NavBar';

// components
import HeroComponent from './components/HeroComponent';
import EditorComponent from './components/EditorComponent';
import StoryTextComponent from './components/StoryTextComponent';
import HeroComponentWrapper from './components/HeroComponentWrapper';

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
    const { components, currentComponentUID, createCMSLinkComponent } = this.props;
    return (
      <div className="App" onDrop={ e => { this.onDropZoneDrop(e) }} onDragOver={ this.allowDrop }>
        <NavBar createCMSLinkComponent={createCMSLinkComponent} />

        { currentComponentUID && <EditorComponent data={ components[currentComponentUID] } /> }
        <div id="page">
          <div id="content">
              { Object.values(components).map((c) => {
                if (c._type === 'HeroComponent') {
                  let hero = <HeroComponent data={c} key={c._uid} />
                  return <HeroComponentWrapper renderType={ c.renderType } heroComponents={[hero]} data={ c } key={c._uid}/>
                }
                if (c._type === 'StoryTextComponent') {
                  return <StoryTextComponent data={ c } key={c._uid}/>
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
  dispatch(changeSelectedComponent(payload._uid));
};

const mapDispatchToProps = dispatch => {
  return {
    createHeroComponent: () => {
      createComponent(createHeroComponent, dispatch);
    },
    createStoryTextComponent: () => {
      createComponent(createStoryTextComponent, dispatch);
    },
    createCMSLinkComponent: () => {
      console.log("CREATING")
      createComponent(createCMSLinkComponent, dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
