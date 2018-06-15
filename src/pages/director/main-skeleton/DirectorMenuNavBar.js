import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
        const { isOpen, match, loginData} = this.props;
        console.log(loginData);
        return (
            <div className="navBarDiv directorMenu">
                <Navbar color="#ffffff" light expand="md">
                    <NavbarBrand href="/director"><span className="KJC">KJC-CINEMA</span></NavbarBrand>
                  <NavbarToggler onClick={this.toggle}/>
                  <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                      <NavItem>
                            <Link to={match.url + '/manageMovie'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p first">
                                  영화 관리
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                        <Link to={match.url + '/manageRoom'} style={{textDecoration: 'none', color: 'black'}}>
                          <p className="nav-p">
                              상영관 관리
                          </p>
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to={match.url + '/manageMovieSchedule'} style={{textDecoration: 'none', color: 'black'}}>
                          <p className="nav-p">
                              상영 일정 관리
                          </p>
                        </Link>
                      </NavItem>
                       <NavItem>
                            <Link to={match.url + '/managePeople'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  인물 관리
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                            <Link to={match.url + '/managePrice'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  가격 관리
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                            <Link to={match.url + '/manageMember'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  회원 관리
                              </p>
                            </Link>
                      </NavItem>
                       <NavItem>
                            <Link to={match.url + '/manageBranch'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  지점 관리
                              </p>
                            </Link>
                      </NavItem>
                      <NavItem>
                        <Link to={match.url + '/payAndDiscount'} style={{textDecoration: 'none', color: 'black'}}>
                          <p className="nav-p">
                              할인 및 결제방법
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
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen, loginData: state.login}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch)}))(DirectorMenuNavBar))