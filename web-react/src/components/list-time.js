import React, { Fragment } from 'react';
import Time from './time'

function TimeList(props){
  return(
    <Fragment>
      {props.time.map((data, id) => <Time key={id} value={data} handleDelete={props.handleDelete} indexId={id}/>)}
    </Fragment>
  )
}
export default TimeList;