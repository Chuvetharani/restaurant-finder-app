import React, { Component } from 'react';
import '/src/App.css';

class WebContent extends React.Component {
    constructor(props) {
        super(props);
        this.onChangecityId = this.onChangecityId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            cityId: '',
            name: '',
            message:'',
            output:'',
            error:null,
            isLoaded: false,
      		data: [],
      		jlength:''
        }
    }

    onChangecityId(e) {
        this.setState({ cityId: e.target.value });
    }
    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault()
        const cityId = this.state.cityId;
        const name = this.state.name;
        if(name != " " && cityId != ""){
        this.setState({
            cityId: '',
            name: '',
            message:'Data saved sucessfully.',
            isLoaded:true
        })
          let flash =  document.getElementsByClassName("alert-success")[0];
          flash.style.display = "block";
          setTimeout(function(){ flash.setAttribute(
          "style", "display:none;transition: display 8s ease-in;"); });
          return fetch("https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q="+name+"&start=0&count=50",{
    	 'method':'GET',
    	headers:{
    	'user-key':'4e1a12d27a6c9767848e405ae5b2aa4f',
    	 'Accept': 'application/json',
    	},
    })
      .then(res => {
      	return res.json()
      	
      })
      .then(response => this.setState({data:response.restaurants,jlength:response.results_shown,isLoaded:false}))
      .catch(error => {
      	console.log("error");
      });	
        }
         else if(name === " " || cityId === ""){
            this.setState({
              message:"Fill the required form field"
            })
             let flash =  document.getElementsByClassName("alert-danger")[0];
             flash.style.display = "block";
             setTimeout(function(){ flash.setAttribute(
             "style", "display:none;transition: display 4s ease-in;"); });
         }  
    }

    componentWillMount() {
    	this.userData = JSON.parse(localStorage.getItem('rest'));
    	const cityId = this.state.cityId;
        const name = this.state.name;     
	}
	
	render() {
		  const {data} = this.state;
		  const results = this.state.jlength;
			let shown;
			if(results > 0){
		     	shown = true;
		  } else {
		      shown = false;
		  }
      return (
			<div className="container-fluid" align="center">
				<div className="alert alert-success alert-dismissible" id="success">{this.state.message}
        </div>
        <div className="alert alert-danger alert-dismissible" id="success">{this.state.message}
        </div>
						<form onSubmit={this.onSubmit}>
						  <div className="form-check mb-2 mr-sm-2">
						   <select className="form-control form-control-lg col-12" id="select_id" value={this.state.cityId} onChange={this.onChangecityId}>
								<option value=""> Select City </option>
								<option value="4">Bengaluru</option>
								<option value="3" >Mumbai</option>
								<option value="1">Delhi</option>
								<option value="6">Hyderabad</option>
								<option value="11335">Amravati</option>
								<option value="11343">Itanagar</option>
								<option value="21">Dispur</option>
								<option value="5">Pune</option>
								<option value="40">Patna</option>
								<option value="11477">Rajpur</option>
								<option value="13">Panaji</option>
								<option value="2">Kolkata</option>
								<option value="7">Chennai</option>
							</select>
  						    <button type="submit" id="getMessage">Search</button>
										 {this.state.isLoaded && <Spinner />}
							</div>		
					    </form>		     
			         {this.state.data.map((item,id) => 
			             <DataRow key = {id} data = {item} /> )}
			 </div>
		);
   }
}
/*spinner component*/
class Spinner extends React.Component {
	render(){
		return(
			<div class="text-center ml-2">
  				<div class="spinner-border" role="status">
    				<span class="sr-only">Loading...</span>
  				</div>
			</div>
			);
	}
}
class DataRow extends React.Component {
  render() {
	return (
	<div className="row">
	  <div className="restaurant_value col-6 offset-3 mb-4">
		<div className="col-9 float-left">
			<h4>{this.props.data.restaurant.name}</h4>
			<div><span><b>Address:</b>{this.props.data.restaurant.location.locality}<br/>{this.props.data.restaurant.location.address}</span></div>
			<div><span><b> Cuisines: </b>{this.props.data.restaurant.cuisines}</span></div>
			<div><span><b> Cost for two: </b>{this.props.data.restaurant.currency}{this.props.data.restaurant.average_cost_for_two}</span></div>
		</div>
		<div className="col-2 float-right">
			<h5 className="p-3 col-8 offset-2 mt-1" style={{background:"rgb(236, 66, 89)"}}>{this.props.data.restaurant.user_rating.aggregate_rating}</h5>
			<div className="px-4 col-12"><span>{this.props.data.restaurant.user_rating.rating_text}</span></div>
		</div>
	  </div>
	</div>
	);
  }
}
export default WebContent;
