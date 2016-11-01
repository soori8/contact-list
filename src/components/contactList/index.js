import React from 'react';
import ContactListItem from '../contactListItem'
import './style.css'
const ContactList = ({
  contacts,
  deleteContact,
  updateDatabase,
  popularHandler,
  popFilter,
  popStatus,
  sortHandler,
  sortStatus
})=>{
    return(
          <div className="contact-list-sec">
            <div className="contact-list-controller">
              <span className="ctlist-col ctlist-col-1" onClick={()=>sortHandler("name")} >
                <span className={sortStatus.name? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom"}> Name</span>
              </span>
              <span className="ctlist-col ctlist-col-2" >Phone Number</span>
              <span className="ctlist-col ctlist-col-3" onClick={()=>sortHandler("date")}>
                <span className={sortStatus.date? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom"}> Created</span>
              </span>
              <span className="ctlist-col ctlist-col-4" onClick={()=>sortHandler("modified")}>
                <span className={sortStatus.modified? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom"}> Modified</span>
              </span>
              <span className="ctlist-col ctlist-col-5"
                onClick={()=>popFilter()}
                style={popStatus? {color:"rgb(255, 238, 5)"}:{}}>
                  <i className="glyphicon glyphicon-star"></i>
              </span>
            </div>
            {contacts.map((contact,idx)=>{
              return <ContactListItem
              name={contact.name}
              phone={contact.phone}
              editing={contact.editing}
              date={contact.date}
              key={contact.id}
              popular={contact.popular}
              index={idx}
              updateDatabase={updateDatabase}
              deleteContact={deleteContact}
              popularHandler={popularHandler}/>
            })}
          </div>
    )
}

export default ContactList;
