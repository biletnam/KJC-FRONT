import React, {Component} from 'react';
import './SearchPeople.css';
import axios from 'axios';
import {serverUrl} from "../../../../../reducers/urlUtil";

class SearchPeople extends Component {
    people = [];
    state = {searchInput: '', people: [], isLoading: false};
    componentWillMount() {
        this.setState({isLoading: true});
        axios.get(serverUrl + '/api/people')
            .then((response) => {
                this.people = response.data;
                console.log(response);
                this.setState({isLoading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({isLoading: false});
            });
    }
    onChangeSearchInput = (event) => {
        this.setState({searchInput: event.target.value}, () => {
            const searchInput = this.state.searchInput;
            if(searchInput.length === 0 ){
                this.setState({people: []});
            }else {
                this.setState({people: this.people.filter((p) => p.PER_NAME.indexOf(searchInput) !== -1)});
            }
        });
    }
    onPeopleItemClick = (person) => {
        const { onPersonClick } = this.props;
        onPersonClick(person);
    }
    render() {
        const { onChangeSearchInput, onPeopleItemClick } = this;
        return(
            <div className={'searchPeopleParentDiv'}>
                {this.state.isLoading && <p>인물을 불러오고 있습니다. 잠시 후에 검색해주세요.</p>}
                <div>
                     <input type={'text'} value={this.state.searchInput} onChange={onChangeSearchInput} placeholder={'인물을 검색한뒤 클릭'}/>
                </div>
                <div>
                    {this.state.people.map((p) => {
                        return (
                            <div className={'searchPeopleItem'} onClick={() => onPeopleItemClick(p)} key={p.PER_ID}>
                                <div className={'searchPeopleItemImage'}>
                                    <img src={serverUrl + '/' + p.PER_IMG}/>
                                </div>
                                <div className={'searchPeopleItemRole'}>
                                    {p.ROLE}
                                </div>
                                <div className={'searchPeopleItemName'}>{p.PER_NAME}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default SearchPeople;