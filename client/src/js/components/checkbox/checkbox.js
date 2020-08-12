import React, { useState } from "react";

import "./checkbox.css";
export default function CheckBox(props) {
  return (
    <label className="container" style={{}}>
      <input type="checkbox" checked={props.isChecked} onChange={() => {}}></input>
      <span className="checkmark" onClick={props.checkedBox}></span>
    </label>
  );
}
