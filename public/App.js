import React, { Component } from 'react';
import './App.css';
const url = 'http://localhost:7777'
// const url = 'https://jsonplaceholder.typicode.com/users'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  fetchUrl(url) {

    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then(responseJson => {
        this.setState({ data: responseJson[0] });
        // this.setState({ data: responseJson });
        console.log(" ---- fetchUrl() this.state ", this.state)
        console.log(" ---- fetchUrl() this.state.data ", this.state.data)
      })
      .catch((error) => {
        console.log(" ---- fetchUrl() error ", error)
      });

  }

  componentDidMount() {
    console.log("F: componentDidMount()")
    this.fetchUrl(url)
    this.timer = setInterval(() => this.fetchUrl(url), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }
  
  // createTable = () => {
  //   let table = []
  //   for (let i = 0; i < 3; i++) {
  //     let children = []
  //     for (let j = 0; j < 5; j++) {
  //       children.push(<div key={j}>{`Column ${j + 1}`}</div>)
  //     }
  //     table.push(<div key={i}>{children}</div>)
  //   }
  //   return table
  // }

  // xxx = () => {/
  //   // let table = [1,2,3,4]
  //   Object.keys(this.state.data[0]).map(function (key) {
  //     console.log(" ---- key: ", key)        
  //   });          
  //   // console.log(" ---- table: ", table)

  //   let table = []
  //   let keys = []

  //   // for (host in this.state.data) {
  //   //   console.log(" ---- item.push key" , hosts[key]);
  //   //   keys.push(hosts[key]);
  //   // }

  //   // table.push(<li key="x">{keys}</li>)
  //   return true;

  // }

render() {
  console.log("JSON-0" ,  this.state.data);
  // Object.keys(this.state.data).map(function(key, Index) {
  //   // use keyName to get current key's name
  //   // and a[keyName] to get its value
  //   console.log("JSON-1" ,  JSON.stringify(key));
  //   console.log("JSON-2" ,  JSON.stringify(Index));
  //   // console.log("JSON-2" ,  JSON.stringify(this.state.data[Index]));
  // })



    return(
        <div className="container">
            {
              this.state.data.map((item, key) => {
                  return (
                    <div>
                      <div className={"host ping" + item.ping} key={key}>
                        <div className="hostIcon">
                        <div className={"field os_name " + item.os_name}><img src={"./" + item.os_name + ".png"}/></div>

                        </div>
                        <div className="hostBody">
                        <div className="field address"></div>                                                  
                          <div className="field type">{(item.type == "virtual") ? '[VM]' : ''} </div>                                                
                          <div className="field address">{item.address}</div>
                          <div className="field hostname">{item.hostname}</div>
                          <div className="field checktemp"><span className="label">{item.root_usage ? "Temp:" : ""}</span>{item.checktemp}</div>
                          <div className="field root_usage"><span className='label'>{item.root_usage ? "Disk:" : ""}</span>{item.root_usage}</div>                        
                        </div>
                      </div>
                  </div>
                  )
              })
            }
            <div className="menu"></div>
            <div className="log"></div>
        </div>
    )


  // return(<div>
  //       {this.createTable()}
  //   </div>
  // )

  // console.log("JSON-1" ,  JSON.stringify(this.state.data));
  // console.log("JSON-2" ,  JSON.stringify(this.state.data[0]));

  // const items = JSON.stringify(this.state.data[0])

  // const renObjData = this.props.data.map(function(data, idx) {
  //   return <p key={idx}>{data.name}</p>;
  // });

  // {Object.keys(this.state.data).map((keyName, i) => (
    //   <li className="x" key={i}>
    //       <span className="z">key: {i} Name: {this.state.data[keyName]}</span>
    //   </li>
    // ))}



  // -----------------------------------------------
  // var items = JSON.stringify(this.state.data[0]);
  // var items = JSON.parse(this.state.data[0]);
  // var items = this.state.data; 
  
  // for (v k in [1,2,3,4,5,6]) {
  //   arr.push(arr[k]);
  // }
  // myObject = [1,2,3,4];





  // console.log("JSON-1" ,  arr);

  // var row = [1,2,3,4];
  // var items = row.map(function(item, i){
  //   <li key={i}>{item}</li>;
  // })

  // return (<ul><li>{ arr2 }</li></ul>);
  // -----------------------------------------------

  // console.log(" ---- item.push data" , this.state.data);

  // -----------------------------------------------
  // ok
  //  
  // function getStringType (node) {
  //   if (typeof node.type === 'string') return node.type
  //   if (node.type && node.type.displayName) return node.type.displayName
  //   return false
  // }

  // var hosts = [];
  // var keys = [];

  // // for (var host in JSON.stringify(this.state.data)) {
  // for (host in this.state.data) {
  //   // console.log(" ---- state.data key" , JSON.stringify(this.state.data[host]));
  //   console.log(" ---- host" , host);
  //   // hosts.push(JSON.stringify(this.state.data[host]));
  
  //   // for (var key in host) {
  //   //   console.log(" ---- item.push key" , hosts[key]);
  //   //   keys.push(hosts[key]);
  //   // }
  
  // }

  // console.log(getStringType(host))

  // for (var key in host) {
  //   console.log(" ---- item.push key" , hosts[key]);
  //   keys.push(hosts[key]);
  // }
  
  // -----------------------------------------------
  // ok
  //
  // var arr = [1,2,3,4,5,6,7];
  // return (
  //   <div>
  //     <ul>
  //       {arr.map((key, i) => (
  //         <li key={i}>{key}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  // -----------------------------------------------

  // -----------------------------------------------
  // ok
  // const items = JSON.stringify(this.state.data[0])
  // return (<div> <li>{items}</li> </div>)
  // -----------------------------------------------

  }




};

export default App;