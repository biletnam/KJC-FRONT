import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
import'./MenuNavBar.css';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';
import * as loginAction from 'reducers/user/login';
import {withRouter} from 'react-router-dom';
class MenuNavBar extends Component {
    toggle = () => {
        const { WindowSizeActions } = this.props;
        WindowSizeActions.menuToggle();
    }
    logout = () => {
        const {history, LoginActions} = this.props;
        LoginActions.logOut(history);
    }

    render() {
        const { isOpen, isLogin, userInformation } = this.props;
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
                        {isLogin &&
                            <React.Fragment>
                               <NavItem>
                                    <Link to={'/reserveInfo'} style={{textDecoration: 'none', color: 'black'}}>
                                      <p className="nav-p">
                                           예매정보
                                      </p>
                                    </Link>
                               </NavItem>
                                {userInformation && userInformation.IS_USER === 'Y' && <NavItem>
                                    <Link to={'/userInfo'} style={{textDecoration: 'none', color: 'black'}}>
                                      <p className="nav-p">
                                           회원 정보
                                      </p>
                                    </Link>
                                </NavItem>}
                            </React.Fragment>
                        }
                      <NavItem>
                          {
                              !isLogin &&  <Link to={'/login'} style={{textDecoration: 'none', color: 'black'}}>
                              <p className="nav-p">
                                  로그인
                              </p>
                            </Link>
                          }
                          {
                              isLogin && <p className={"nav-p"} onClick={this.logout}>로그아웃</p>
                          }

                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
            </div>
        );
    }

}
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch),
    LoginActions: bindActionCreators(loginAction, dispatch)
}))(MenuNavBar))