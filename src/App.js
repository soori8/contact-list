import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ContactList from './components/contactList';
import SearchBar from './components/searchBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      contacts:[],
      searchTerm:"",
      popularFilter:false,
      sort:["name",true]
    }
    this.addContact = this.addContact.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.searchContacts = this.searchContacts.bind(this);
    this.popularChange = this.popularChange.bind(this); // send this function because we need it in display and edit view
    this.popFilter = this.popFilter.bind(this);
    this.name=true;
    this.date=true;
    this.modified=true;
    this.sortContact = this.sortContact.bind(this)
  }
  keyId(){
    this.uniqueId=this.uniqueId || 0;
    return this.uniqueId++;
  }
  addContact(){
    let contacts= this.state.contacts;
    contacts.unshift({
      name:"Default Name"+Math.floor(Math.random()*100),
      phone:"0000000000",
      date:new Date(),
      modified:new Date(),
      editing:true,
      popular:false,
      id:this.keyId()
    });
    this.setState({
      contacts:contacts
    })
  }
  deleteContact(item){
    let contacts= this.state.contacts;
    contacts.splice(item,1);
    this.setState({
      contacts:contacts
    })
  }
  updateDatabase(idx,name,phone,modified,editing){
    let contacts= this.state.contacts;
    contacts[idx].name=name;
    contacts[idx].phone=phone;
    contacts[idx].editing=editing;
    contacts[idx].modified=modified;
    this.setState({contacts:contacts})
  }
  popularChange(idx){
    let contacts= this.state.contacts;
    contacts[idx].popular= !contacts[idx].popular;
    this.setState({contacts:contacts})
  }
  popFilter(){
    this.setState({popularFilter:!this.state.popularFilter})
  }
  sortContact(sortType){
    let status=true;
    if(sortType==="name"){
      this.name=!this.name;
      status=this.name;
    }else if(sortType==="date"){
      this.date=!this.date;
      status=this.date;
    }else if(sortType==="modified"){
      this.modified=!this.modified;
      status=this.modified;
    }
    // console.log(this.sortType)
    this.setState({sort:[sortType,status]})
  }
  searchContacts(term){
    this.setState({searchTerm:term})
  }
  render() {

    // search functions
    let searchString = this.state.searchTerm.trim().toLowerCase();
    let contacts= this.state.contacts;
    if(searchString.length>0){
      contacts=contacts.filter((val)=>{
        if(val.name.toLowerCase().indexOf(searchString)>=0 || val.phone.indexOf(searchString)>=0){
          return val;
        }else{
          return false
        }
      })
    };
    // for filter popular items
    if(this.state.popularFilter){
      contacts=contacts.filter((val)=>{
        return (val.popular)
      })
    }
    let sortType = this.state.sort[0];
    if(this.state.sort[1]){
      contacts=contacts.sort((val,val2)=>{
        return val[sortType]>val2[sortType]
      })
    }else{
      contacts=contacts.sort((val,val2)=>{
        return val[sortType]<val2[sortType]
      })
    }
    return (
      <div className="App">
        <SearchBar addContactHandler={this.addContact} searchHandler={this.searchContacts}/>
        <ContactList
          contacts={contacts}
          updateDatabase={this.updateDatabase}
          deleteContact={this.deleteContact}
          popularHandler={this.popularChange}
          popFilter={this.popFilter}
          popStatus={this.state.popularFilter}
          sortHandler={this.sortContact}
          sortStatus={{name:this.name,date:this.date,modified:this.modified}}
          />
      </div>
    );
  }
}
export default App;
