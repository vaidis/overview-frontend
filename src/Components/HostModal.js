import React, { Component } from 'react';
import Modal from 'react-modal';

class HostModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hostResponse: '',
            modalIsOpen: false,
        }
    }
      
    renderHost = () => {
        return (<div> 
            {this.state.hostResponse.split('\n').map((line, i) => (
                <div key={i}>{line.replace(/ /g, "\u00a0")}</div>
            ))}
        </div>);
    }
    
    render() {
        console.log("modal render");
        console.log("modal render ");
        return (
            <Modal 
            className={"modal"}
            onRequestClose={this.closeModal}
            onAfterOpen={this.afterOpenModal}
            isOpen={this.state.modalIsOpen} 
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.3)'
                },
                content : {
                    top                   : '5%',
                    left                  : '2%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    position              : 'fixed',
                    opacity               : 1,
                    overflowX             : 'hidden',
                    overflowY             : 'hidden',
                    animation             : 'show .5s ease',
                },
            }}
            contentLabel="Modal">

                <div className={"modalHeader"}>
                    <div className={"modalIcon " + this.state.os_name}>
                        <img alt="" src={"./" + this.state.os_name + ".png"}/>
                    </div>
                    <div className={"modalTitle"}>
                        <span className="modalLabel">IP Address: </span>
                        <span className="modalValue">{this.state.address}</span>
                        <span className="modalLabel">Hostname: </span>
                        <span className="modalValue">{this.state.hostname}
                        </span>
                    </div>
                    <button className={"modalClose"} onClick={() => {
                        this.setState({ address: '' });
                        this.setState({ hostResponse: '' });
                        this.closeModal();
                        console.log(this.state.address);}}>
                        &#10006;
                    </button>
                </div>

                <div className={"modalButtons"}>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "ps"); }}>ps aufx</button>                
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "free"); }}>free -h</button> 
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "dmesg");}}>dmesg</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "mount");}}>mount</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "df");}}>df -h</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "route");}}>route -n</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "netstat");}}>netstat -tulpn</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "ifconfig");}}>ifconfig -a</button>
                    <button onClick={() => {this.fetchUrlHost(this.state.address, "time");}}>date</button>
                </div>

                <div className={"modalBody"}>
                <div className={"loader" + (this.state.loading ? '' : 'hidden')}></div>
                {this.renderHost()}
                </div>

            </Modal>
        )
    }
}

export default HostModal;
