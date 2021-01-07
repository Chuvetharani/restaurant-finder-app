import React, { Component } from 'react';
import '/src/App.css';
import img from '/images/logo.png'

class Header extends React.Component {
	render() {
      return (
				<div className="App" align="center">
        <img src={img}/>
				</div>
			);
    }
  }
export default Header;
