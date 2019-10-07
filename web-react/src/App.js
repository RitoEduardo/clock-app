import React from 'react';
import './App.css';
import Clock from './components/clock';
import TimeList from './components/list-time';

class App extends React.Component{
	
    constructor(props) {
        super(props)
		this.newTime = [];
        this.state = {
			timeClock : new Date(0,0,0,10,21,21),
			srcTime: "12:00",
			timeInput : null,
			//Hora y minutos agregados
			timeServer: [],
        }
    }
	componentDidMount() {
        fetch('http://localhost:4000/api/models/',{})
			.then(res => res.json())
			.then((data) => {
				let get_time = data.response.map( (x)=> {
					return {
						date_random : new Date(x['date_generate']),
						date_user : new Date(x['date_user']),
						id : x['_id']
					}	
				})
				//Datos del servidor - historicos
				this.newTime = get_time;
			  this.setState({ 
				timeServer: get_time
			  })
			})
			.catch(console.log)
      }
	handleTimeChange = (event) => {
		let src = event.target.value;
		this.setState({
			srcTime : src,
			timeInput: new Date(0,0,0,src.split(":")[0],src.split(":")[1],0),
			timeClock: new Date(0,0,0,src.split(":")[0],src.split(":")[1],0),
		})
	}
	handleSubmit = (event) => {
		
		event.preventDefault();
		
		let src = this.state.srcTime;
		if( !src || src === "" ){
			return new Error("EL input time no es valido");
		}
		let hour = src.split(":")[0];
		let minutes = src.split(":")[1];
		let timeNow = new Date(0,0,0,hour,minutes,0);
		//Set al reloj
		this.fnExecute( timeNow );
		
		//Petición al servidor
		var data = new URLSearchParams();
		data.append('hour', timeNow.getHours() );
		data.append('minutes', timeNow.getMinutes() );
		fetch('http://localhost:4000/api/models/', {
		  method: 'POST',
		  body: data,
		  headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response =>{
			let x = response.model;
			let timeServer = {
				date_random : new Date(x['date_generate']),
				date_user : new Date(x['date_user']),
				id : x['_id']
			}				
			this.newTime.push(timeServer);
			this.setState({
				srcTime: "12:00",
				timeInput: null,
				timeServer: this.newTime
			});
		});
		
		
		
	}
	handleDelete = (id, index ) => {
		
		fetch('http://localhost:4000/api/models/'+id, {
		  method: 'DELETE',
		  headers:{
			'Content-Type':'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response =>{
			if( response && response['success'] == true ){
				this.newTime.splice(index, 1);
				this.setState({
					timeServer: this.newTime
				})
			}else{
				alert("Error en la eliminación");
			}
			
		});
		return;
	  
	}
	// Access the clock 
	fnExecute = (d) => {
        this.customDrawerReference.fnRefresh(d);
    }
	
	render(){
		return ( 
			<div className="App">
				<div className="App-header"> 
					<Clock 
						okTime={this.state.timeClock} 
						ref={element => {this.customDrawerReference = element}}
					/>
					<form onSubmit={this.handleSubmit}>
					  <input 
						value={this.state.srcTime}
						onChange={this.handleTimeChange}
						type="time"
						name="time_input"/>
					  <br/>
					  <input type="submit"/>
					</form>
					<ul>
						<TimeList time={this.state.timeServer} handleDelete={this.handleDelete} />
					</ul>
				</div>  
			</div>
		);
	}
}

export default App;