import React, { Component } from 'react';

// actions

import { changeComponentField } from '../actions/componentActions';

class HeroComponent extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			dialog: true
		};
	}

	handleChange(e) {
		console.log(e.target.innerHTML);
	}

	render() {
		const { title, subtitle } = this.props.data;
		return (
			<div>
				<div className='text-block'>
					<h1 contentEditable="true" onInput={this.handleChange}>{ title }</h1>
					<p contentEditable="true" onInput={this.handleChange}>{ subtitle }</p>
				</div>
				<div className='dialog'>
					<ul>
						{ Object.keys(this.props.data).map((i, e) => {
							return (
								<label key={e}>{i}
									<input type='text' value={this.props.data[i]}/>		
								</label>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default HeroComponent;