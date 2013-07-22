// This file handles all stage events

var stage = {

  STAGE: new Kinetic.Stage({
            container: 'body',
            width: 600,
            height: 200,
            listening: true
        }),

  on: function(event, callback){
    this.STAGE.getContent().addEventListener(event, callback);
  }
};
