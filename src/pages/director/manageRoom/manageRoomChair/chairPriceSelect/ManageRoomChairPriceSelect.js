import React, {Component} from 'react';
import './ManageRoomChairPriceSelect.css';
class ManageRoomChairPriceSelect extends Component {
    state = {priceId: -1}
    chairPrice = [{id: 1, name: '스페셜 가격', price: 10000}, {id: 2, name: '커플가격', price: 100000}];
    priceChange = (event) => {
        const id = event.target.value;
        this.setState({priceId: id});
    }
    render() {
        return (
            <div className={'manageRoomChairPriceDiv'}>
                <div className={'priceTitle'}>
                    가격선택:
                </div>
                <select value={this.state.priceId} onChange={this.priceChange}>
                    <option value={-1}>선택 안됨</option>
                    {this.chairPrice.map((c) => {
                        return (<option value={c.id}>{c.name +'-'+ c.price +' 원'}</option>);
                    })}
                </select>
            </div>
        )
    }
}
export default ManageRoomChairPriceSelect;