import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.scss';

import {
  VarUI,
  VarColor,
  VarToggle,
  VarSelect,
  VarSlider,
  VarXY,
  VarCategory,
  VarButton,
  VarString,
  VarAngle,
  VarDisplay,
  VarNumber,
  VarImage,
  VarAdd,
  VarGroup,
  VarGroupItem,
  VarVector2,
  VarVector3,
} from '../.';

const App = () => {
  const image = new Image();
  image.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const [values, setValues] = React.useState({
    toggle: true,
    color: '#FF0000',
    colorAlpha: '#FF0000DD',
    select: 'zero',
    slider: 0.4,
    number: 1,
    string: 'test',
    angle: 0,
    xy: [0, 0],
    vector2: [3, 3],
    vector3: [2, 3, 4],
    image: { src: image },
  });

  const colorChange = (path: any, value: any) => {
    console.log(path);
    console.log(value);
  };

  return (
    <div>
      <h1>VarUI example</h1>
      <div className="example">
        <div className="wrapper">
          <VarUI updateValues={setValues} values={values}>
            {/* <VarCategory label="Example"> */}
            <VarCategory label="Example" showDash={true}>
              <VarColor label="VarColor" path="color" onChange={colorChange} />
              <VarDisplay label="VarDisplay" path="color" />
              <VarToggle label="VarToggle" path="toggle" />
            </VarCategory>
            <VarColor label="VarColor (alpha)" path="colorAlpha" alpha />
            <VarAdd label="ADD">
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  background: '#ff0000',
                }}
              ></div>
            </VarAdd>
            <VarDisplay label="VarDisplay" path="color" />
            <VarGroup label="Group">
              <VarGroupItem>
                <VarToggle label="VarToggle" path="toggle" />
              </VarGroupItem>
              <VarGroupItem>
                <VarColor label="VarColor (alpha)" path="colorAlpha" alpha />
              </VarGroupItem>
              <VarGroupItem>
                <VarImage
                  label="VarImage"
                  path="image"
                  onChange={colorChange}
                />
              </VarGroupItem>
            </VarGroup>

            <VarSelect
              path="select"
              label="VarSelect"
              options={[
                { key: 'zero', label: 'Zero' },
                { key: 'one', label: 'One' },
              ]}
            />
            <VarSlider
              label="VarSlider"
              path="slider"
              min={0.2}
              max={0.8}
              step={0.1}
            />
            <VarSlider
              label="VarSlider (showInput + showButtons)"
              path="slider"
              min={0.2}
              max={0.8}
              step={0.1}
              showInput
              showButtons
            />
            <VarSlider
              label="VarSlider (showInput)"
              path="slider"
              min={0.2}
              max={0.8}
              step={0.1}
              showInput
            />
            <VarSlider
              label="VarSlider (showButtons)"
              path="slider"
              min={0.2}
              max={0.8}
              step={0.1}
              showButtons
            />
            <VarNumber
              label="VarNumber"
              path="number"
              min={0.2}
              max={0.8}
              step={0.1}
              showButtons
            />
            <VarVector2
              label="VarVector2"
              path="vector2"
              min={[1, 1]}
              max={[32, 20]}
              step={[1, 1]}
            />
            <VarVector3
              label="VarVector3"
              path="vector3"
              min={[1, 2, 3]}
              max={[200, 20, 100]}
              step={[1, 1, 1]}
            />
            <VarNumber label="VarNumber (no buttons)" path="number" />
            <VarString label="VarString" path="string" />
            <VarString label="VarString (multiline)" path="string" multiline />
            <VarAngle label="VarAngle" path="angle" />
            <VarXY label="VarXY" path="xy" />
            <VarButton
              buttonLabel="VarButton (no label)"
              onClick={() => alert('clicked!')}
            />
            <VarButton
              label="VarButton"
              buttonLabel="VarButton (with label)"
              onClick={() => alert('clicked!')}
            />
            {/* </VarCategory> */}
          </VarUI>
        </div>
        <div className="values">
          <strong>Values:</strong>
          <dl>
            {Object.keys(values).map(function (key) {
              if (key === "image") {
                return <React.Fragment key={key}></React.Fragment>
              }
              return (
                <React.Fragment key={key}>
                  <dt>{key}</dt>
                  <dd>
                    {typeof values[key] === 'boolean'
                      ? values[key]
                        ? 'true'
                        : 'false'
                      : Array.isArray(values[key])
                      ? values[key].join(', ')
                      : values[key]}
                  </dd>
                </React.Fragment>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
