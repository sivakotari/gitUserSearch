import React, { Component } from 'react';

class GitProfile extends Component {

  render() {
    let{avatar, name, description, forks, openIssues, link} = this.props;
    return (
      <div className="git-profile">
        <img className="avatar" src={avatar} />
        <p className="name">{name}</p>
        <div className="forks-issues">
          <p className="rounded-border">Forks: {forks}</p>
          <p className="rounded-border">Open Issues: {openIssues}</p>
        </div>
        <div className="description">{description}</div>
        <a className="goto" href={link} target="_blank">Goto Profile</a>
      </div>
    );
  }
}

export default GitProfile;
