import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title , description , url,url2,date,author} = this.props;
    let des=description.substr(0,250);
    let des1=`${des}...`;
    return (
      <div>
        <div className="card" >
          <img src={url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {des1}
            </p>
            <p>Date:{date}</p>
            <p>Author:{author}</p>
            <a href={url2} target="_blank" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
