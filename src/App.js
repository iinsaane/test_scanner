import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function App() {
  const [value, setvalue] = useState("");
  const [manualKeyboardPolicy, setmanualKeyboardPolicy] = useState(false);
  const [virtualKeyboardSupport, setvirtualKeyboardSupport] = useState(false);

  function checkForVirtualKeyboardPolicy() {
    if ("virtualKeyboard" in navigator) {
      setvirtualKeyboardSupport(true);
    } else {
      setvirtualKeyboardSupport(false);
    }
  }

  

  useEffect(() => {
    checkForVirtualKeyboardPolicy();
    // navigator.virtualKeyboard.addEventListener('geometrychange', (event) => {
    //   const { x, y, width, height } = event.target.boundingRect;
    //   document.getElementById("virtualGeometry").innerHTML = 'Virtual keyboard geometry changed:' + x + y + width + height
    // });
  }, []);

  return (
    <div className="App">
      <header className="App-header ml-2">
        <div id="policy">
          {virtualKeyboardSupport ? (
            <div>Virtual Keyboard control is supported!</div>
          ) : (
            <div>Virtual Keyboard control is not supported</div>
          )}
        </div>

        <input
          type="text"
          value={value}
          onInput={(e) => setvalue(e.target.value)}
          className="form-control my-3 mx-6"
          placeholder="input"
          manualKeyboardPolicy={manualKeyboardPolicy ? "manual" : "auto"}
          contentEditable
          inputMode="text"
        />

        <span className="mx3"> input value: {value}</span>
        
        <Form.Check type="switch" label="auto / manual" checked={manualKeyboardPolicy} onChange={e => setmanualKeyboardPolicy(!manualKeyboardPolicy)}></Form.Check>
        
        <button onClick={() => navigator.virtualKeyboard.overlaysContent = true}>navigator.virtualKeyboard.overlaysContent = true</button>
        <button onClick={() => navigator.virtualKeyboard.overlaysContent = false}>navigator.virtualKeyboard.overlaysContent = false</button>

        <br />

        <button onClick={() => navigator.virtualKeyboard.show()}>navigator.virtualKeyboard.show();</button>
        <button onClick={() => navigator.virtualKeyboard.hide()}>navigator.virtualKeyboard.hide();</button>

        <br />

        <div id="virtualGeometry">no changes detected</div>
      </header>
    </div>
  );
}

export default App;
