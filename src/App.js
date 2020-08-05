import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import Image, { Shimmer } from "react-shimmer";
import loader from "./assets/Spinner.svg";
import "./App.css";

function App() {
  const [year, setYear] = useState(null);
  const [launch, setLaunch] = useState(null);

  const [landing, setLanding] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let params = { limit: 100 };
    if (year) {
      params = { ...params, launch_year: year };
    }
    if (launch !== null) {
      params = { ...params, launch_success: launch };
    }
    if (landing !== null) {
      params = { ...params, land_success: landing };
    }
    setLoading(true);
    axios
      .get("https://api.spacexdata.com/v3/launches", { params })
      .then((res) => {
        if (res.data.length > 0) {
          setData(
            res.data.map((i) => ({
              number: i.flight_number,
              name: i.mission_name,
              mission_id: i.mission_id,
              image: i.links.mission_patch_small,
              year: i.launch_year,
              launch_status: i.launch_success,
            }))
          );
        } else {
          setData(null);
        }

        setLoading(false);
      })
      .catch((e) => {
        setData(null);
      });
  }, [year, launch, landing]);

  const handleYearChange = (value) => {
    switch (value) {
      case value: {
        if (year === value) {
          setYear(null);
        } else {
          setYear(value);
        }
        break;
      }
      default: {
        setYear(null);
        break;
      }
    }
  };

  const handleLaunchChange = (name, value) => {
    switch (name) {
      case name: {
        if (launch === value) {
          setLaunch(null);
        } else {
          setLaunch(value);
        }
        break;
      }
      default: {
        setLaunch(null);
        break;
      }
    }
  };

  const handleLandingChange = (name, value) => {
    switch (name) {
      case name: {
        if (landing === value) {
          setLanding(null);
        } else {
          setLanding(value);
        }

        break;
      }
      default: {
        setLanding(null);
        break;
      }
    }
  };

  return (
    <div className="App">
      <div className="container-main">
        <div className="wrapper-main">
          <footer className="made-by-container">
            <div>Developed By: Sushant Kumar Singh</div>
          </footer>
          <header className="header-container">
            <div> SpaceX Launch Programs</div>
          </header>
          <Filter
            handleYearChange={handleYearChange}
            handleLaunchChange={handleLaunchChange}
            handleLandingChange={handleLandingChange}
            year={year}
            landing={landing}
            launch={launch}
          />
          <section className="data-item-container">
            {loading ? (
              <div className="loader-container">
                <img alt="loader" src={loader} />
              </div>
            ) : (
              <div className="list-main-wrapper">
                {data ? (
                  data.map((item) => (
                    <div key={item.number} className="item-wrapper">
                      <div className="item-wrapper-main">
                        <div className="image-container">
                          <Image
                            alt="space x image"
                            src={item.image}
                            fallback={<Shimmer width={150} height={200} />}
                          />
                        </div>
                        <div className="heading-container">
                          {" "}
                          {item.name} #{item.number}{" "}
                        </div>
                        <div className="mission-id-container">
                          <div className="mission-id-header">Mission Ids:</div>
                          <div className="mission-id-wrapper">
                            {item.mission_id.length > 0 ? (
                              <ul className="mission-list-container">
                                {item.mission_id.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                        <div className="launch-year-container">
                          Launch Year : <span>{item.year}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results-container">
                    <div className="no-results-wrapper">No results Found</div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
