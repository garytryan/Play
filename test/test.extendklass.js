if(typeof require !== 'undefined'){
  var expect = require('chai').expect;
}

describe('Extend Klass', function(){
  var rect;
  beforeEach(function(){
    rect = new fabric.Rect();
  });

  it('fabric klass should have an anim method', function(){
    expect(rect).to.have.property('anim');
  });

  it('anim should animate positive motion', function(){
    rect.keyframes = { 0: { top: 0, left: 0, visible: true }, 10: { top: 10, left: 10, visible: true }, index: [0,10] };
    expect(rect.get('top')).to.equal(0);
    expect(rect.get('left')).to.equal(0);
    rect.anim(5);
    expect(rect.get('top')).to.equal(5);
    expect(rect.get('left')).to.equal(5);
  });

  it('anim should animate negative motion', function(){
    rect.set({ top: 10, left: 10 });
    rect.keyframes = {0: { top: 10, left: 10, visible: true}, 10: {top: 0, left: 0, visible: true }, index: [0,10] };
    expect(rect.get('top')).to.equal(10);
    expect(rect.get('left')).to.equal(10);
    rect.anim(5);
    expect(rect.get('top')).to.equal(5);
    expect(rect.get('left')).to.equal(5);
  });

  it('anim should animate positive angular rotation', function(){
    rect.keyframes = { 0: { angle: 0, visible: true }, 10: { angle: 10, visible: true }, index: [0,10] };
    expect(rect.get('angle')).to.equal(0);
    rect.anim(5);
    expect(rect.get('angle')).to.equal(5);
  });

  it('anim should animate negative angular rotation', function(){
    rect.set({ angle: 10 });
    rect.keyframes = {0: { angle: 10, visible: true}, 10: {angle: 0, visible: true}, index: [0,10] };
    expect(rect.get('angle')).to.equal(0);
    rect.anim(5);
    expect(rect.get('angle')).to.equal(5);
  });

});