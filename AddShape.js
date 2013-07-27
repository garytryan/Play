App.addShape = {
  init: function(type, properties, keyFrames){
    properties = properties || this.defaultProp;
    App.canvas.add(App.addKeys(new fabric[type](properties)));
  }
};