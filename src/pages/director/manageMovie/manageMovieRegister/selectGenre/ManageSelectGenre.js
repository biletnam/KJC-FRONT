import React, { Component } from 'react';
import './ManageSelectGenre.css';
class ManageSelectGenere extends Component {
    state = {genreId: 1};
    addGenre = () => {
        const {onGenreAdd} = this.props;
        onGenreAdd(this.state.genreId);
    }
    deleteGenre = (genreId) => {
        const {onGenreDelete} = this.props;
        onGenreDelete(genreId);
    }
    optionChange = (e) => {
        this.setState({genreId: e.target.value}, () => {console.log(this.state)});
    }
    render() {
        const { genres, selectedGenres } = this.props;
        console.log(genres);
        return (
            <div className={'manage-select-genre-parent'}>
                <div className = {'manage-select-genre-select-div'}>
                    <select value={this.state.genreId} onChange={this.optionChange}>
                        {genres.map((g) => {
                            return (<option value={g.id} key={g.id}>{g.name}</option>)
                        })}
                     </select>
                </div>
                <div className = {'manage-select-genre-button-div'}>
                        <button type='button' onClick={this.addGenre}>추가</button>
                </div>
                <div className={'manage-selected-genre'}>
                    <div className={'manage-selected-genre-title'}>선택된 장르</div>
                    {selectedGenres.map((sg) => {
                        return <button type={'button'} onClick={() => this.deleteGenre(sg.id)} key={sg.id}>{sg.name}</button>
                    })}
                </div>
            </div>
        )
    }
}
export default ManageSelectGenere;