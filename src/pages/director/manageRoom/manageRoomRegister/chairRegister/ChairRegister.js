import React, {Component} from 'react';
import './ChairRegister.css';
class ChairRegister extends Component {
    addRow = () => {
        const {onAddRow} = this.props;
        onAddRow();
    }
    deleteRow = () => {
        const {onRowDelete} = this.props;
        onRowDelete();
    }
    onColumnInputChange = (row, event) => {
        const {onRowUpdate} = this.props;
        const columnNum = Number(event.target.value);
        row.column = columnNum;
        onRowUpdate(row);
    }

    render() {
        const {addRow, onColumnInputChange, deleteRow} = this;
        const {rows} = this.props;
        return (<div className={'ChairRegisterParentDiv'}>
            <div className={'ChairRegisterAddButton'}>
                <button type={'button'} onClick={addRow}>열 추가</button>
                <button type={'button'} onClick={deleteRow}>열 제거</button>
                <span>열 추가후, 행 입력 (*숫자만 * 1~20)</span>
            </div>
            <div className={'ChairRegisterList'}>
                <div>
                    {rows.map((row) => {
                        return (
                            <div key = {row.id} className={'ChairRowInputList'}>
                               <div>{row.id} 열</div>
                               <div><input type={'number'} max={20} min={1} onChange={(event) => onColumnInputChange(row, event)}/></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>)
    }
}
export default ChairRegister;