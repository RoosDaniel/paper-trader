import React from 'react';

import Wrapper from './Wrapper';
import Name from './Name';
import CreationDate from './CreationDate';


const Session = ({ session }) => {
    let date = new Date(session.creation);
    const offset = date.getTimezoneOffset();

    date = new Date(date.getTime() - (offset*60*1000));
    date = date.toISOString().split("T")[0];

    
    return (
        <Wrapper>
            <Name>{ session.name }</Name>
            <CreationDate>{ date }</CreationDate>
        </Wrapper>
    )
};


export default Session;
