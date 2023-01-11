import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

class SendEmail extends Component {
    static displayName = SendEmail.name;

    constructor(props) {
      super(props);
      this.state = {
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        importance: 1,
        formErrors: {from: '', to: '', cc: '', bcc: '', subject: ''},
        fromValid: false,
        toValid: false,
        ccValid: false,
        bccValid: false,
        subjectValid: false,
        formValid: false,
        formStatus: ''
      }

      this.accept = this.accept.bind(this);
      this.reject = this.reject.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    accept() {
        window.location.reload(false);
    }

    reject() {
        this.toast.show({ severity: 'warn', summary: 'Continue with your email', detail: '', life: 500 });
    }

    confirm(event) {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to cancel?',
            icon: 'pi pi-exclamation-triangle',
            accept: this.accept,
            reject: this.reject
        });
    }

    routeChange=()=> {
        let navigate = useNavigate(); 
        const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
        }
        routeChange();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let obj = {}
        obj.To = this.state.to;
        obj.From = this.state.from;
        obj.Cc = this.state.cc;
        obj.Bcc = this.state.bcc;
        obj.Subject = this.state.subject;
        obj.Importance = this.state.importance;
        obj.Body = this.state.body;
      
        const finalFormEndpoint = "http://localhost:5119/email/sendEmail";
  
        fetch(finalFormEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
  
            return response.json();
          })
          .then(() => {
          })
          .catch((err) => {
            console.log(err);
          });
    };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
    
    validateField(fieldName, value) {
        const listEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(,[^\s]*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))*$/;
        let fieldValidationErrors = this.state.formErrors;
        let fromValid = this.state.fromValid;
        let toValid = this.state.toValid;
        let ccValid = this.state.ccValid;
        let bccValid = this.state.bccValid;
        let subjectValid = this.state.subjectValid;
        this.state.formStatus = '';
    
        switch(fieldName) {
          case 'from':
            if (!value) {
                fieldValidationErrors.from = 'Field is required';
                break;
            }
            fromValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.from = fromValid ? '' : ' is invalid';
            break;
          case 'to':
            if (!value) {
                fieldValidationErrors.to = 'Field is required';
                break;
            }
            toValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.to = toValid ? '' : ' is invalid';
            break;
          case 'cc':
            if (!value) {
                fieldValidationErrors.cc = 'Field is required';
                break;
            }
            ccValid = value.match(listEmailRegex);
            fieldValidationErrors.cc = ccValid ? '' : ' is invalid input like: (email@email.com,email2@email.com,.....)';
            break;
          case 'bcc':
            if (!value) {
                fieldValidationErrors.bcc = 'Field is required';
                break;
            }
            bccValid = value.match(listEmailRegex);
            fieldValidationErrors.bcc = bccValid ? '' : ' is invalid input like: (email@email.com,email2@email.com,.....)';
            break;
          case 'subject':
            if (!value) {
                fieldValidationErrors.bcc = 'Field is required';
                break;
            }
            subjectValid = true;
            fieldValidationErrors.subject = subjectValid ? '' : ' is required';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        fromValid: fromValid,
                        toValid: toValid,
                        ccValid: ccValid,
                        bccValid: bccValid,
                        subjectValid: subjectValid
                      }, this.validateForm);
    }
    
    validateForm() {
        this.setState({formValid: this.state.toValid && this.state.fromValid && this.state.ccValid && this.state.bccValid && this.state.subjectValid});
    }
    
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    handleReset = (resetForm) => {
        if (window.confirm('Reset?')) {
          resetForm();
        }
      };

      

    render() {
      return (
        <div>
            <form className="mailForm" onSubmit={this.handleSubmit}>
                <h2>Send Email</h2>
                <div className='formStatus'>
                    <p>{this.state.formStatus}</p>
                </div>
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.from)}`}>
                <label htmlFor="from">From:</label>
                <input type="email" required className="form-control" name="from"
                    placeholder="From email"
                    value={this.state.from}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.to)}`}>
                <label htmlFor="to">To:</label>
                <input type="email" className="form-control" name="to"
                    placeholder="To email"
                    value={this.state.to}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.cc)}`}>
                <label htmlFor="cc">CC:</label>
                <input type="text" className="form-control" name="cc"
                    placeholder="CC"
                    value={this.state.cc}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.bcc)}`}>
                <label htmlFor="bcc">BCC:</label>
                <input type="text" className="form-control" name="bcc"
                    placeholder="BCC"
                    value={this.state.bcc}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.subject)}`}>
                <label htmlFor="subject">Subject:</label>
                <input type="text" className="form-control" name="subject"
                    placeholder="Subject"
                    value={this.state.subject}
                    onChange={this.handleUserInput}  />
                </div>
                <div>
                <label htmlFor="body">Body:</label>
                <textarea rows="10" columns ="50" name='body' placeholder='Body' value={this.state.body} onChange = {this.handleUserInput}>

                </textarea>
                <input type="text" className="form-control" name="body"
                    placeholder="Body"
                    value={this.state.body}
                    onChange={this.handleUserInput}  />
                </div>
                <div>
                <label htmlFor="importance">Importance:</label>
                <select className="form-control" name="importance"
                    value={this.state.importance}
                    onChange={this.handleUserInput}>
                        <option value = "1">Low</option>
                        <option value = "2">Normal</option>
                        <option value = "3">High</option>
                </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Send Email</button>
            </form>
            <div className='card'>
                <ConfirmPopup className='popup' />
                <Button onClick={this.confirm} icon="pi pi-check" label="Cancel" className="mr-2"></Button>
            </div>
            <Toast ref={(el) => this.toast = el} />
        </div>
      );
    }
  }

  export default SendEmail;