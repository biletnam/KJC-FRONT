import React, { Component } from 'react';
import './Login.css'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import UserLogin from "./UserLogin";
import NonUserLogin from "./NonUserLogin";
class Login extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className ="pageParent">
               <div className="page-title">로그인</div>
                <div className="page-body">
                    <div className = "loginTab">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                <span className="tabTitle">회원 로그인</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                <span className="tabTitle">비회원 로그인</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <Row>
                              <Col sm="12">
                                <UserLogin/>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2">
                              <NonUserLogin/>
                          </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;