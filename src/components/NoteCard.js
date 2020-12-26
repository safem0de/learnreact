import React from 'react';

const NoteCard = props =>(
    <div className='jumbotron'>
        {props.children}
    </div>
);

export default NoteCard;