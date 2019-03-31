import React, { Component } from 'react';
import Modal from 'react-modal';
import 'abortcontroller-polyfill';

const controller = new AbortController();
const signal = controller.signal;

Modal.setAppElement('body');

class HostModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hostResponse: '',
        }
    }

    fetchUrlHost(address, command) {
        this.setState({ loading: true });
        const urlHost = this.props.url + "/host?address=" + address + ";command=" + command;

        fetch(urlHost, { signal })
        .then((response) => {
          return response.text()
        })
        .then(responseText => {
          this.setState({ hostResponse: responseText });
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(" ---- fetchUrlHost() error: ", error)
        });
      }

    renderHost = () => {
    return (<div>
      {this.state.hostResponse.split('\n').map((line, i) => (
          <div key={i}>{line.replace(/ /g, "\u00a0")}</div>
      ))}
      </div>);
    }

    render() {
        return (
            <Modal
                className={"modal"}
                contentLabel="Modal"
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
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
                    }
                }}
            >
                <div className={"modalHeader"}>
                    <div className={"modalIcon " + this.props.os_name}>
                        <img alt="" src={"./" + this.props.os_name + ".png"}/>
                    </div>
                    <div className={"modalTitle"}>
                        <span className="modalLabel">IP Address: </span>
                        <span className="modalValue">{this.props.address}</span>
                        <span className="modalLabel">Hostname: </span>
                        <span className="modalValue">{this.props.hostname}
                        </span>
                    </div>

                    <button className={"modalClose"} onClick={this.props.closeModal}>
                        &#10006;
                    </button>
                </div>

                    <div className={"modalButtons"}>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "dmesg");}}>dmesg</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "ps"); }}>ps aufx</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "free"); }}>free -h</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "mount");}}>mount</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "df");}}>df -h</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "partitions");}}>/proc/partitions</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "cpuinfo");}}>/proc/cpuinfo</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "route");}}>route -n</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "netstata");}}>netstat -an</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "netstatt");}}>netstat -tulpn</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "ifconfig");}}>ifconfig -a</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "time");}}>date</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "hwclock");}}>hwclock</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "lsusb");}}>lsusb</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "lspci");}}>lspci</button>
                    <button onClick={() => {this.fetchUrlHost(this.props.address, "lsmod");}}>lsmod</button>
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
