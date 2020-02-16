import React, { Component } from "react";

//axios
import axios from "axios";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import LoadingAuthors from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const data = response.data;
      this.setState({ authors: data, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  selectAuthor = async author => {
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      const data = response.data;
      this.setState({ currentAuthor: data });
    } catch (err) {
      console.log(err);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">
            {this.state.loading ? <LoadingAuthors /> : this.getContentView()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
