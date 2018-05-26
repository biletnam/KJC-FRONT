import React, {Component} from 'react';
import './ChairRegisterShow.css';
class ChairRegisterShow extends Component {
    makeChair = (rid, length) => {
        const array = [];
        for(let i =0; i< length; i++) {
            array.push((<div className="chair" key={`${rid}-${i+1}`}>{i+1}</div>));
        }
        return array;
    }
    render() {
        const {makeChair} = this;
        const {rows} = this.props;
        const rowAndColumn = {};
        rows.map((r) => {
            rowAndColumn[r.id]  = makeChair(r.id, r.column);
        })
        return (
            <div className={'chairRegisterParentDiv'}>
               <div>
                   <div className={'chairRegistersScreenDiv'}>
                       <p className={'chairRegisterScreen'}>스크린</p>
                   </div>
                   {rows.map((r) => {
                       return (
                           <div key={r.id} className={"chairRow"}>
                            { rowAndColumn[r.id]}
                        </div>
                       )
                   })}
            </div>
            </div>
        )
    }
}
export default ChairRegisterShow;