import React from "react";


const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, Author } = props;
  return (
    <>
      <div className="card ">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p>{Author}</p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark text-light"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </>
  );
};

// #endregion

export default NewsItems;
