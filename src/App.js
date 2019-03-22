import React, { Component } from 'react';
import './App.css';
import 'abortcontroller-polyfill';
import Modal from 'react-modal';

Modal.setAppElement('body');

const url = 'http://10.0.31.222:7777'
const controller = new AbortController();
const signal = controller.signal;


class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current_ping: '',
      filteredData: [],
      hostResponse: '',
      modalIsOpen: false,
      loading: false,
      address: '',
      hostname: '',
      os_name: '',
      command:'',
      inputText: '',
    }
  }

  componentDidMount() {
    this.fetchUrl(url);
    this.timer = setInterval(() => this.fetchUrl(url), 2000);
  }
  componentWillUnmount() {
    controller.abort();
  }
  openModal = () => {
    this.setState({ modalIsOpen: true});
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }


  fetchUrl(url) {
    fetch(url, { signal })
    .then((response) => {
      return response.json()
    })
    .then(responseJson => {
      this.setState({ data: responseJson[0]['hosts'] });
      this.setState({ current_ping: responseJson[0]['current_ping'] });
      this.setState({ current_check: responseJson[0]['current_check'] });
      console.log("PING: ", this.state.current_ping)
    })
    .catch((error) => {
      console.log(" fetchUrl() error ", error)
    }); 
  }


  fetchUrlHost(address, command) {
    this.setState({ loading: true }); 
    const urlHost = url + "/host?address=" + address + ";command=" + command;

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


  setFilter(evt) {
    if(typeof evt.target.value !== "undefined"){
      if(evt.target.value.match(/^[a-zA-Z0-9\.-]*$/)){
        console.log("VAL OK");
        this.setState({
          inputText  : evt.target.value
        });        
      } 
    }
  }
  
  render() {

    const filteredData = this.state.data.filter(
      (item) => {
        return (
          item.hostname.toLowerCase().search(this.state.inputText.toLowerCase()) !== -1  ||
          item.address.toLowerCase().search(this.state.inputText.toLowerCase()) !== -1
        )
      });

    const filteredRows = filteredData
    .map((item, key) => {
      return (
        <div className={"host ping" 
          + item.ping
          + (item.address === this.state.current_ping ? ' current_ping ' : '')
          + (item.root_usage > 80 ? ' warning ' : '')
          + (item.checktemp >  75 ? ' warning ' : '')
          + (item.latency >   750 ? ' warning ' : '')
          + (item.root_usage > 90 ? ' danger ' : '')
          + (item.checktemp >  90 ? ' danger ' : '')
          + (item.checkraid === "False" ? ' danger ' : '')
          + (item.checkgeo === "False" ? ' danger ' : '')}
             key={key}
             onClick={() => {
              this.setState({ address: item.address });
              this.setState({ hostname: item.hostname });
              this.setState({ os_name: item.os_name });
              this.setState({ hostResponse: ''});
              this.openModal();
              }}>

                <div className="hostIcon">
                  <div className={"field os_name " + item.os_name}>
                    <img alt="" src={"./" + item.os_name + ".png"}/>
                  </div>
                </div>

                <div className="hostBody">

                  <div className="address">
                    {item.address}
                    <span className="type">{(item.type === "virtual") ? '[VM]' : ''}</span>
                  </div>

                  <div className="hostname">{item.hostname}</div>
                  <div className="bottom ">

                    <div className={"field latency " + (item.latency > 9999 ? "hidden" : "")} >
                      <span className='label'>ping:</span>
                      <span className={(item.latency > 750 ? 'warning' : '' )}>{item.latency < 9999 ? item.latency : "" }</span>
                      <span className='label'>ms</span>
                    </div>

                  <div className={(item.address === this.state.current_check ? ' current_check ' : '')} >
                      <div className={"field rootusage"}>
                        <span className='label'>{item.root_usage ? "disk:" : ""}</span>
                        <span className={(item.root_usage > 80 ? 'warning' : '' )+(item.root_usage > 90 ? ' danger' : '')}>{item.root_usage}</span>
                        <span className='label'>{item.root_usage ? "%" : ""}</span>
                      </div>

                      {item.checkraid && (
                      <div className={"field checkraid"}>
                        <span className='label'>raid:</span>
                        <span className={(item.checkraid === "False") ? 'danger' : '' }>{item.checkraid === "True" ? 'Ok' : 'Fail' }</span>
                      </div>
                      )}

                      {item.checkgeo && (
                      <div className={"field checkgeo"} >
                        <span className='label'>geo:</span>
                        <span className={(item.checkgeo === "False") ? 'danger' : '' }>{item.checkgeo === "True" ? 'Ok' : 'Fail' }</span>
                      </div>
                      )}

                      <div className={"field checktemp"}>
                        <span className='label'>{item.checktemp ? "temp:" : ""}</span>
                          <span className={(item.checktemp > 75 ? 'warning' : '' ) + (item.checktemp > 90 ? ' danger' : '')}>{item.checktemp}</span>
                          <span className='label'>{item.checktemp ? "'C" : ""}
                        </span>
                      </div>
                  </div>

                </div>
          </div>
        </div>
          )
        })


    return(
      <div className="container">

        <div className="filter">
          <div  className="icon">
            <img alt="" src={"./search.png"}/>
          </div>
          <input 
            type='text'
            name='filter'
            value={this.state.inputText}
            placeholder="Search hostname"
            onChange={evt => this.setFilter(evt)}
          />
        </div>

      {filteredRows}

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

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "ps");
                  }}>
                    ps aufx
                  </button>                

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "free");
                  }}>
                    free -h
                  </button> 

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "dmesg");
                  }}>
                    dmesg
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "mount");
                  }}>
                    mount
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "df");
                  }}>
                    df -h
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "route");
                  }}>
                    route -n
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "netstat");
                  }}>
                    netstat -tulpn
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "ifconfig");
                  }}>
                    ifconfig -a
                  </button>

                  <button onClick={() => {
                    this.fetchUrlHost(this.state.address, "time");
                  }}>
                    date
                  </button>

                </div>

                <div className={"modalBody"}>
                  <div className={"loader" + (this.state.loading ? '' : 'hidden')}></div>
                  {this.renderHost()}
                </div>

            </Modal>
        </div>
    )
  }
};

export default App;
