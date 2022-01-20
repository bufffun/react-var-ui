'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var cloneDeep = _interopDefault(require('lodash.clonedeep'));
var set = _interopDefault(require('lodash.set'));
var result = _interopDefault(require('lodash.result'));
var reactUsePointerDrag = require('react-use-pointer-drag');
var reactColor = require('react-color');

var VarUIContext = /*#__PURE__*/React.createContext(undefined);
/**
 * Simple function used for custom input components.
 * @param path
 * @param fallbackValue
 * @param onChange
 * @returns [value: T, setValue: (value: T) => void]
 */

function useVarUIValue(path, fallbackValue, onChange) {
  var context = React.useContext(VarUIContext);
  var value = React.useMemo(function () {
    var _context$getValue;

    return (_context$getValue = context == null ? void 0 : context.getValue(path)) != null ? _context$getValue : fallbackValue;
  }, [context, path, fallbackValue]);
  var setValue = React.useCallback(function (value) {
    if (path && context) {
      context.setValue(path, value);
    }

    onChange == null ? void 0 : onChange(path, value);
  }, [path, context, onChange]);
  return [value, setValue];
}

/**
 * This is the main component which provides a Context for other components.
 * It is not required to use this component - other components accept
 * `onChange` and `value` properties which provide a similar functionality.
 */

var VarUI = function VarUI(_ref) {
  var values = _ref.values,
      updateValues = _ref.updateValues,
      className = _ref.className,
      children = _ref.children;
  var getValue = React.useCallback(function (path) {
    return path ? result(values, path) : undefined;
  }, [values]);
  var setValue = React.useCallback(function (path, value) {
    updateValues(set(cloneDeep(values), path, value));
  }, [values, updateValues]);
  var contextValue = React.useMemo(function () {
    return {
      values: values,
      getValue: getValue,
      setValue: setValue
    };
  }, [values, getValue, setValue]);
  return React__default.createElement(VarUIContext.Provider, {
    value: contextValue
  }, React__default.createElement("div", {
    className: 'react-var-ui ' + (className ? className : '')
  }, children));
};

/**
 * Base VarUI input component. Doesn't do anything besides displaying the label.
 * Used to construct other components from.
 */

var VarBase = function VarBase(_ref) {
  var label = _ref.label,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled;
  return React__default.createElement("div", {
    className: 'react-var-ui-label ' + (label ? 'react-var-ui-label-has-label ' : 'react-var-ui-label-no-label ') + (disabled ? 'react-var-ui-disabled ' : '') + (className ? className : '')
  }, !!label && React__default.createElement("span", null, label), children);
};

var PI2 = Math.PI * 2;

function wrap(angle) {
  return (PI2 + angle % PI2) % PI2;
}
/**
 * Angle picker component. Accepts and provides numbers (radians).
 */


var VarAngle = function VarAngle(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? 0 : _ref$defaultValue,
      className = _ref.className;
  var controlRef = React.useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var degrees = React.useMemo(function () {
    return Math.round(wrap(currentValue) * (180 / Math.PI));
  }, [currentValue]);
  var updatePosition = React.useCallback(function (x, y) {
    if (!controlRef.current) {
      return;
    }

    var div = controlRef.current;
    var rect = div.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    setCurrentValue(wrap(Math.atan2(y - centerY, x - centerX) + Math.PI / 2));
  }, [setCurrentValue]);

  var _usePointerDragSimple = reactUsePointerDrag.usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events;

  React.useEffect(function () {
    var _controlRef$current;

    (_controlRef$current = controlRef.current) == null ? void 0 : _controlRef$current.addEventListener('wheel', function (e) {
      return e.preventDefault();
    });
  }, []);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", {
    className: "react-var-ui-angle-value"
  }, degrees, "\xB0"), React__default.createElement("div", {
    className: "react-var-ui-angle"
  }, React__default.createElement("div", Object.assign({
    className: "react-var-ui-angle-control",
    ref: controlRef,
    style: {
      transform: "rotate(" + degrees + "deg)"
    },
    onDoubleClick: function onDoubleClick() {
      return typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue);
    },
    onWheel: function onWheel(e) {
      setCurrentValue(wrap(currentValue + 0.5 * (e.deltaY < 0 ? -1 : 1)));
    },
    title: "Angle"
  }, events))));
};

/**
 * Button component. Only provides a onClick property.
 */

var VarButton = function VarButton(_ref) {
  var label = _ref.label,
      _onClick = _ref.onClick,
      buttonLabel = _ref.buttonLabel,
      disabled = _ref.disabled,
      className = _ref.className;
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", {
    className: "react-var-ui-button"
  }, React__default.createElement("button", {
    onClick: function onClick() {
      return _onClick == null ? void 0 : _onClick();
    },
    disabled: disabled
  }, buttonLabel)));
};

/**
 * Color picker component. Returns and accepts values in form of hex color strings.
 */

var VarColor = function VarColor(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      alpha = _ref.alpha,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var _useState = React.useState(false),
      show = _useState[0],
      setShow = _useState[1];

  var handleCloseClick = React.useCallback(function (event) {
    var _event$target;

    var popup = (_event$target = event.target) == null ? void 0 : _event$target.closest('.sketch-picker');
    var has_picker = document.getElementsByClassName("sketch-picker").length != 0;

    if (has_picker && show && popup == null) {
      setShow(false);
    }
  }, [show, setShow]);
  React.useEffect(function () {
    if (show) {
      window.addEventListener('click', handleCloseClick);
    } else {
      window.removeEventListener('click', handleCloseClick);
    }

    return function () {
      return window.removeEventListener("click", handleCloseClick);
    };
  }, [show]);
  var toggle = React.useCallback(function () {
    setShow(function (show) {
      return !show;
    });
  }, [setShow]); // const close = useCallback(() => {
  //   setShow(false);
  // }, [setShow]);

  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", null, React__default.createElement("span", {
    className: "react-var-ui-color-value"
  }, currentValue), React__default.createElement("div", {
    className: "react-var-ui-color"
  }, React__default.createElement("div", {
    className: "react-var-ui-color-swatch",
    onClick: toggle
  }, React__default.createElement("div", {
    className: "react-var-ui-color-color",
    title: "Color preview",
    style: {
      background: currentValue
    }
  })), show ? React__default.createElement("div", {
    className: "react-var-ui-color-popover"
  }, React__default.createElement(reactColor.SketchPicker, {
    color: currentValue,
    onChange: function onChange(result) {
      if (alpha) {
        var _result$rgb$a;

        var alphaValue = Math.round(((_result$rgb$a = result.rgb.a) != null ? _result$rgb$a : 1.0) * 255).toString(16);

        if (alphaValue.length === 1) {
          alphaValue = '0' + alphaValue;
        }

        setCurrentValue(result.hex + alphaValue);
      } else {
        setCurrentValue(result.hex);
      }
    },
    disableAlpha: !alpha
  })) : null)));
};

/**
 * A simple component that displays a string or a numeric value.
 */

var VarDisplay = function VarDisplay(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value),
      currentValue = _useVarUIValue[0];

  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", null, currentValue));
};

function roundValue(value, min, max, step, integer) {
  if (!isFinite(value)) {
    value = min != null ? min : 0;
  }

  var decimalPlaces = 2;

  if (typeof step === 'number') {
    var _step$toString$split$;

    decimalPlaces = ((_step$toString$split$ = step.toString().split('.')[1]) == null ? void 0 : _step$toString$split$.length) || 0;

    if (decimalPlaces > 20) {
      // JavaScript limitation
      decimalPlaces = 20;
    }

    value = Math.round(value / step) * step;
  }

  if (typeof min === 'number') {
    value = Math.max(min, value);
  }

  if (typeof max === 'number') {
    value = Math.min(max, value);
  }

  return integer ? Math.round(value) : parseFloat(value.toFixed(decimalPlaces));
}

var IconDown = function IconDown() {
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, React__default.createElement("path", {
    fillRule: "evenodd",
    d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  }));
};

var IconUp = function IconUp() {
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, React__default.createElement("path", {
    fillRule: "evenodd",
    d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
  }));
};

/**
 * Integer/float number component. Accepts and provides numbers.
 */

var VarNumber = function VarNumber(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      integer = _ref.integer,
      showButtons = _ref.showButtons,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var rounded = React.useMemo(function () {
    return roundValue(currentValue, min, max, step, !!integer);
  }, [currentValue, min, max, step, integer]);
  var increaseValue = React.useCallback(function () {
    return setCurrentValue(roundValue(currentValue + (step != null ? step : 1), min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  var decreaseValue = React.useCallback(function () {
    return setCurrentValue(roundValue(currentValue - (step != null ? step : 1), min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("div", {
    className: "react-var-ui-number"
  }, React__default.createElement("input", {
    className: "react-var-ui-number-input",
    type: "number",
    min: min,
    max: max,
    step: step,
    value: rounded.toString(),
    onChange: function onChange(e) {
      return setCurrentValue(roundValue(parseFloat(e.target.value), min, max, step, !!integer));
    }
  }), showButtons && React__default.createElement(React__default.Fragment, null, React__default.createElement("button", {
    title: "Increase",
    onClick: increaseValue
  }, React__default.createElement(IconUp, null)), React__default.createElement("button", {
    title: "Decrease",
    onClick: decreaseValue
  }, React__default.createElement(IconDown, null)))));
};

/**
 * Select component. Returns and accepts either `value` from option object or `key` when `value` is not provided.
 */

var VarSelect = function VarSelect(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      options = _ref.options,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var serializedCurrentValue = React.useMemo(function () {
    return JSON.stringify(currentValue);
  }, [currentValue]);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("div", {
    className: "react-var-ui-select"
  }, React__default.createElement("select", {
    onChange: function onChange(e) {
      return setCurrentValue(JSON.parse(e.target.value));
    },
    value: serializedCurrentValue,
    title: "Select options"
  }, options.map(function (option) {
    var _option$value;

    var serializedValue = JSON.stringify((_option$value = option.value) != null ? _option$value : option.key);
    return React__default.createElement("option", {
      key: option.key,
      value: serializedValue
    }, option.label);
  }))));
};

/**
 * Integer/float slider component. Accepts and provides numbers.
 */

var VarSlider = function VarSlider(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      integer = _ref.integer,
      defaultValue = _ref.defaultValue,
      showInput = _ref.showInput,
      showButtons = _ref.showButtons,
      disabled = _ref.disabled,
      className = _ref.className;
  var sliderRef = React.useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var rounded = React.useMemo(function () {
    return roundValue(currentValue, min, max, step, !!integer);
  }, [currentValue, min, max, step, integer]);
  var percent = React.useMemo(function () {
    return (rounded - min) / (max - min) * 100;
  }, [rounded, min, max]);
  var updatePosition = React.useCallback(function (x) {
    if (!sliderRef.current) {
      return;
    }

    var div = sliderRef.current;
    var rect = div.getBoundingClientRect();
    var percent = (x - rect.left) / rect.width;
    var value = roundValue(min + (max - min) * percent, min, max, step, !!integer);
    setCurrentValue(value);
  }, [setCurrentValue, integer, min, max, step]);
  var increaseValue = React.useCallback(function () {
    return setCurrentValue(roundValue(currentValue + step, min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  var decreaseValue = React.useCallback(function () {
    return setCurrentValue(roundValue(currentValue - step, min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);

  var _usePointerDragSimple = reactUsePointerDrag.usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events; // useEffect(() => {
  //   sliderRef.current?.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  // }, []);


  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("div", {
    className: "react-var-ui-slider"
  }, React__default.createElement("div", Object.assign({
    className: "react-var-ui-slider-track",
    ref: sliderRef,
    onClick: function onClick(e) {
      return updatePosition(e.clientX);
    },
    onDoubleClick: function onDoubleClick() {
      return typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue);
    },
    title: "Slider"
  }, events), React__default.createElement("div", {
    className: "react-var-ui-slider-content",
    style: {
      width: percent + '%'
    }
  })), showInput ? React__default.createElement("input", {
    className: "react-var-ui-slider-input",
    type: "number",
    min: min,
    max: max,
    step: step,
    value: rounded,
    onChange: function onChange(e) {
      return setCurrentValue(roundValue(parseFloat(e.target.value), min, max, step, !!integer));
    }
  }) : React__default.createElement("span", null, rounded.toString()), showButtons && React__default.createElement(React__default.Fragment, null, React__default.createElement("button", {
    title: "Increase",
    onClick: increaseValue
  }, React__default.createElement(IconUp, null)), React__default.createElement("button", {
    title: "Decrease",
    onClick: decreaseValue
  }, React__default.createElement(IconDown, null)))));
};

/**
 * String input component. Accepts and provides a string value.
 */

var VarString = function VarString(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      maxLength = _ref.maxLength,
      multiline = _ref.multiline,
      autoexpand = _ref.autoexpand,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var autoexpandOnInput = function autoexpandOnInput(event) {
    var textarea = event.currentTarget;
    textarea.style.height = '0';
    textarea.style.height = textarea.scrollHeight + "px";
  };

  var textareaStyle = React.useMemo(function () {
    return autoexpand ? {
      overflow: 'hidden',
      resize: 'none'
    } : undefined;
  }, [autoexpand]);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, multiline ? React__default.createElement("textarea", {
    className: "react-var-ui-string-multiline",
    value: currentValue,
    onChange: function onChange(e) {
      return setCurrentValue(e.target.value);
    },
    onInput: autoexpand ? autoexpandOnInput : undefined,
    style: textareaStyle
  }) : React__default.createElement("span", {
    className: "react-var-ui-string"
  }, React__default.createElement("input", {
    type: "text",
    maxLength: maxLength,
    value: currentValue,
    onChange: function onChange(e) {
      return setCurrentValue(e.target.value);
    }
  })));
};

/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */

var VarToggle = function VarToggle(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", null, React__default.createElement("label", {
    className: "react-var-ui-toggle",
    title: "Toggle"
  }, React__default.createElement("input", {
    type: "checkbox",
    checked: currentValue || false,
    onChange: function onChange(e) {
      return setCurrentValue(e.target.checked);
    }
  }), React__default.createElement("span", {
    className: "react-var-ui-toggle-helper"
  }))));
};

function roundValue$1(value, min, max, step) {
  var result = [0, 0];

  if (!value || !Array.isArray(value) || value.length < 2) {
    return result;
  }

  for (var i = 0; i < step.length; i++) {
    var _step$i$toString$spli;

    var decimalPlaces = ((_step$i$toString$spli = step[i].toString().split('.')[1]) == null ? void 0 : _step$i$toString$spli.length) || 0;
    result[i] = Math.round(value[i] / step[i]) * step[i];
    result[i] = Math.max(min[i], result[i]);
    result[i] = Math.min(max[i], result[i]);
    result[i] = parseFloat(result[i].toFixed(decimalPlaces));
  }

  return result;
}

function percentValue(value, min, max) {
  if (!value) {
    return [50, 50];
  }

  var result = [0, 0];

  for (var i = 0; i < value.length; i++) {
    result[i] = (value[i] - min[i]) / (max[i] - min[i]) * 100;
  }

  return result;
}
/**
 * XY offset picker. Accepts and provides an array in form of [x, y].
 */


var VarXY = function VarXY(_ref) {
  var label = _ref.label,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      className = _ref.className,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? [0, 0] : _ref$defaultValue,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? [-1.0, -1.0] : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? [1.0, 1.0] : _ref$max,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? [0.01, 0.01] : _ref$step;
  var sliderRef = React.useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var rounded = React.useMemo(function () {
    return roundValue$1(currentValue, min, max, step);
  }, [currentValue, min, max, step]);
  var percent = React.useMemo(function () {
    return percentValue(rounded, min, max);
  }, [rounded, min, max]);
  var updatePosition = React.useCallback(function (x, y) {
    if (!sliderRef.current) {
      return;
    }

    var div = sliderRef.current;
    var rect = div.getBoundingClientRect();
    var percentX = (x - rect.left) / rect.width;
    var percentY = (y - rect.top) / rect.height;
    var value = roundValue$1([min[0] + (max[0] - min[0]) * percentX, min[1] + (max[1] - min[1]) * percentY], min, max, step);
    setCurrentValue(value);
  }, [setCurrentValue, min, max, step]);

  var _usePointerDragSimple = reactUsePointerDrag.usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events;

  var reset = React.useCallback(function () {
    if (typeof defaultValue !== 'undefined') {
      setCurrentValue(defaultValue);
    }
  }, [defaultValue, setCurrentValue]);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("span", {
    className: "react-var-ui-xy-value"
  }, rounded[0], ", ", rounded[1]), React__default.createElement("div", {
    className: "react-var-ui-xy"
  }, React__default.createElement("div", Object.assign({
    className: "react-var-ui-xy-space",
    ref: sliderRef,
    onClick: function onClick(e) {
      return updatePosition(e.clientX, e.clientY);
    },
    onDoubleClick: reset
  }, events), React__default.createElement("div", {
    className: "react-var-ui-xy-control",
    style: {
      top: percent[1] + '%',
      left: percent[0] + '%'
    }
  }))));
};

var IconImageSelect = function IconImageSelect() {
  return React__default.createElement("svg", {
    width: "34",
    height: "36",
    viewBox: "0 0 34 36",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("rect", {
    x: "0.5",
    y: "2.5",
    width: "33",
    height: "33",
    rx: "5.5",
    stroke: "#515151"
  }), React__default.createElement("path", {
    d: "M16.456 13.736V18.968H11.2V20.6H16.456V25.856H18.088V20.6H23.32V18.968H18.088V13.736H16.456Z",
    fill: "#515151"
  }));
};

/**
 * A simple component that displays a string or a numeric value.
 */

var VarImage = function VarImage(_ref) {
  var label = _ref.label,
      disabled = _ref.disabled,
      path = _ref.path,
      value = _ref.value,
      onChange = _ref.onChange,
      className = _ref.className;

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var inputRef = React.useRef(null);
  var deleteAction = React.useCallback(function () {
    setCurrentValue({
      src: null
    });

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setCurrentValue, inputRef]);
  var onFileChange = React.useCallback(function (event) {
    var _file$name$split, _file$name$split$pop;

    var files = event == null ? void 0 : event.target.files;
    if (!files || !files.length) return;
    var file = files[0];
    var url = URL.createObjectURL(file);
    var extension = (_file$name$split = file.name.split('.')) == null ? void 0 : (_file$name$split$pop = _file$name$split.pop()) == null ? void 0 : _file$name$split$pop.toLowerCase();
    setCurrentValue({
      src: url,
      type: file.type,
      extension: extension
    });
  }, [setCurrentValue]);
  return React__default.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React__default.createElement("div", {
    className: "react-var-ui-image"
  }, React__default.createElement("div", {
    className: "react-var-ui-image-wrapper"
  }, currentValue == null || currentValue.src == null ? React__default.createElement(IconImageSelect, null) : React__default.createElement("img", {
    className: "react-var-ui-image-wrapper-preview",
    src: currentValue.src instanceof HTMLImageElement ? currentValue.src.src : currentValue.src,
    alt: "preview"
  }), React__default.createElement("input", {
    ref: inputRef,
    type: "file",
    id: '',
    onChange: onFileChange
  })), currentValue == null || currentValue.src == null ? null : React__default.createElement("span", {
    className: "react-var-ui-image-delete",
    onClick: deleteAction
  }, "\u5220\u9664")));
};

/**
 * Category component for grouping inputs.
 */

var VarCategory = function VarCategory(_ref) {
  var label = _ref.label,
      className = _ref.className,
      children = _ref.children;
  return React__default.createElement("div", {
    className: 'react-var-ui-category ' + (className ? className : '')
  }, React__default.createElement("div", {
    className: "react-var-ui-category-title"
  }, label), !!children && React__default.createElement("div", null, children));
};

exports.VarAngle = VarAngle;
exports.VarBase = VarBase;
exports.VarButton = VarButton;
exports.VarCategory = VarCategory;
exports.VarColor = VarColor;
exports.VarDisplay = VarDisplay;
exports.VarImage = VarImage;
exports.VarNumber = VarNumber;
exports.VarSelect = VarSelect;
exports.VarSlider = VarSlider;
exports.VarString = VarString;
exports.VarToggle = VarToggle;
exports.VarUI = VarUI;
exports.VarXY = VarXY;
exports.useVarUIValue = useVarUIValue;
//# sourceMappingURL=react-var-ui.cjs.development.js.map
