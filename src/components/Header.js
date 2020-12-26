import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser,logout} from '../actions/userActions';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';

class Header extends Component {
    render(){
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
                <ul className='nav navbar navbar-right'>
                        {
                            this.props.user === null ?
                            (
                                <li>
                                    <Link to='/login'>Login</Link>
                                </li>
                            ):(
                                <li>
                                    <Link to='/login' onClick={()=> {this.props.logout()}}>Logout</Link>
                                </li>
                            )
                        }
                </ul>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state,ownProps){
    return{
        user:state.user
    };
}

export default connect(mapStateToProps,{getUser,logout})(Header);