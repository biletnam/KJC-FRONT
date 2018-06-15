import React, {Component} from 'react'
import './MovieInformation.css';
import { Table } from 'reactstrap';
import {serverUrl} from "../../../reducers/urlUtil";
import YouTube from 'react-youtube';
class MovieInformation extends Component {
    _onReady(event) {
        event.target.pauseVideo();
    }
    render () {
        const {onCloseModal, selectedMovie} = this.props;
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        const youtubeSplitArray = selectedMovie.VIDEO_ADDR.split('/');
        const videoId = youtubeSplitArray[youtubeSplitArray.length - 1];
        return (
            <div className={'movie-information-parent-div'}>
                <div className={'movie-information-close'}>
                    <span className={'movie-info-title'}>영화 정보</span> <button onClick={onCloseModal}>X</button>
                </div>
                <div className={'movie-information-body'}>
                    <div className={'movie-info-1'}>
                        <img className={'movie-info-img'} src={serverUrl + '/' + selectedMovie.MOVIE_IMG}/>
                        <div className={'movie-info'}>
                               <Table bordered className={'movie-info-table'}>
                                    <tbody>
                                      <tr>
                                        <th scope="row" className={'movie-info-th'}>영화 이름</th>
                                        <td>{selectedMovie.MOVIE_NAME}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" className={'movie-info-th'}>영화 정보</th>
                                        <td>{selectedMovie.MOVIE_INTRO}</td>
                                      </tr>
                                      <tr>
                                          <th scope="row" className={'movie-info-th'}>장르</th>
                                          <td>{selectedMovie.GENRE}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" className={'movie-info-th'}>인물</th>
                                        <td>{selectedMovie.PERSON && selectedMovie.PERSON.map((p) =>
                                            (<p key={p.PER_ID}>{p.PER_NAME} - {p.CH_NAME}</p>)
                                        )}</td>
                                      </tr>
                                    </tbody>
                               </Table>
                        </div>
                    </div>
                    {selectedMovie.VIDEO_ADDR &&
                        <div className={'movie-info-youtube'}>
                            <YouTube videoId={videoId} opts={opts} onReady={this._onReady}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default MovieInformation;