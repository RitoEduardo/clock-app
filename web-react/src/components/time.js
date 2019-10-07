import React, { Fragment } from 'react';

function fnAddZero(n){
	return n < 10 ? '0' + n : n;
}

function Time(props){
  return(
	<li className="liDateFormat">
		{ fnAddZero( props.value.getHours() ) }
		:
		{ fnAddZero( props.value.getMinutes() ) }
		<div className="button-container">
			<button
			  onClick={() => {props.handleDelete(props.id)}}
			  className="delete-button"
			>
			X
			</button>
		</div>
	</li>
  )
}

export default Time;