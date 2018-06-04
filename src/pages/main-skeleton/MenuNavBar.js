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
import'./MenuNavBar.css';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';


class MenuNavBar extends Component {
    toggle = () => {
        const { WindowSizeActions } = this.props;
        WindowSizeActions.menuToggle();
    }
    render() {
        const { isOpen } = this.props;
        return (
            <div className="navBarDiv userPageNav">
                <Navbar color="#ffffff" light expand="md">
                    <NavbarBrand href="/"><span className="KJC">KJC-CINEMA</span></NavbarBrand>
                  <NavbarToggler onClick={this.toggle}/>
                  <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                      <NavItem>
                            <Link to={'/movies'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p first">
                                  영화
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                        <p className="nav-p">
                            영화관
                        </p>
                      </NavItem>
                      <NavItem>
                            <Link to={'/reserve'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                   예매하기
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                            <Link to={'/login'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  로그인
                              </p>
                            </Link>
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
}))(MenuNavBar)