import React from 'react';
function InfoPopup(props) {
  return(
     <section className={`popup popup_type_auth`+ (props.isOpen ? " popup_opened" : "")}>
        <div className="popup__container">
          <button className={`close-button`} type="button" onClick={props.onClose}></button>
            <h3 className="popup__title">{props.status ? props.success : props.fail}</h3>
        </div>
      </section>
  )
}
export default InfoPopup;