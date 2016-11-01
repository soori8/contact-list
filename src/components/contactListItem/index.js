import React, { Component } from 'react';
import './style.css'
class ContactListItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:this.props.name,
      phone:this.props.phone,
      modified:new Date(),
      editing:this.props.editing
    }
    this.editingDisplay = this.editingDisplay.bind(this);
    this.resultDisplay = this.resultDisplay.bind(this);
  }
    editingDisplay(){
      const props =this.props;
      const state =this.state;
      return(
        <div className="contact-list-item">
          <div className="contact-item">
            <div className="contact-item-tools">
              <button className="glyphicon glyphicon-ok bg-green"
                onClick={()=>{
                  this.setState({editing:false,modified:new Date()},()=>{
                    props.updateDatabase(
                      props.index,
                      state.name,
                      state.phone,
                      new Date(),
                      false
                    )
                  })
                }}>
              </button>
              <button className="glyphicon glyphicon-trash bg-red"
                onClick={()=>props.deleteContact(props.index)}>
              </button>
            </div>
            <div className="contact-item-info bg-blue">
              <span className="ctlist-col ctlist-col-1" >
                <input
                type="text"
                value={state.name}
                placeholder="Default name"
                onChange={(e)=>this.setState({name:e.target.value})}/>
              </span>
              <span className="ctlist-col ctlist-col-2" >
                <input
                type="text"
                value={state.phone}
                placeholder="(000) 000-0000"
                onChange={(e)=>{
                  let term = e.target.value
                  if(term.length>0 && term.match(/\d/g)){
                    term=term.match(/\d/g).join("").substr(0,10)
                  }else{
                    term=""
                  }
                  this.setState({phone:term})
              }}/>
              </span>
              <span className="ctlist-col ctlist-col-3" ></span>
              <span className="ctlist-col ctlist-col-4" ></span>
              <span className="ctlist-col ctlist-col-5"
                style={props.popular? {color:"rgb(255, 238, 5)"} : {}}
                onClick={()=>{props.popularHandler(props.index)}}>
                  <i className="glyphicon glyphicon-star"></i>
              </span>
            </div>
          </div>
        </div>
      )
    }
  resultDisplay(){
    const state =this.state;
    const props = this.props;
    return(
      <div className="contact-list-item">
        <div className="contact-item">
          <div className="contact-item-tools">
            <button className="glyphicon glyphicon-pencil bg-green"
              onClick={()=>this.setState({editing:true})}>
            </button>
            <button className="glyphicon glyphicon-trash bg-red"
              onClick={()=>props.deleteContact(props.index)}>
            </button>
          </div>
          <div className="contact-item-info" onClick={()=>{props.popularHandler(props.index)}}>
            <span className="ctlist-col ctlist-col-1" >{state.name}</span>
            <span className="ctlist-col ctlist-col-2" >{state.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3")}</span>
            <span className="ctlist-col ctlist-col-3" ><DateFormat date={props.date}/></span>
            <span className="ctlist-col ctlist-col-4" ><DateFormat date={state.modified}/></span>
            <span className="ctlist-col ctlist-col-5"
              style={props.popular? {color:"rgb(255, 238, 5)"} : {}}>
                <i className="glyphicon glyphicon-star"></i>
            </span>
          </div>
        </div>
      </div>
    )
  }
  render(){
    return(
    <div>{this.state.editing ? this.editingDisplay() : this.resultDisplay()}</div>
    )
  }
}

const DateFormat=({date})=>{
    return(
      <span>{date.getMonth()}/{date.getDate()}/{date.getFullYear()}
        <sub>{date.getHours()}:{date.getMinutes()}</sub>
      </span>
    )
}
export default ContactListItem;
