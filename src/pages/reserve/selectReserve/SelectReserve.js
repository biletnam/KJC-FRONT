import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './SelectReserve.css';
import ReserveMovieDetail from "../rserveMovieDetail/ReserveMovieDetail";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth: '100%',
        padding: 0,
        zIndex: '99999999'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class SelectReserve extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <ReserveMovieDetail onCloseModal = {this.closeModal}/>
        </Modal>
      </div>
        );
    }
}

export default SelectReserve;