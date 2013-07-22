// The stage is initiated

App.stage = {

  STAGE: new Kinetic.Stage({
            container: 'body',
            width: 600,
            height: 200,
            listening: true
        }),

  // Adds event listening to the stage
  on: function(event, callback){
    this.STAGE.getContent().addEventListener(event, callback);
  }

};
