import React, {Component} from 'react';
import './SelectedPeople.css';


class SelectedPeople extends Component {
    selectedPeople = [];
    constructor(props) {
        super(props);
        this.state = {people: []}
    }
    personDeleteClick = (person) => {
        const {personDelete} = this.props;
        personDelete(person);
    }
    onPersonDataChange = (person) => {
        const {onPersonChange} = this.props;
        onPersonChange(person);
    }
    checkBoxChange = (event, person) => {
        person.IS_MAIN = event.target.checked;
        this.onPersonDataChange(person);
    }
    characterNameChange = (event, person) => {
        person.CH_NAME = event.target.value;
        this.onPersonDataChange(person);
    }
    render() {
        const {personDeleteClick} = this;
        return(
            <div className={'selectedPersonDiv'}>
                {this.props.people.map((p) => {
                    return (
                        <div className={'selectedPersonItemDiv'} key={p.PER_ID}>
                          <div>{p.PER_NAME}</div>
                          <div>
                              {p.ROLE}
                          </div>
                            {p.ROLE.indexOf('배우') !== -1 &&
                                <div className={'main-setting'}>주연 설정 :<input type={'checkbox'} defaultChecked={p.isMain}  onChange={(event) => this.checkBoxChange(event, p)}/></div>
                            }
                            <div className={'character-name'}>캐릭터 이름: <input type={'text'} value={p.characterName} onChange={(event) => this.characterNameChange(event, p)}/></div>
                          <div onClick={() => personDeleteClick(p)} className={'x-button'}>x</div>
                      </div>
                    )
                })}
              </div>
        )
    }
}
export default SelectedPeople;
