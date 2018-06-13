import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './PriceChairList.css';
import {serverUrl} from "../../../../reducers/urlUtil";
import axios from 'axios';
class PriceChairList extends Component {
    state = {
        seatType: []
    }
    componentDidMount() {
        axios.get(serverUrl + '/api/seatType')
            .then((response) => {
                console.log(response);
                this.setState({seatType: response.data});
            }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className={'priceChairListDiv'}>
                <ReactTable
                    data={this.state.seatType}
                    columns={[
                        {
                            Header: '좌석 종류 ID',
                            accessor: 'SEAT_TYPE_ID'
                        },
                        {
                            Header: '이름',
                            accessor: 'SEAT_TYPE_NAME'
                        },
                        {
                            Header: '가격',
                            accessor: 'ADD_COST'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default PriceChairList;