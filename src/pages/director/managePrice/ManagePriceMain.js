import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManagePriceMain.css';
import PriceMovieScheduleList from "./priceMovieScheduleList/PriceMovieScheduleList";
import PriceMovieScheduleRegister from "./priceMovieScheduleRegister/PriceMovieScheduleRegister";
import PriceChairList from "./priceChairList/PriceChairList";
import PriceChairRegister from "./priecChairRegister/PriceChairRegister";
class ManagePriceMain extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'managePriceParent'}>
                <div>
                    <ul>
                        <li><Link to={match.url}>상영 가격 목록</Link></li>
                        <li><Link to={match.url + '/schedule/register'}>상영 가격 등록</Link></li>
                        <li><Link to={match.url+'/chair'}>좌석 가격 목록</Link></li>
                        <li><Link to={match.url + '/chair/register'}>좌석 가격 등록</Link></li>
                    </ul>
                </div>
                <div className={'managePriceBody'}>
                    <Route exact path={match.path } component= {PriceMovieScheduleList}></Route>
                    <Route path={match.path + "/schedule/register"} component= {PriceMovieScheduleRegister}></Route>
                    <Route exact path={match.path + '/chair' } component= {PriceChairList}></Route>
                    <Route path={match.path + "/chair/register"} component= {PriceChairRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManagePriceMain);