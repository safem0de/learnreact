import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import {editNote} from '../actions/notesAction';

class NoteEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : this.props.note.title,
            body :this.props.note.body,
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handlerSubmit(e){
        e.preventDefault();
        const note = {
            title:this.state.title,
            body:this.state.body,
            uid:this.props.uid
        }
        this.props.editNote(this.props.match.params.id,note);
        this.setState({
            title:'',
            body:''
        })
        this.props.history.push('/');
    }

    render(){
        return(
            <div className='container-fluid mt-3'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-sm-6 col-sm-offset-3'>
                        <form onSubmit={this.handlerSubmit}>
                            <div className='form-group'>
                                <input
                                    onChange = {this.handlerChange}
                                    value = {this.state.title}
                                    type='text'
                                    name='title'
                                    className='form-control'
                                    placeholder='Title...'
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <textarea
                                    onChange = {(this.handlerChange)}
                                    value = {this.state.body}
                                    type='text'
                                    name='body'
                                    className='form-control'
                                    placeholder='Body...'
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <button className='btn btn-primary'>
                                    Submit
                                </button>
                            </div>
                        </form>
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
    };
}

export default connect(mapStateToProps,{editNote})(NoteEdit);