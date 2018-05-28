import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './PriceMovieScheduleList.css';
import * as genres from 'reducers/genre';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class PriceMovieScheduleList extends Component {
    componentDidMount() {
        const {GenresActions} = this.props;
        GenresActions.getGenres();
    }
    render() {
        const data = this.props.data.genres || [];
        return (
            <div className={'priceMovieScheduleListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '상영 가격 ID',
                            accessor: 'id'
                        },
                        {
                            Header: '이름',
                            accessor: 'name'
                        },
                        {
                            Header: '가격',
                            accessor: 'price'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default connect((state) => ({data: state.genres.data}), (dispatch) => ({
    GenresActions: bindActionCreators(genres, dispatch)
}))(PriceMovieScheduleList);