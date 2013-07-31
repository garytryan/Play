define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return Backbone.Model.extend({
    defaults: {
      "left"      : 100,
      "top"       : 100,
      "fill"      : 'rgba(0,0,0,0.2)'
    },

    initialize: function(){
      switch(this.get('type')){
        case 'Rect' || 'Triangle':
          this.set({height: 100, width:100});
          break;
        case 'Circle':
          this.set({radius: 50});
      }
      this._keyframes = {0: {visible: false}, index:[0]};
    },

    addKeyframe: function(){
      this._keyframes[this.collection.meta('currentFrame')] = this.attributes;
    }
  });
});