import React from "react";
import "./SearchPage.css";
import { useStateValue } from "./StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import Response from "./response";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import ImageIcon from "@material-ui/icons/Image";
import RoomIcon from "@material-ui/icons/Room";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Avatar, IconButton } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  const hideButtons = true;
  const { data } = useGoogleSearch(term);

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons={hideButtons} />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">Tous</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <OndemandVideoOutlinedIcon />
                <Link to="/videos">Vidéos</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="/news">Actualités</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="/more">Plus</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="settings">Paramètres</Link>
              </div>
              <div className="searchPage__option">
                <Link to="tools">Outils</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            Environ {data?.searchInformation.formattedTotalResults} résultats (
            {data?.searchInformation.formattedSearchTime} secondes) pour {term}
          </p>
          {data?.items.map((item) => (
            <div key={item.link} className="searchPage__result">
              <a
                target="_blank"
                className="searchPage__resultLink"
                href={item.link}
              >
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink} <ArrowDropDownIcon />
              </a>
              <a
                target="_blank"
                className="searchPage__resultTitle"
                href={item.link}
              >
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
