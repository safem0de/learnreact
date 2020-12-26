import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SubmitComment from './SubmitComment';

import _ from 'lodash';
import Comment from './Comment';

class NoteDetail extends Component{

    renderComments(){
        const {note} = this.props;
        return _.map(note.comments,(comment,key)=>{
            return(
                <Comment key={key} id={key}>
                  {comment.commentBody}
                </Comment>);
        });
    }
    render(){
        const {note} = this.props;
        return(
            <div className='container-fluid mt-3'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-sm-6 justify-content-sm-center'>
                        <h2>{note.title}</h2>
                        <p>{note.body}</p>
                        <SubmitComment id={this.props.match.params.id}/>
                        <br/>
                        {this.renderComments()}
                        <hr/>
                        <Link to='/'>Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    return{
        note : state.notes[ownProps.match.params.id],
        uid : state.user.uid
    }
}

export default connect(mapStateToProps)(NoteDetail);