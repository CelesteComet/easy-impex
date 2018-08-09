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
  createHeroWrapperComponent,
  createStoryTextComponent,
  createHeroSplitComponent,
  createCMSLinkComponent
} from './actions/componentActions';

import { changeSelectedComponent } from './actions/componentNavigatorActions';


// UI 
import NavBar from './components/NavBar';

// components
import HeroComponent from './components/HeroComponent';
import EditorComponent from './components/EditorComponent';
import StoryTextComponent from './components/StoryTextComponent';
import HeroWrapperComponent from './components/HeroWrapperComponent';
import HeroSplitComponent from './components/HeroSplitComponent';
import ModalContainer from './components/ModalContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.onDropZoneDrop = this.onDropZoneDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
  }

  onDropZoneDrop(e) {
    const componentType = e.dataTransfer.getData("text");
    const { 
      createHeroComponent, 
      createStoryTextComponent, 
      createHeroWrapperComponent,
      createHeroSplitComponent
    } = this.props;
    const table = {
      "HeroComponent": createHeroComponent,
      "HeroWrapperComponent": createHeroWrapperComponent,
      "StoryTextComponent": createStoryTextComponent,
      "HeroSplitComponent": createHeroSplitComponent
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
    const { components, currentComponentUID, createCMSLinkComponent, modalId } = this.props;
    return (
      <div className="App" onDrop={ e => { this.onDropZoneDrop(e) }} onDragOver={ this.allowDrop }>
        <NavBar createCMSLinkComponent={createCMSLinkComponent} />

        { currentComponentUID && <EditorComponent data={ components[currentComponentUID] } /> }
        <div id="page">
          <div id="content">
            { modalId && <ModalContainer /> }
            { Object.values(components).map((c) => {
              // if (c._type === 'HeroComponent') {
              //   return (
              //     <ModalContainer>
              //       <HeroComponent renderType={ c.renderType } heroComponentUIDs={c.heroComponents} data={ c } key={c._uid}/>
              //     </ModalContainer>
              //   );
                  
              // }
              if (c._type === 'StoryTextComponent') {
                return <StoryTextComponent data={ c } key={c._uid}/>
              }
              if (c._type === 'HeroWrapperComponent') {
                return <HeroWrapperComponent data={ c } key={c._uid}/>
              }
              if (c._type == 'HeroSplitComponent') {
                return <HeroSplitComponent data={ c } key={c._uid}/>
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
    currentComponentUID: state.navigator.componentUID,
    modalId: state.editor.modalId

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
    createHeroWrapperComponent: () => {
      createComponent(createHeroWrapperComponent, dispatch);
    },    
    createStoryTextComponent: () => {
      createComponent(createStoryTextComponent, dispatch);
    },
    createHeroSplitComponent: () => {
      createComponent(createHeroSplitComponent, dispatch);
    },
    createCMSLinkComponent: () => {
      createComponent(createCMSLinkComponent, dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
