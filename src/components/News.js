import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&pagesize=9";
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults });
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${
      this.state.page - 1
    }&pagesize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handleNextClick = async () => {
    if(this.state.page+1>Math.ceil(this.state.totalResults/10)){}
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${
      this.state.page + 1
    }&pagesize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  }
  };
  render() {
    return (
      <div className="container my-3">
       <marquee behavior="scroll" direction="left" scrollamount="12"><h1>"Catch Every Major Headline"</h1></marquee>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  NewsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;