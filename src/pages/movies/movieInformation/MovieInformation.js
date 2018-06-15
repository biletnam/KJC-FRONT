import React, {Component} from 'react'
import './MovieInformation.css';
import { Table } from 'reactstrap';
import {serverUrl} from "../../../reducers/urlUtil";
class MovieInformation extends Component {

    render () {
        const {onCloseModal, selectedMovie} = this.props;
        return (
            <div className={'movie-information-parent-div'}>
                <div className={'movie-information-close'}>
                    <span className={'movie-info-title'}>영화 정보</span> <button onClick={onCloseModal}>X</button>
                </div>
                <div className={'movie-information-body'}>
                    <div className={'movie-info-1'}>
                        <img className={'movie-info-img'} src={serverUrl + '/' + selectedMovie.MOVIE_IMG}/>
                        <div className={'movie-info'}>
                               <Table borderless>
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                      </tr>
                                    </tbody>
                               </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieInformation;