import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './PriceMovieScheduleList.css';
import axios from 'axios';
import {serverUrl} from "../../../../reducers/urlUtil";

class PriceMovieScheduleList extends Component {
    state = {
        seatType: []
    }
    componentDidMount() {
        axios.get(serverUrl + '/api/playType')
            .then((response) => {
                console.log(response);

                this.setState({seatType: response.data.sort((pt, pt2) => (Number(pt.PT_ID) - Number(pt2.PT_ID)))});
            }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className={'priceMovieScheduleListDiv'}>
                <ReactTable
                    data={this.state.seatType}
                    columns={[
                        {
                            Header: '상영 종류 ID',
                            accessor: 'PT_ID'
                        },
                        {
                            Header: '이름',
                            accessor: 'PT_NAME'
                        },
                        {
                            Header: '가격',
                            accessor: 'PT_PRICE'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default PriceMovieScheduleList;