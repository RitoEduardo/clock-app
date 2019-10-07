import React, { Fragment } from 'react';
import Time from './time'

function TimeList(props){
  return(
    <Fragment>
      {props.time.map((d, id) => <Time key={id} value={d} handleDelete={props.handleDelete}/>)}
    </Fragment>
  )
}
export default TimeList;