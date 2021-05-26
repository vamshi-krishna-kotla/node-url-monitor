import React, { Component } from 'react';

import styles from './Features.module.scss';

export default class Features extends Component {
	state = {
		funcFeatures : [
			"Sign Up with new credentials",
			"Sign In to check your details",
			"Set upto 5 checks for your pages",
			"Edit and update your check(s)"
		]
	};

	constructor(props) {
		super(props);
	}

	/**
	 * 
	 * @param {Object} event : the event object while typing in the input boxe
	 * 
	 * This is method which leverages the parent's method to edit the parent state
	 * with this way, we can update the stae of the parent from children
	 * without using a global state
	 * 
	 */
	modifyCommonStateInput = (event) => {
		this.props.modifyCommonStateInput(event.target.value);
	};

	render () {
		return (
			<div className={[styles.features, this.props.propClass].join(' ')}>
				<p className={styles.title}><strong>Functional Features</strong></p>
				<hr></hr>
				<ul className={styles.funcFeaturesList}>
					{
						this.state.funcFeatures.map((feature, index) => <li className={styles.funcFeaturesListItem} key={index}>{feature}</li>)
					}
				</ul>
				<input onInput={this.modifyCommonStateInput}></input>
			</div>
		);
	};
}