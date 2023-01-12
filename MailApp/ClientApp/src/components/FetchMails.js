import React, { Component } from 'react';

export class FetchMails extends Component {
  static displayName = FetchMails.name;

  constructor(props) {
    super(props);
    this.state = { mails: [], loading: true };
  }

  componentDidMount() {
    this.populateMailsData();
  }

  static renderEmailsTable(mails) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th>Importance</th>
            <th>Sent On</th>
          </tr>
        </thead>
        <tbody>
          {mails.map(email =>
            <tr key={email.sentOn}>
              <td>{email.from}</td>
              <td>{email.to}</td>
              <td>{email.subject}</td>
              <td>{email.importance}</td>
              <td>{email.sentOn}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>No data to fetch...</em></p>
      : FetchMails.renderEmailsTable(this.state.mails);

    return (
      <div>
        <h1 id="tableLabel">Emails</h1>
        <p>All sent E-mails.</p>
        <div className='table'>{contents}</div>
      </div>
    );
  }

  async populateMailsData() {
      const response = await fetch('https://emailappq.azurewebsites.net/email/getEmails');
    const data = await response.json();
    this.setState({ mails: data, loading: false });
  }
}
