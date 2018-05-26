import React, {Component} from 'react';
import './SearchPeople.css';
class SearchPeople extends Component {
    people = [{id: 1, name: '토비 맥과이어'}, {id:2, name: '토니 스타크'}];
    constructor(props) {
        super(props);
        this.state = {searchInput: '', people: []}
    }
    onChangeSearchInput = (event) => {
        this.setState({searchInput: event.target.value}, () => {
            const searchInput = this.state.searchInput;
            if(searchInput.length === 0 ){
                this.setState({people: []});
            }else {
                this.setState({people: this.people.filter((p) => p.name.indexOf(searchInput) !== -1)});
            }
        });
    }
    onPeopleItemClick = (person) => {
        const { onPersonClick } = this.props;
        onPersonClick({...person, job: 'A'});
    }
    render() {
        const { onChangeSearchInput, onPeopleItemClick } = this;
        return(
            <div className={'searchPeopleParentDiv'}>
                <div>
                     <input type={'text'} value={this.state.searchInput} onChange={onChangeSearchInput} placeholder={'인물을 검색한뒤 클릭'}/>
                </div>
                <div>
                    {this.state.people.map((p) => {
                        return (
                            <div className={'searchPeopleItem'} onClick={() => onPeopleItemClick(p)} key={p.id}>
                                <div className={'searchPeopleItemImage'}>사진</div>
                                <div className={'searchPeopleItemName'}>{p.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default SearchPeople;