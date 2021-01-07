import React,{Component} from 'react';
import '/src/App.css';
import Header from '/src/Header';
import WebContent from '/src/WebContent';

class App extends React.Component {
   render() {
      return (
      <div align="center">
      	<Header/>
      	<WebContent/>
      </div>
      );
   }
}
export default App;