define(['./control'], function(controlTemplate){
  return function(controlList){
    result = '';
    if(controlList.fill){ result += controlTemplate(controlList.fill); }
    if(controlList.top){ result += controlTemplate(controlList.top); }
    if(controlList.left){ result += controlTemplate(controlList.left); }
    if(controlList.height){ result += controlTemplate(controlList.height); }
    if(controlList.width){ result += controlTemplate(controlList.width); }
    if(controlList.points){ result += controlTemplate(controlList.points); }
    if(controlList.innerRadius){ result += controlTemplate(controlList.innerRadius); }
    if(controlList.outerRadius){ result += controlTemplate(controlList.outerRadius); }
    if(controlList.radius){ result += controlTemplate(controlList.radius); }
    if(controlList.angle){ result += controlTemplate(controlList.angle); }
    return result;
  };
});