import React, {Component} from 'react';
import './ManageRoomChairPriceSelect.css';
class ManageRoomChairPriceSelect extends Component {
    state = {priceId: -1}
    chairPrice = [{id: 1, name: '스페셜 가격', price: 10000}, {id: 2, name: '커플가격', price: 100000}];
    priceChange = (event) => {
        const {onSeatTypeChange} = this.props;
        const id = Number(event.target.value);
        this.setState({priceId: id}, () => {
            onSeatTypeChange(this.state.priceId);
        });
    }
    render() {
        const seatTypes = this.props.seatType;
        return (
            <div className={'manageRoomChairPriceDiv'}>
                <div className={'priceTitle'}>
                    가격선택:
                </div>
                <select value={this.state.priceId} onChange={this.priceChange}>
                    <option value={-1}>선택 안됨</option>
                    {seatTypes.map((s) => {
                        return (<option value={s.SEAT_TYPE_ID}>{s.SEAT_TYPE_NAME +'-'+ s.ADD_COST +' 원'}</option>);
                    })}
                </select>
            </div>
        )
    }
}
export default ManageRoomChairPriceSelect;