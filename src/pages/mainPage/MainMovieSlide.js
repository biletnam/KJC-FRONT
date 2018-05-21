import React, { Component } from 'react';
import Slider from "react-slick";
import './MainMovieSlide.css';
class MainMovieSlide extends Component {
    movieInfo = [{
        movieName: '어벤저스: 인피니티 워',
        movieNameE: 'Avengers: Infinity War',
        movieSimpleInfo: '개 재밌음. 마블 최고.',
        movieImage: 'assets/avengers3.jpg'
    }, {
        movieName: '챔피언',
        movieNameE: 'Champion',
        movieSimpleInfo: '20인치 팔뚝 아저씨가 온다.',
        movieImage: 'assets/champion.jpg'
    }]
    renderMovie = (index) => {
        return (
            <div className= "movieSlideContent">
                <img className="movieImage" src={this.movieInfo[index].movieImage}/>
                <div className = "movieInfo">
                    <p>{this.movieInfo[index].movieName}</p>
                    <p>{this.movieInfo[index].movieNameE}</p>
                    <p className= "movieInfoLine"></p>
                    <p>{this.movieInfo[index].movieSimpleInfo}</p>
                </div>
            </div>
        )
    };
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Slider {...settings}>
                  <div>
                      {this.renderMovie(0)}
                  </div>
                  <div>
                    {this.renderMovie(1)}
                  </div>
                </Slider>
              </div>
        );
    }
}
export default MainMovieSlide;