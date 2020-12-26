import React , {Component} from 'react';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {getNotes,saveNote,deleteNote} from '../actions/notesAction';
import {getUser} from '../actions/userActions';
import NoteCard from './NoteCard';
import { Link } from 'react-router-dom';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            body :'',
            notes : {}
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.renderNotes = this.renderNotes.bind(this)
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
            uid:this.props.user.uid
        }
        this.props.saveNote(note);
        this.setState({
            title:'',
            body:''
        })
    }

    renderNotes(){
        return _.map(this.props.notes,(note,key)=>{
            return(
                <NoteCard key={key}>
                    <Link to={`/${key}`}>
                    <h3>{note.title}</h3>
                    </Link>
                    <p>{note.body}</p>
                    {(note.uid === this.props.user.uid) && (
                    <div>
                        <button
                            className = 'btn btn-danger btn-xs'
                            onClick = {()=>this.props.deleteNote(key)}>
                            Delete
                        </button>
                        <Link
                            to={`/${key}/edit`}
                            className='btn btn-info btn-xs float-right'>
                            Update
                        </Link>
                    </div>
                    )}
                </NoteCard>
            );
        });
    }

    render(){
        return(
            <div className='container-fluid mt-3'>
                <div className='row align-items-center justify-content-center mb-3'>
                <div className="col-sm-2 text-center">
                <img 
                    src={this.props.user.photoURL}
                    height="100px"
                    className="rounded-circle"
                    style={{ padding: '20px' }}
                    alt={this.props.user.displayName}
                />
                <p className="username">Welcome back <br/><b>{this.props.user.displayName}</b></p>
                </div>
                    <div className='col-sm-6 '>
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
                                <button className='btn btn-primary float-right'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-sm-8'>
                        {this.renderNotes()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    return {
        notes: state.notes,
        user: state.user
    }
}

export default connect (mapStateToProps,{getNotes,saveNote,deleteNote,getUser})(App);