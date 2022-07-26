import React, { useContext, useMemo, useCallback, createContext, useRef, useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import result from 'lodash.result';
import { usePointerDragSimple } from 'react-use-pointer-drag';
import { SketchPicker } from 'react-color';

var VarUIContext = /*#__PURE__*/createContext(undefined);
/**
 * Simple function used for custom input components.
 * @param path
 * @param fallbackValue
 * @param onChange
 * @returns [value: T, setValue: (value: T) => void]
 */

function useVarUIValue(path, fallbackValue, onChange) {
  var context = useContext(VarUIContext);
  var value = useMemo(function () {
    var _context$getValue;

    return (_context$getValue = context == null ? void 0 : context.getValue(path)) != null ? _context$getValue : fallbackValue;
  }, [context, path, fallbackValue]);
  var setValue = useCallback(function (value) {
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
  var getValue = useCallback(function (path) {
    return path ? result(values, path) : undefined;
  }, [values]);
  var setValue = useCallback(function (path, value) {
    updateValues(set(cloneDeep(values), path, value));
  }, [values, updateValues]);
  var contextValue = useMemo(function () {
    return {
      values: values,
      getValue: getValue,
      setValue: setValue
    };
  }, [values, getValue, setValue]);
  return React.createElement(VarUIContext.Provider, {
    value: contextValue
  }, React.createElement("div", {
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
  return React.createElement("div", {
    className: 'react-var-ui-label ' + (label ? 'react-var-ui-label-has-label ' : 'react-var-ui-label-no-label ') + (disabled ? 'react-var-ui-disabled ' : '') + (className ? className : '')
  }, !!label && React.createElement("span", null, label), children);
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
  var controlRef = useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var degrees = useMemo(function () {
    return Math.round(wrap(currentValue) * (180 / Math.PI));
  }, [currentValue]);
  var updatePosition = useCallback(function (x, y) {
    if (!controlRef.current) {
      return;
    }

    var div = controlRef.current;
    var rect = div.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    setCurrentValue(wrap(Math.atan2(y - centerY, x - centerX) + Math.PI / 2));
  }, [setCurrentValue]);

  var _usePointerDragSimple = usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events;

  useEffect(function () {
    var _controlRef$current;

    (_controlRef$current = controlRef.current) == null ? void 0 : _controlRef$current.addEventListener('wheel', function (e) {
      return e.preventDefault();
    });
  }, []);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", {
    className: "react-var-ui-angle-value"
  }, degrees, "\xB0"), React.createElement("div", {
    className: "react-var-ui-angle"
  }, React.createElement("div", Object.assign({
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
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", {
    className: "react-var-ui-button"
  }, React.createElement("button", {
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

  var _useState = useState(false),
      show = _useState[0],
      setShow = _useState[1];

  var handleCloseClick = useCallback(function (event) {
    var _event$target;

    var popup = (_event$target = event.target) == null ? void 0 : _event$target.closest('.sketch-picker');
    var has_picker = document.getElementsByClassName('sketch-picker').length != 0;

    if (has_picker && show && popup == null) {
      setShow(false);
    }
  }, [show, setShow]);
  useEffect(function () {
    if (show) {
      window.addEventListener('click', handleCloseClick);
    } else {
      window.removeEventListener('click', handleCloseClick);
    }

    return function () {
      return window.removeEventListener('click', handleCloseClick);
    };
  }, [show]);
  var toggle = useCallback(function () {
    setShow(function (show) {
      return !show;
    });
  }, [setShow]); // const close = useCallback(() => {
  //   setShow(false);
  // }, [setShow]);

  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", null, React.createElement("span", {
    className: "react-var-ui-color-value"
  }, currentValue), React.createElement("div", {
    className: "react-var-ui-color"
  }, React.createElement("div", {
    className: "react-var-ui-color-swatch",
    onClick: toggle
  }, React.createElement("div", {
    className: "react-var-ui-color-color",
    title: "Color preview",
    style: {
      background: currentValue
    }
  })), show ? React.createElement("div", {
    className: "react-var-ui-color-popover"
  }, React.createElement(SketchPicker, {
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

  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", null, currentValue));
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
  return React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  }));
};

var IconUp = function IconUp() {
  return React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16"
  }, React.createElement("path", {
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

  var rounded = useMemo(function () {
    return roundValue(currentValue, min, max, step, !!integer);
  }, [currentValue, min, max, step, integer]);
  var increaseValue = useCallback(function () {
    return setCurrentValue(roundValue(currentValue + (step != null ? step : 1), min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  var decreaseValue = useCallback(function () {
    return setCurrentValue(roundValue(currentValue - (step != null ? step : 1), min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-number"
  }, React.createElement("input", {
    className: "react-var-ui-number-input",
    type: "number",
    min: min,
    max: max,
    step: step,
    value: rounded.toString(),
    onChange: function onChange(e) {
      return setCurrentValue(roundValue(parseFloat(e.target.value), min, max, step, !!integer));
    }
  }), showButtons && React.createElement(React.Fragment, null, React.createElement("button", {
    title: "Increase",
    onClick: increaseValue
  }, React.createElement(IconUp, null)), React.createElement("button", {
    title: "Decrease",
    onClick: decreaseValue
  }, React.createElement(IconDown, null)))));
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

  var serializedCurrentValue = useMemo(function () {
    return JSON.stringify(currentValue);
  }, [currentValue]);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-select"
  }, React.createElement("select", {
    onChange: function onChange(e) {
      return setCurrentValue(JSON.parse(e.target.value));
    },
    value: serializedCurrentValue,
    title: "Select options"
  }, options.map(function (option) {
    var _option$value;

    var serializedValue = JSON.stringify((_option$value = option.value) != null ? _option$value : option.key);
    return React.createElement("option", {
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
  var sliderRef = useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var rounded = useMemo(function () {
    return roundValue(currentValue, min, max, step, !!integer);
  }, [currentValue, min, max, step, integer]);
  var percent = useMemo(function () {
    return (rounded - min) / (max - min) * 100;
  }, [rounded, min, max]);
  var updatePosition = useCallback(function (x) {
    if (!sliderRef.current) {
      return;
    }

    var div = sliderRef.current;
    var rect = div.getBoundingClientRect();
    var percent = (x - rect.left) / rect.width;
    var value = roundValue(min + (max - min) * percent, min, max, step, !!integer);
    setCurrentValue(value);
  }, [setCurrentValue, integer, min, max, step]);
  var increaseValue = useCallback(function () {
    return setCurrentValue(roundValue(currentValue + step, min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);
  var decreaseValue = useCallback(function () {
    return setCurrentValue(roundValue(currentValue - step, min, max, step, !!integer));
  }, [currentValue, setCurrentValue, integer, min, max, step]);

  var _usePointerDragSimple = usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events; // useEffect(() => {
  //   sliderRef.current?.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  // }, []);


  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-slider"
  }, React.createElement("div", Object.assign({
    className: "react-var-ui-slider-track",
    ref: sliderRef,
    onClick: function onClick(e) {
      return updatePosition(e.clientX);
    },
    onDoubleClick: function onDoubleClick() {
      return typeof defaultValue !== 'undefined' && setCurrentValue(defaultValue);
    },
    title: "Slider"
  }, events), React.createElement("div", {
    className: "react-var-ui-slider-content",
    style: {
      width: percent + '%'
    }
  })), showInput ? React.createElement("input", {
    className: "react-var-ui-slider-input",
    type: "number",
    min: min,
    max: max,
    step: step,
    value: rounded,
    onChange: function onChange(e) {
      return setCurrentValue(roundValue(parseFloat(e.target.value), min, max, step, !!integer));
    }
  }) : React.createElement("span", null, rounded.toString()), showButtons && React.createElement(React.Fragment, null, React.createElement("button", {
    title: "Increase",
    onClick: increaseValue
  }, React.createElement(IconUp, null)), React.createElement("button", {
    title: "Decrease",
    onClick: decreaseValue
  }, React.createElement(IconDown, null)))));
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

  var textareaStyle = useMemo(function () {
    return autoexpand ? {
      overflow: 'hidden',
      resize: 'none'
    } : undefined;
  }, [autoexpand]);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, multiline ? React.createElement("textarea", {
    className: "react-var-ui-string-multiline",
    value: currentValue,
    onChange: function onChange(e) {
      return setCurrentValue(e.target.value);
    },
    onInput: autoexpand ? autoexpandOnInput : undefined,
    style: textareaStyle
  }) : React.createElement("span", {
    className: "react-var-ui-string"
  }, React.createElement("input", {
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

  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", null, React.createElement("label", {
    className: "react-var-ui-toggle",
    title: "Toggle"
  }, React.createElement("input", {
    type: "checkbox",
    checked: currentValue || false,
    onChange: function onChange(e) {
      return setCurrentValue(e.target.checked);
    }
  }), React.createElement("span", {
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
  var sliderRef = useRef(null);

  var _useVarUIValue = useVarUIValue(path, value, onChange),
      currentValue = _useVarUIValue[0],
      setCurrentValue = _useVarUIValue[1];

  var rounded = useMemo(function () {
    return roundValue$1(currentValue, min, max, step);
  }, [currentValue, min, max, step]);
  var percent = useMemo(function () {
    return percentValue(rounded, min, max);
  }, [rounded, min, max]);
  var updatePosition = useCallback(function (x, y) {
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

  var _usePointerDragSimple = usePointerDragSimple(updatePosition),
      events = _usePointerDragSimple.events;

  var reset = useCallback(function () {
    if (typeof defaultValue !== 'undefined') {
      setCurrentValue(defaultValue);
    }
  }, [defaultValue, setCurrentValue]);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("span", {
    className: "react-var-ui-xy-value"
  }, rounded[0], ", ", rounded[1]), React.createElement("div", {
    className: "react-var-ui-xy"
  }, React.createElement("div", Object.assign({
    className: "react-var-ui-xy-space",
    ref: sliderRef,
    onClick: function onClick(e) {
      return updatePosition(e.clientX, e.clientY);
    },
    onDoubleClick: reset
  }, events), React.createElement("div", {
    className: "react-var-ui-xy-control",
    style: {
      top: percent[1] + '%',
      left: percent[0] + '%'
    }
  }))));
};

var IconImageSelect = function IconImageSelect() {
  return React.createElement("svg", {
    width: "34",
    height: "36",
    viewBox: "0 0 34 36",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("rect", {
    x: "0.5",
    y: "2.5",
    width: "33",
    height: "33",
    rx: "5.5",
    stroke: "#515151"
  }), React.createElement("path", {
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

  var inputRef = useRef(null);
  var deleteAction = useCallback(function () {
    setCurrentValue({
      src: null
    });

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setCurrentValue, inputRef]);
  var onFileChange = useCallback(function (event) {
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
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-image"
  }, React.createElement("div", {
    className: "react-var-ui-image-wrapper"
  }, currentValue == null || currentValue.src == null ? React.createElement(IconImageSelect, null) : React.createElement("img", {
    className: "react-var-ui-image-wrapper-preview",
    src: currentValue.src instanceof HTMLImageElement ? currentValue.src.src : currentValue.src,
    alt: "preview"
  }), React.createElement("input", {
    ref: inputRef,
    type: "file",
    id: '',
    onChange: onFileChange
  })), currentValue == null || currentValue.src == null ? null : React.createElement("span", {
    className: "react-var-ui-image-delete",
    onClick: deleteAction
  }, "\u5220\u9664")));
};

var IconAdd = function IconAdd() {
  return React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "21",
    rx: "3.5",
    stroke: "#515151"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.5455 10.4545V5H9.90909V10.4545H5V12.0909H9.90909V17H11.5455V12.0909H17V10.4545H11.5455Z",
    fill: "#515151"
  }));
};

/**
 * Button component. Only provides a onClick property.
 */

var VarAdd = function VarAdd(_ref) {
  var label = _ref.label,
      didClick = _ref.didClick,
      disabled = _ref.disabled,
      className = _ref.className,
      children = _ref.children;

  var _useState = useState(false),
      show = _useState[0],
      setShow = _useState[1];

  var handleCloseClick = useCallback(function (event) {
    var _event$target;

    var popup = (_event$target = event.target) == null ? void 0 : _event$target.closest('.react-var-ui-add-popover');
    var has_picker = document.getElementsByClassName('react-var-ui-add-popover').length != 0;

    if (has_picker && show && popup == null) {
      setShow(false);
    }
  }, [show, setShow]);
  useEffect(function () {
    if (show) {
      window.addEventListener('click', handleCloseClick);
    } else {
      window.removeEventListener('click', handleCloseClick);
    }

    return function () {
      return window.removeEventListener('click', handleCloseClick);
    };
  }, [show]);
  var toggle = useCallback(function () {
    setShow(function (show) {
      return !show;
    });
  }, [setShow]);
  return React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-add"
  }, React.createElement("div", {
    className: "react-var-ui-add-wrapper"
  }, React.createElement("div", {
    onClick: function onClick() {
      toggle();
      didClick == null ? void 0 : didClick();
    }
  }, React.createElement(IconAdd, null)), show ? React.createElement("div", {
    className: "react-var-ui-add-popover"
  }, children) : null)));
};

var IconDelete = function IconDelete() {
  return React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("g", {
    opacity: "0.4"
  }, React.createElement("path", {
    d: "M14.5851 6.48999V15.51H5.56006V6.48999H14.5851ZM15.5851 4.48999H4.56006C4.29484 4.48999 4.04049 4.59535 3.85295 4.78288C3.66542 4.97042 3.56006 5.22477 3.56006 5.48999V16.51C3.56006 16.6413 3.58592 16.7714 3.63618 16.8927C3.68643 17.014 3.76009 17.1242 3.85295 17.2171C3.94581 17.31 4.05605 17.3836 4.17737 17.4339C4.2987 17.4841 4.42874 17.51 4.56006 17.51H15.5851C15.7164 17.51 15.8464 17.4841 15.9677 17.4339C16.0891 17.3836 16.1993 17.31 16.2922 17.2171C16.385 17.1242 16.4587 17.014 16.5089 16.8927C16.5592 16.7714 16.5851 16.6413 16.5851 16.51V5.48999C16.5851 5.22477 16.4797 4.97042 16.2922 4.78288C16.1046 4.59535 15.8503 4.48999 15.5851 4.48999V4.48999Z",
    fill: "#F5F8FF"
  }), React.createElement("path", {
    d: "M17.4899 4.50496H2.51494C2.24641 4.50496 1.98888 4.61163 1.799 4.80151C1.60912 4.99139 1.50244 5.24893 1.50244 5.51746C1.50244 5.78599 1.60912 6.04352 1.799 6.23341C1.98888 6.42329 2.24641 6.52996 2.51494 6.52996H17.4899C17.7585 6.52996 18.016 6.42329 18.2059 6.23341C18.3958 6.04352 18.5024 5.78599 18.5024 5.51746C18.5024 5.24893 18.3958 4.99139 18.2059 4.80151C18.016 4.61163 17.7585 4.50496 17.4899 4.50496V4.50496ZM12.5149 1.52496H7.58494C7.33518 1.54274 7.10144 1.65451 6.93079 1.83774C6.76013 2.02098 6.66525 2.26207 6.66525 2.51246C6.66525 2.76285 6.76013 3.00395 6.93079 3.18718C7.10144 3.37041 7.33518 3.48218 7.58494 3.49996H12.5099C12.6455 3.50961 12.7817 3.49124 12.9098 3.44599C13.038 3.40074 13.1555 3.32957 13.255 3.23693C13.3544 3.14429 13.4338 3.03215 13.488 2.90751C13.5423 2.78287 13.5703 2.64839 13.5703 2.51246C13.5703 2.37653 13.5423 2.24205 13.488 2.11741C13.4338 1.99277 13.3544 1.88064 13.255 1.78799C13.1555 1.69535 13.038 1.62419 12.9098 1.57893C12.7817 1.53368 12.6455 1.51531 12.5099 1.52496H12.5149Z",
    fill: "#F5F8FF"
  }), React.createElement("path", {
    d: "M8.56006 13.5C8.29525 13.4987 8.04166 13.3929 7.8544 13.2057C7.66715 13.0184 7.56137 12.7648 7.56006 12.5V9.5C7.56137 9.23519 7.66715 8.9816 7.8544 8.79435C8.04166 8.60709 8.29525 8.50131 8.56006 8.5C8.82487 8.50131 9.07846 8.60709 9.26571 8.79435C9.45297 8.9816 9.55874 9.23519 9.56006 9.5V12.5C9.55874 12.7648 9.45297 13.0184 9.26571 13.2057C9.07846 13.3929 8.82487 13.4987 8.56006 13.5V13.5ZM11.5601 13.5C11.2952 13.4987 11.0417 13.3929 10.8544 13.2057C10.6672 13.0184 10.5614 12.7648 10.5601 12.5V9.5C10.5614 9.23519 10.6672 8.9816 10.8544 8.79435C11.0417 8.60709 11.2952 8.50131 11.5601 8.5C11.8249 8.50131 12.0785 8.60709 12.2657 8.79435C12.453 8.9816 12.5587 9.23519 12.5601 9.5V12.5C12.5587 12.7648 12.453 13.0184 12.2657 13.2057C12.0785 13.3929 11.8249 13.4987 11.5601 13.5V13.5Z",
    fill: "#F5F8FF"
  })));
};

/**
 * Category component for grouping inputs.
 */

var VarGroup = function VarGroup(_ref) {
  var label = _ref.label,
      disabled = _ref.disabled,
      className = _ref.className,
      children = _ref.children,
      onDelete = _ref.onDelete;
  return React.createElement("div", null, React.createElement(VarBase, {
    label: label,
    disabled: disabled,
    className: className
  }, React.createElement("div", {
    className: "react-var-ui-group-wrapper"
  }, React.createElement("div", {
    className: "react-var-ui-group-wrapper-icon"
  }, React.createElement("div", {
    onClick: function onClick() {
      onDelete == null ? void 0 : onDelete();
    }
  }, React.createElement(IconDelete, null))))), !!children && React.createElement("div", {
    className: "react-var-ui-group"
  }, children));
};

/**
 * Group item component inside group.
 */

var VarGroupItem = function VarGroupItem(_ref) {
  var children = _ref.children;
  return React.createElement("div", {
    className: "react-var-ui-group-item"
  }, children);
};

/**
 * Category component for grouping inputs.
 */

var VarCategory = function VarCategory(_ref) {
  var label = _ref.label,
      className = _ref.className,
      showDash = _ref.showDash,
      children = _ref.children;
  return React.createElement("div", {
    className: 'react-var-ui-category ' + (className ? className : '')
  }, React.createElement("div", {
    className: 'react-var-ui-category-title ' + (showDash ? 'react-var-ui-category-title-dash' : '')
  }, label), !!children && React.createElement("div", null, children));
};

export { VarAdd, VarAngle, VarBase, VarButton, VarCategory, VarColor, VarDisplay, VarGroup, VarGroupItem, VarImage, VarNumber, VarSelect, VarSlider, VarString, VarToggle, VarUI, VarXY, useVarUIValue };
//# sourceMappingURL=react-var-ui.esm.js.map
