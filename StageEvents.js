// The stage is initiated

App.stage = {

  STAGE: new Kinetic.Stage({
            container: 'body',
            width: 600,
            height: 200,
            listening: true
        }),

  // Adds event listening to the stage
  on: function(event, handler){
    $(this.STAGE.getContent()).on(event, handler);
  },

  off: function(event, handler){
    $(this.STAGE.getContent()).off(event, handler);
  }

};
