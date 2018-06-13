import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManagePayAndDiscount.css';
import ManagePayClassify from "./managePayClassify/ManagePayClassify";
import ManagePayDetail from "./managePayDetail/ManagePayDetail";
import ManageDiscount from "./manageDiscount/ManageDiscount";
import ManageDiscountList from "./manageDiscountList/ManageDiscountList";
class ManagePayAndDiscount extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'managePayAndDiscountParent'}>
                <div>
                    <ul>
                          <li><Link to={match.url}>결제 방법 관리</Link></li>
                        <li><Link to={match.url + '/payDetail/register'}>결제 상세 등록</Link></li>
                        <li><Link to={match.url + '/discount'}>할인 관리</Link></li>
                        <li><Link to={match.url + '/discount/register'}>할인 등록</Link></li>
                    </ul>
                </div>
                <div className={'managePayAndDiscountBody'}>
                    <Route exact path={match.path } component= {ManagePayClassify}></Route>
                    <Route path={match.path + "/payDetail/register"} component= {ManagePayDetail}></Route>
                       <Route exact path={match.path + "/discount"} component= {ManageDiscountList}></Route>
                    <Route  path={match.path + '/discount/register' } component= {ManageDiscount}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManagePayAndDiscount);