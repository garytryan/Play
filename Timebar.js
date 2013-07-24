App.timebar = {
  second: 0
};

$(function(){
  $('#slide').on('change', function(){
    App.timebar.second = this.value;
  });
});