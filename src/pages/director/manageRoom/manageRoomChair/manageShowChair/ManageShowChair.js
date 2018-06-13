import React, { Component } from 'react';

class ManageShowChair extends  Component {
    state= {seats: {}, rows: []};
    seatParserRegx = /([A-Z])(\d\d)/g;
    rowChanger = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G':7, 'H': 8, 'I':9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19
        ,'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y':25, 'Z': 26};
    loadChairOfRoom = (seats) => {
        const seatObject = {};
        seats.map(this.seatParser).map((chair) => {
            if(!seatObject[chair.row]) {
                seatObject[chair.row] = [];
            }
            seatObject[chair.row].push(chair);
        });
        const keys = Object.keys(seatObject);
        keys.forEach((key) => {seatObject[key].sort((c1, c2) => c1.col - c2.col)});
        return {rows: keys.sort(), seats: seatObject};
    }
    seatParser = (seat) => {
        this.seatParserRegx.lastIndex = 0;
        const c = this.seatParserRegx.exec(seat.SEAT_NAME);
        const row = this.rowChanger[c[1]];
        const column = Number(c[2]);
        seat.col = column;
        seat.row = row;
        return seat;
    }
    chairClick = (chair) => {
        const { onChairClick } = this.props;
        onChairClick(chair);
    }
    rowNameClick = (seats, row) => {
        const { selectedChair, onRowClick } = this.props;
        const rowSeats = seats[row];
        let allSelect = true;
        for(let i = 0; i< rowSeats.length; i++ ){
            allSelect = allSelect && selectedChair.indexOf(rowSeats[i].SEAT_NAME) !== -1;
        }
        onRowClick(!allSelect, rowSeats);
    }

    render() {
        const {seats, selectedChair} = this.props;
        const seatRows = this.loadChairOfRoom(seats);
        console.log(seatRows);
        return (
            <div className={'showChairParentDiv'}>
               <div>
                   <div className={'showChairScreenDiv'}>
                       <p className={'showChairScreen'}>스크린</p>
                   </div>
                   <div className={'showChairChairDiv'}>
                     {seatRows.rows.map((r) => {
                         return (
                             <div key={r} className={"showChairRow"}>
                                 <div className={"showChairRowMark"} onClick={() => this.rowNameClick(seatRows.seats, r)}>{r}열</div>
                               {seatRows.seats[r].map((c) => {
                                   return (<div key={r + '-' + c.col} className={`showChairColumn ${selectedChair.indexOf(c.SEAT_NAME) !== -1 && 'selectChairColumn'}`} onClick={() => this.chairClick(c)}>{c.SEAT_NAME}</div>)
                               })}
                               </div>
                         )
                     })}
                   </div>
                </div>
            </div>
        );
    }
}
export default ManageShowChair;