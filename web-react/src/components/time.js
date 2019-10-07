import React, { Fragment } from 'react';

function fnAddZero(n){
	return n < 10 ? '0' + n : n;
}

function Time(props){
  return(
	<li className="liDateFormat">
		<div className="tooltip">
			<span className="serverData">
			{ fnAddZero( props.value.date_random.getHours() ) }
			:
			{ fnAddZero( props.value.date_random.getMinutes() ) }
			</span>
		  <span className="tooltiptext">Información random del servidor</span>
		</div>
		<div className="tooltip">
		<span className="localData">
		{ fnAddZero( props.value.date_user.getHours() ) }
		:
		{ fnAddZero( props.value.date_user.getMinutes() ) }
		</span>
		<span className="tooltiptext">Información generada por el usuario</span>
		</div>
		<div className="button-container">
			<button
			  onClick={() => {props.handleDelete(props.value.id,props.indexId)}}
			  className="delete-button"
			>
			X
			</button>
		</div>
	</li>
  )
}

export default Time;