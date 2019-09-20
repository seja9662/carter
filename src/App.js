import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      payloadBox: null,
      rating: 1
    };
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  publish() {
    this.componentDidMount(this.state.payloadBox);
  }
  addToWatchLater() {
    alert('Test');
  }
  OnStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  renderTableData() {
    return this.state.movies.map((movieRecord) => {
      const { id, title, release_date, popularity, vote_count, overview, rating } = movieRecord //destructuring

      return (
        <tr key={id}>
          <td>{title}</td>
          <td>{release_date}</td>
          <td>{popularity}</td>
          <td>{vote_count}</td>
          <td>{overview}</td>
          <td>
            <StarRatingComponent
              name='rate1'
              starCount={5}
              editing={true}
              value={rating}
              OnStarClick={this.OnStarClick.bind(this)}
            />
          </td>
          <td>
            <button className="btn btn-primary" onClick={this.addToWatchLater}>Add</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <input type="text" id="txtSearchCriteria" name="payloadBox" onChange={this.handleChange} className="form-control"></input>
            </div>
            <div className="col-sm">
              <button className="btn btn-primary" onClick={this.publish}>Search</button>
            </div>

          </div>
        </div>
        <br />
        <h3>Search Results</h3>
        <table id='movies' className="table table-striped table-bordered table-sm" cellSpacing="0">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Release date</th>
              <th>Popularity</th>
              <th>Votes</th>
              <th>Overview</th>
              <th style={{ width: 50 + 'px' }}>Rating</th>
              <th>Watch Later</th></tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }
  componentDidMount(param) {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=d18cb85c4a4e364a6f13ef0eecfc32fc&query=' + param)
      .then(response => response.json())
      .then(resData => {
        //console.log(JSON.stringify(resData))
        //do your logic here       
        //let person = resData.results
        this.setState({ movies: resData.results }); //this is an asynchronous function
      })
  }

}

/*function App() {
  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
