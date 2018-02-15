import React from "react";
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
// import ConfirmModal from "../../modals/confirmModal";


import "../../../styles/modals.css";
import "../../../styles/heuremodal.css";
import {MdInfo} from 'react-icons/lib/md';

import lang from "../../tools/Language";

class HeureModal extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      entity: JSON.parse(JSON.stringify(props.entity)),
      modalConfirm: false,
      modalAlert: false,
      error: ""
    };

    this.onClose = this.onClose.bind(this);
    this.toggleModalAlert = this.toggleModalAlert.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
  }

  toggleModalAlert() {
    if (this.state.modalAlert) this.setState({modalAlert: false}); else this.setState({modalAlert: true});
  }

  handleFocus(event) {
    event.target.select();
  }


  onClose(){
    this.setState({entity: this.props.entity, error:""});
    this.props.close();
  }

  onChangeState(event){
    if (!isNaN(event.target.value)){
      const field = event.target.name;
      let entity = this.state.entity.slice();
      entity[field].iHeure_Equipement = event.target.value.trim();
      this.setState({entity: entity});
    }
  }

  // onCancel(){
  //   this.setState({error:""});
  //   this.setState({hours: this.state.initHours});
  //   this.toggleModalConfirm();
  // }

  render(){
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    console.log("heures", this.state.entity);
    console.log("heures props", this.props.entity);


    return (
          <div>
            <Modal
              isOpen={this.props.open}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.props.close}
              contentLabel="Example Modal"
              style={customStyles}
              ariaHideApp={false}
            >
              <div className="hm_main">
                <div className="modal-header hm_modalheader">
                  <h5 className="modal-title">{lang.addhours}&nbsp;<MdInfo data-tip={lang.tt_equiphour} data-place="bottom" /></h5>
                </div>
                <div className="modal-body hm_body">
                  {this.state.entity.map((equ, index) => (
                    <div className="container-fluid" key={equ.uId}>
                      <div className="row hm_cont">
                        <div className="col-sm-6 hm_col">
                          {equ.sNom_Equipement}
                        </div>
                        <div className="col-sm-6">
                          <div className="inputzone">
                            <input
                              autoFocus
                              type="text"
                              className="hm_input"
                              onFocus={this.handleFocus}
                              name={index}
                              value={equ.iHeure_Equipement}
                              onChange={this.onChangeState}
                              ref={(input) => { this.inputDisable = input; }}
                            />&nbsp;h
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                  {!this.props.saving ? (
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary cancel" onClick={this.onClose}>{lang.actions_disable_cancel}</button>
                      <button type="button" className="btn btn-primary confirm" onClick={this.onClose}>{lang.actions_disable_confirm}</button>
                    </div>
                  ):(
                    <div className="modal-footer md_saving">Saving...</div>
                  )}
              </div>
              <ReactTooltip multiline />
            </Modal>
            {/* <ConfirmModal
              open={this.state.modalConfirm}
              close={this.toggleModalConfirm}
              onConfirm={this.onSaveHours}
              onCancel={this.onCancel}
              title={lang.modals_confirm_toolow}
              cancel={lang.actions_disable_cancel}
              confirm={lang.actions_disable_confirm}
            /> */}
          </div>
        );
  }
}

HeureModal.propTypes = {
  open: PropTypes.boolean.isRequired,
  close: PropTypes.function.isRequired,
  cc: PropTypes.integer.isRequired,
  entity: PropTypes.array.isRequired,
  saving: PropTypes.boolean.isRequired
};



export default HeureModal;
