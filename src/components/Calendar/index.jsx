import React, { Component } from "react";
import "./style.css";

class Calendar extends Component {
  state = {
    days: 31,
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    selectedDate: {
      day: null,
      month: null,
      year: null,
      hour: null,
      min: null,
      secs: null
    }
  };

  constructor(props) {
    super(props);
    var d = new Date();
    const current_date = {
      day: d.getDate(),
      month: d.getUTCMonth() + 1,
      year: d.getFullYear(),
      hour: d.getHours(),
      min: d.getMinutes(),
      secs: d.getSeconds()
    };
    // console.log(d);
    this.state.selectedDate = current_date;
    console.log(this.state);
  }

  renderDays = () => {
    var days = Array(this.state.days)
      .fill()
      .map((x, i) => ++i);

    const list = days.map(i => (
      <div
        className={
          this.state.selectedDate.day == i
            ? "small-block active"
            : "small-block"
        }
        key={"day-" + i}
        onClick={this.handleSetDay.bind(this)}
      >
        {i}
      </div>
    ));
    return list;
  };

  handleSetDay = i => {
    var day = i.target.innerHTML;
    document.querySelectorAll(".small-block").forEach(function(elem) {
      elem.setAttribute("class", "small-block");
    });
    i.target.setAttribute("class", "small-block active");
    // console.log(i.target.innerHTML);
    // this.setState
  };

  renderYears = () => {
    var years = [];
    for (var i = 1900; i < 2050; i++) {
      years.push(i);
    }
    const year_list = years.map(i => (
      <option selected={this.state.selectedDate.year == i} key={"y-" + i}>
        {i}
      </option>
    ));
    return year_list;
  };

  renderHours = () => {
    var hours = [];
    for (var i = 1; i <= 24; i++) hours.push(i);
    const hours_list = hours.map(i => (
      <option selected={this.state.selectedDate.hour == i} key={"h-" + i}>
        {i + "hour"}
      </option>
    ));
    return hours_list;
  };

  renderMins = () => {
    var mins = [];
    for (var i = 1; i <= 60; i++) mins.push(i);
    const mins_list = mins.map(i => (
      <option selected={this.state.selectedDate.min == i} key={"m-" + i}>
        {i + "mins"}
      </option>
    ));
    return mins_list;
  };

  renderSecs = () => {
    var secs = [];
    for (var i = 1; i <= 60; i++) secs.push(i);
    const secs_list = secs.map(i => (
      <option selected={this.state.selectedDate.secs == i} key={"s-" + i}>
        {i + "secs"}
      </option>
    ));
    return secs_list;
  };

  checkCurrentMonth = month => {
    if (this.state.months.indexOf(month) + 1 == this.state.selectedDate.month) {
      return true;
    }
  };

  handleMonthChange = month => {
    console.log(month.target.value);

    const dup_date = this.state.selectedDate;
    dup_date.month = this.state.months.indexOf(month.target.value) + 1;
    this.setState({ selectedDate: dup_date });
    console.log(this.state);

    var leap = this.ifLeapYear(this.state.selectedDate.year);
    if (month.target.value == "Feb" && leap) {
      this.setState({ days: 29 });
      console.log(this.state);
    } else {
      this.setState({ days: 28 });
    }
  };

  ifLeapYear = year => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  };

  handleYearChange = year => {
    console.log(year.target.value);
    const dup_date = this.state.selectedDate;
    dup_date.year = year.target.value;
    this.setState({ selectedDate: dup_date });

    var leap = this.ifLeapYear(this.state.selectedDate.year);

    if (this.state.selectedDate.month == "2" && leap) {
      this.setState({ days: 29 });
      console.log(this.state);
    } else if (this.state.selectedDate.month != "2" && !leap) {
      this.setState({ days: 30 });
    } else {
      this.setState({ days: 28 });
    }
  };

  render() {
    return (
      <div className="calendar-component">
        <h1>Calendar</h1>
        <br />
        <select name="" id="" onChange={month => this.handleMonthChange(month)}>
          {this.state.months.map(month => (
            <option
              key={"opt-" + month}
              selected={this.checkCurrentMonth(month)}
            >
              {month}
            </option>
          ))}
        </select>
        <select name="" id="" onChange={year => this.handleYearChange(year)}>
          {this.renderYears()}
        </select>
        <div className="big-block">{this.renderDays()}</div>

        <div className="time-wrapper">
          <select name="" id="">
            {this.renderHours()}
          </select>
          <select name="" id="">
            {this.renderMins()}
          </select>
          <select name="" id="">
            {this.renderSecs()}
          </select>
        </div>
      </div>
    );
  }
}

export default Calendar;
