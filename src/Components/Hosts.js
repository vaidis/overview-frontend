import React, { Component } from 'react';
import 'abortcontroller-polyfill';

const controller = new AbortController();
const signal = controller.signal;

class HostModal extends Component {
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
          + (item.checktemp >  80 ? ' warning ' : '')
          + (item.latency >   750 ? ' warning ' : '')
          + (item.root_usage > 90 ? ' danger ' : '')
          + (item.checktemp >  90 ? ' danger ' : '')
          + (item.checkraid === "False" ? ' danger ' : '')
          + (item.checkgeo === "False" ? ' danger ' : '')
          + (item.checkclock !== 0 ? ' danger ' : '')}
          key={key}
          onClick={() => {
            this.setState({ address: item.address });
            this.setState({ hostname: item.hostname });
            this.setState({ os_name: item.os_name });
            this.setState({ hostResponse: ''});
            openModal();
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
                  <span className={(item.checktemp > 80 ? 'warning' : '' ) + (item.checktemp > 90 ? ' danger' : '')}>{item.checktemp}</span>
                  <span className='label'>{item.checktemp ? "'C" : ""}
                  </span>
                </div>

                <div className={"field checkupsstatus"}>
                  <span className='label'>{item.checkupsstatus ? "status:" : ""}</span>
                  <span className={(item.checkupsstatus)}>{item.checkupsstatus}</span>
                </div>

                <div className={"field checkupscapacity"}>
                  <span className='label'>{item.checkupscapacity ? "Capacity:" : ""}</span>
                  <span className={(item.checkupscapacity)}>{item.checkupscapacity}</span>
                  <span className='label'>{item.checkupscapacity ? "%" : ""}</span>
                </div>

              </div>
            </div>
        </div>
      </div>
    )
  })
}