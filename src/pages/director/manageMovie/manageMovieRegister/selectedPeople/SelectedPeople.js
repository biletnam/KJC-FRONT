import React, {Component} from 'react';
import './SelectedPeople.css';
class SelectedPeople extends Component {
    selectedPeople = [];
    constructor(props) {
        super(props);
        this.state = {people: []}
    }
    personJobChange = (person, event) => {
        const {personUpdate} = this.props;
        const act = event.target.value;
        console.log(act);
        personUpdate({...person, job: act});
    }
    personDeleteClick = (person) => {
        const {personDelete} = this.props;
        personDelete(person);
    }
    render() {
        const {personJobChange, personDeleteClick} = this;
        return(
            <div className={'selectedPersonDiv'}>
                {this.props.people.map((p) => {
                    return (
                        <div className={'selectedPersonItemDiv'} key={p.id}>
                          <div>{p.name}</div>
                          <div>
                              <select value={p.job} onChange={(event) => personJobChange(p, event)}>
                                  <option value={'A'}>배우</option>
                                  <option value={'D'}>감독</option>
                                  <option value={'B'}>감독+배우</option>
                              </select>
                          </div>
                          <div onClick={() => personDeleteClick(p)}>x</div>
                      </div>
                    )
                })}
              </div>
        )
    }
}
export default SelectedPeople;
