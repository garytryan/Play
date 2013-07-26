$(function(){
  $('#rect').on('click', function(){
    App.addShape.init('Rect', {
      top: 400, left: 400, height: 100, width: 100, stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)'
    });
  });
  $('#circ').on('click', function(){
    App.addShape.init('Circle', {
      top: 400, left: 400, radius: 50, stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)'
    });
  });
  $('#tri').on('click', function(){
    App.addShape.init('Triangle', {
      top: 400, left: 400, height: 100, width: 100,  stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)'
    });
  });
});