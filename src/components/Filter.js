import React from "react";

const years = [
  { name: 2006 },
  { name: 2007 },
  { name: 2008 },
  { name: 2009 },
  { name: 2010 },
  { name: 2011 },
  { name: 2012 },
  { name: 2013 },
  { name: 2014 },
  { name: 2015 },
  { name: 2016 },
  { name: 2017 },
  { name: 2018 },
  { name: 2019 },
  { name: 2020 },
];

const launchValue = [
  { value: true, name: "True" },
  { value: false, name: "False" },
];

const landingValue = [
  { value: true, name: "True" },
  { value: false, name: "False" },
];

const Filter = ({
  handleYearChange,
  handleLaunchChange,
  handleLandingChange,
  year,
  landing,
  launch,
}) => {
  return (
    <div className="filter-wrapper">
      <div className="year-container">
        <div className="filter-header">Filters</div>
        <div className="launch-year-heading-container">Launch year</div>
        <div className="year-filter-container">
          {years.map((item) => (
            <div className="year-item-container" key={item.name}>
              <div
                onClick={() => handleYearChange(item.name)}
                className={`year-item-wrapper ${
                  year === item.name ? "active" : ""
                }`}
                // className={`nav-item ${tab === "About" ? "active" : ""}`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="launch-year-heading-container">Successful Launch</div>
        <div className="year-filter-container">
          {launchValue.map((item) => (
            <div className="year-item-container" key={item.name}>
              <div
                onClick={() => handleLaunchChange(item.name, item.value)}
                className={`year-item-wrapper launch ${
                  launch === item.value ? "active" : ""
                }`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="launch-year-heading-container">Successful Landing</div>
        <div className="year-filter-container">
          {landingValue.map((item) => (
            <div className="year-item-container" key={item.name}>
              <div
                onClick={() => handleLandingChange(item.name, item.value)}
                className={`year-item-wrapper landing ${
                  landing === item.value ? "active" : ""
                }`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
