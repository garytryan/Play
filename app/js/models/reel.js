define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.Model.extend({
    initialize: function(){
      this.set({ 'frameNumber': 0 });
      this.on('change:frameNumber', function(e){ console.log(this.get('frameNumber')); });
    }
  });
});