import React, { Component } from 'react';

class ShowChair extends  Component {
    state= {chairs: {}, rows: []};
    chairParseRegex = /([A-Z])(\d\d)/g;
    rowChanger = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G':7, 'H': 8, 'I':9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19
        ,'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y':25, 'Z': 26};
    loadChairOfRoom = (roomId) => {
        const rid = Number(roomId);
        const chairObject = {};
        const chairs = [
            {name: 'A01', rId: rid}, {name: 'A02', rid: rid}, {name: 'A03', rId: rid}, {name: 'A04', rid:rid}, {name: 'A05', rId: rid},
            {name: 'A06', rid:rid}, {name: 'A07', rId: rid}, {name: 'A08', rid:rid}, {name: 'A09', rId: rid}, {name: 'A10', rid:rid},
/*            {name: 'A11', rId: rid}, {name: 'A12', rid: rid}, {name: 'A13', rId: rid}, {name: 'A14', rid:rid}, {name: 'A15', rId: rid},
            {name: 'A16', rid:rid}, {name: 'A17', rId: rid}, {name: 'A18', rid:rid}, {name: 'A19', rId: rid}, {name: 'A20', rid:rid},*/
            {name: 'B01', rId: rid}, {name: 'B02', rid:rid}, {name: 'B03', rId: rid}, {name: 'B04', rid:rid}, {name: 'B05', rId: rid},
            {name: 'B06', rid:rid}, {name: 'B07', rId: rid}, {name: 'B08', rid:rid}, {name: 'B09', rId: rid}, {name: 'B10', rid:rid}
        ].map(this.chairParser).map((chair) => {
            if(!chairObject[chair.row]) {
                chairObject[chair.row] = [];
            }
            chairObject[chair.row].push(chair);
        });
        const keys = Object.keys(chairObject);
        keys.forEach((key) => {chairObject[key].sort((c1, c2) => c1.col - c2.col)});
        setTimeout(() => {
            this.setState({rows: keys.sort(), chairs: chairObject});
        }, 500);
    }
    chairParser = (chair) => {
        this.chairParseRegex.lastIndex = 0;
        const c = this.chairParseRegex.exec(chair.name);
        const row = this.rowChanger[c[1]];
        const column = Number(c[2]);
        chair.col = column;
        chair.row = row;
        return chair;
    }

    render() {
        const {roomId} = this.props;
        if(roomId) {
            this.loadChairOfRoom(roomId);
        }
        return (
            <div className={'showChairParentDiv'}>
               <div>
                   <div className={'showChairScreenDiv'}>
                       <p className={'showChairScreen'}>스크린</p>
                   </div>
                   <div className={'showChairChairDiv'}>
                     {this.state.rows.map((r) => {
                         return (
                             <div key={r} className={"showChairRow"}>
                                 <div>{r}열</div>
                               {this.state.chairs[r].map((c) => {
                                   return (<div key={r + '-' + c.col} className={'showChairColumn'}>{c.name}</div>)
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
export default ShowChair;