import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [totalResult, setTotalResult] = useState(0);
  const [Articleslength, setArticlesLength] = useState(articles.length);

  useEffect(() => {
    const update = async ()=>{
      let url =
      "https://newsapi.org/v2/top-headlines?country=in&pageSize=20&apiKey=1710d98839cc4dc09c328d225b69f601&" +
      page;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setArticles(data.articles);
    setLoading(false);
    setTotalResult(data.articles.totalResults);
    props.setProgress(100);
    }
    update()
  }, []);

  const changeCategory = async (e) => {
    setCategory(e.target.length);
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&pageSize=20&apiKey=1710d98839cc4dc09c328d225b69f601&" +
      page +
      "&category=" +
      `${e.target.value !== "" ? e.target.value : category}`;
    console.log(url);

    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setArticles(data.articles);
    setLoading(false);
    setTotalResult(data.articles.totalResults);
  };

  const fetchMoreData = async () => {
    if (page + 1 > articles.length / 20 + 1) {
    } else {
      setPage(page + 1);
      setLoading(true);
      let url =
        "https://newsapi.org/v2/top-headlines?country=in&pageSize=20&apiKey=1710d98839cc4dc09c328d225b69f601&page=" +
        (page+1 ) +
        "&category=" +
        category;
        console.log(url)
      let response = await fetch(url);
      let data = await response.json();
      setArticles(articles.concat(data.articles));
      setArticlesLength(articles.length + data.articles.length);
      setLoading(false);
      setTotalResult(data.articles.totalResults);
    }
  };
  return (
    <>
      <div className="container my-4">
        <h2 style={{marginTop:"10vh"}}>Top HeadLines</h2>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={changeCategory}
        >
          <option hidden>Select Category</option>
          <option value="business">business</option>s
          <option value="entertainment">entertainment</option>
          <option value="general">general</option>
          <option value="health">health</option>
          <option value="science">science</option>
          <option value="sports">sports</option>
          <option value="technology">technology</option>
        </select>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={(articles.length===totalResult)?false:true}
          loader={<Spinner/>}
        >

          <div className="row container">
            {loading && <Spinner />}
            {articles.map((element) => {
              return (
                <>
                  <div key={element.url} className="col-md-4 my-3">
                    <NewsItems
                      title={element.title}
                      description={
                        element.description != null
                          ? element.description.slice(0, 84)
                          : ""
                      }
                      Author={element.author}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url != null ? element.url : ""}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default News;
