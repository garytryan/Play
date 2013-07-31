define(['../kanvas/getProperties', '../models/app'],
  function(getProperties, app){
  return Backbone.View.extend({
    el: '#kanvas',

    attributes: {
      'height': '400px',
      'width' : '800px'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addKlass', 'updateKlass');
      this.kanvas = new fabric.Canvas(this.el);
      this.collection.on('add', this.addKlass);
      this.collection.on('change:currentFrame', this.updateKlass);
      this.collection.on('change', this.render);
      window.k = this.kanvas;
    },

    render: function(){
      this.kanvas.renderAll();
    },

    addKlass: function(klass){
      this.kanvas.add(new fabric[klass.get('type')](klass.attributes));
      klass.addKeyframe();
      console.log(klass);
    },

    updateKlass: function(currentFrame){
      var klass = this.kanvas.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.render();
    }

    // addKeyframe: function(klass){
    //   var currentFrame = this.collection.meta('currentFrame');
    //   var keyframes = klass.get('keyframes');
    //   keyframes[currentFrame] = 'hello';
    //   console.log(this.collection.models);
      // create a new keyframe
      // update the keyframe index array
    //   keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
    //   keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
    // }
  });

  //   var kanvas = new fabric.Canvas('kanvas');

  //   var keyframeHandler = function(options){
  //     var keyframes = options.target.keyframes;
  //     var currentFrame = app.currentFrame;
  //     // create a new keyframe
  //     keyframes[currentFrame] = getProperties(options.target);

  //     // update the keyframe index array
  //     keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
  //     keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
  //   };

  //   kanvas.on('object:modified', keyframeHandler);
  //   kanvas.on('object:added', keyframeHandler);
});