import React, { Component } from 'react';
import './App.css';
import GitProfile from './GitProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  searchChange = (e)=>{
    this.setState({
      text: e.target.value
    })
  }

  searchClick = () => {
    let {text} = this.state;
    let url = 'https://api.github.com/search/repositories?q='+text;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.items.length){
        this.setState({data: data.items, noData: false, error: false})
      }else{
        this.setState({noData: true, noDataMessage: "No results found", error: false})
      }
    }
    )
    .catch(error => 
      this.setState({error: true, errorMessage: "something went wrong", nodata: false})
    );
  }

  // componentDid

  render() {
    let {data, error, noData, errorMessage, noDataMessage} = this.state;
    return (
      <div className="App">
        <div className="search-holder">
          <input type="text" onChange={this.searchChange} placeholder="type..." />
          <button className="search-button" onClick={this.searchClick}>Search</button>
        </div>
        <div className="results-holder">
          {
            error
            ? <div>{errorMessage}</div>
            : noData
            ? <div>{noDataMessage}</div>
            : data && data.length
            ? data.map(each =>
              <GitProfile
                avatar = {each.owner.avatar_url}
                name = {each.owner.login}
                description = {each.description}
                forks = {each.forks_count}
                openIssues= {each.open_issues_count}
                link = {each.git_url}
              />
            )
            : 
            null
          }
        </div>
      </div>
    );
  }
}

export default App;
