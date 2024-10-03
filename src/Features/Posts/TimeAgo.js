import React from 'react'
import { parseISO,formatDistanceToNow } from 'date-fns'

function TimeAgo({timestamp}) {
    let result="";
    if(timestamp){
        let distance= formatDistanceToNow(parseISO(timestamp));
        result=`${distance} ago`;
    }
  return (
    <div>
        <p style={{fontSize:"15px"}}>{result}</p>
    </div>
  )
}

export default TimeAgo