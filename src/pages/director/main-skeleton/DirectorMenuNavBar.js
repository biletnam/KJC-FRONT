import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import './DirectorMenuNavBar.css';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';


class DirectorMenuNavBar extends Component {
    toggle = () => {
        const { WindowSizeActions } = this.props;
        WindowSizeActions.menuToggle();
    }
    render() {
        const { isOpen } = this.props;
        return (
            <div className="navBarDiv">
                <Navbar color="#ffffff" light expand="md">
                    <NavbarBrand href="/director"><span className="KJC">KJC-CINEMA</span></NavbarBrand>
                  <NavbarToggler onClick={this.toggle}/>
                  <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                      <NavItem>
                            <Link to={'/director/manageMovie'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p first">
                                  영화 관리
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                        <p className="nav-p">
                            상영관 관리
                        </p>
                      </NavItem>
                      <NavItem>
                        <p className="nav-p">
                            상영일정 관리
                        </p>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
            </div>
        );
    }

}
export default connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch)
}))(DirectorMenuNavBar)