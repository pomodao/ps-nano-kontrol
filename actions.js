(function() {
  'use strict';

  function basicColorAction(target, min, max) {
    return {
      onChange: function(raw) {
        return raw / 127.0 * (max - min) + min;
      },
      onInterval: function(value) {
        return `${target} = ${value}`;
      }
    };
  }

  function brushSizeAction(min, max) {
    return {
      onChange: function(raw) {
        return (1 - Math.cos(raw / 127.0 * Math.PI / 2)) * (max - min) + min;
      },
      onInterval: function(value) {
        return (`
          var tid = function(cid) { return charIDToTypeID(cid); };
          var desc1 = new ActionDescriptor();
          var desc2 = new ActionDescriptor();
          var ref1 = new ActionReference();
          ref1.putEnumerated( tid('Brsh'), tid('Ordn'), tid('Trgt'));
          desc1.putReference( tid('null'), ref1 );
          desc2.putUnitDouble( stringIDToTypeID('masterDiameter'), tid('#Pxl'), ${value} );
          desc1.putObject( tid('T   '), tid('Brsh'), desc2 );
          executeAction( tid('setd'), desc1, DialogModes.NO );
        `);
      }
    };
  }

  function setToolAction(tool) {
    return {
      onChange: function(digital) {
        if (digital) {
          return (`
            var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putClass( app.stringIDToTypeID('${tool}') );
            desc.putReference( app.charIDToTypeID('null'), ref );
            executeAction( app.charIDToTypeID('slct'), desc, DialogModes.NO );
          `);
        }
        return null;
      },
      onInterval: null,
    };
  }

  var Actions = {};

  Actions.FGCOLOR_HSB_HUE        = basicColorAction('app.foregroundColor.hsb.hue', 0, 359.49);
  Actions.FGCOLOR_HSB_SATURATION = basicColorAction('app.foregroundColor.hsb.saturation', 0, 100.0);
  Actions.FGCOLOR_HSB_BRIGHTNESS = basicColorAction('app.foregroundColor.hsb.brightness', 0, 100.0);
  Actions.BGCOLOR_HSB_HUE        = basicColorAction('app.backgroundColor.hsb.hue', 0, 359.49);
  Actions.BGCOLOR_HSB_SATURATION = basicColorAction('app.backgroundColor.hsb.saturation', 0, 100.0);
  Actions.BGCOLOR_HSB_BRIGHTNESS = basicColorAction('app.backgroundColor.hsb.brightness', 0, 100.0);

  Actions.FGCOLOR_RGB_RED   = basicColorAction('app.foregroundColor.rgb.red', 0, 255);
  Actions.FGCOLOR_RGB_GREEN = basicColorAction('app.foregroundColor.rgb.green', 0, 255);
  Actions.FGCOLOR_RGB_BLUE  = basicColorAction('app.foregroundColor.rgb.blue', 0, 255);
  Actions.BGCOLOR_RGB_RED   = basicColorAction('app.backgroundColor.rgb.red', 0, 255);
  Actions.BGCOLOR_RGB_GREEN = basicColorAction('app.backgroundColor.rgb.green', 0, 255);
  Actions.BGCOLOR_RGB_BLUE  = basicColorAction('app.backgroundColor.rgb.blue', 0, 255);

  Actions.BRUSH_SIZE = brushSizeAction(1, 500);

  Actions.SET_TOOL_BRUSH  = setToolAction('paintbrushTool');
  Actions.SET_TOOL_ERASER = setToolAction('eraserTool');
  Actions.SET_TOOL_ROTATE = setToolAction('rotateTool');
  // moveTool
  // marqueeRectTool
  // marqueeEllipTool
  // marqueeSingleRowTool
  // marqueeSingleColumnTool
  // lassoTool
  // polySelTool
  // magneticLassoTool
  // quickSelectTool
  // magicWandTool
  // cropTool
  // sliceTool
  // sliceSelectTool
  // spotHealingBrushTool
  // magicStampTool
  // patchSelection
  // redEyeTool
  // paintbrushTool
  // pencilTool
  // colorReplacementBrushTool
  // cloneStampTool
  // patternStampTool
  // historyBrushTool
  // artBrushTool
  // eraserTool
  // backgroundEraserTool
  // magicEraserTool
  // gradientTool
  // bucketTool
  // blurTool
  // sharpenTool
  // smudgeTool
  // dodgeTool
  // burnInTool
  // saturationTool
  // penTool
  // freeformPenTool
  // addKnotTool
  // deleteKnotTool
  // convertKnotTool
  // typeCreateOrEditTool
  // typeVerticalCreateOrEditTool
  // typeCreateMaskTool
  // typeVerticalCreateMaskTool
  // pathComponentSelectTool
  // directSelectTool
  // rectangleTool
  // roundedRectangleTool
  // ellipseTool
  // polygonTool
  // lineTool
  // customShapeTool
  // textAnnotTool
  // soundAnnotTool
  // eyedropperTool
  // colorSamplerTool
  // rulerTool
  // handTool
  // zoomTool

  module.exports = Actions;
}());
