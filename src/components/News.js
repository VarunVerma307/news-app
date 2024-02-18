import React, { Component } from "react";
import NewsItem from "./NewsItem.js";
import "./News.css";
import Spinner from "./Spinner.js";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading : false
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1adc66f0c15d40cb9567a8431b032e1d&page=1&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalArticles: parsedata.totalResults,
      loading:false
    });
   
  }

  handleNextClick = async () => {
    console.log("next");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1adc66f0c15d40cb9567a8431b032e1d&page=${
          this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({
          articles: parsedata.articles,
          page: this.state.page + 1,
          loading:false
        });
    
  };
  handlePreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1adc66f0c15d40cb9567a8431b032e1d&page=${
      this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles, page: this.state.page - 1, loading:false  });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row my-3">
           {this.state.loading && <Spinner/>} 
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    url={element.urlToImage}
                    url2={element.url}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container my-4" id="buttons">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr;Previous
          </button>
          <button
            type="button"
            disabled={Math.ceil(this.state.totalArticles / this.props.pageSize) < this.state.page + 1}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;

// Api
// 1adc66f0c15d40cb9567a8431b032e1d
