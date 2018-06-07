import React, {Component} from 'react'
import DaumPostcode from 'react-daum-postcode';
import './GetPostCode.css';
class GetPostCode extends Component {
    handleAddress = (data) => {
        const { onClose, onGetPostCode } = this.props;
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        const needData= {
            postCode: data['zonecode'],
            jibunAddress: data['jibunAddress']
        }
        onGetPostCode(needData);
        onClose();
    }

    render () {
        const {onClose} = this.props;
        return (
            <div className={'daum-post-code'}>
                <div className={'closeButton'}>
                    <button onClick={onClose}>X</button>
                </div>
                 <DaumPostcode
                     onComplete={this.handleAddress}/>
            </div>
           )
    }
}
export default GetPostCode;