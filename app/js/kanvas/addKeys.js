define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return function(klass){
    var result = klass;
    result.keyframes = {0: {visible: false}, index:[0]};
    return result;
  };
});