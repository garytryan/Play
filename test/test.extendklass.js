if(typeof require !== 'undefined'){
  var expect = require('chai').expect;
}

describe('Extend Klass', function(){
  var rect, circle, star;
  beforeEach(function(){
    rect   = new fabric.Rect();
    circle = new fabric.Circle();
    star   = new fabric.Star();
  });

  it('fabric klass should have an anim method', function(){
    expect(rect).to.have.property('anim');
  });

  describe('Translate', function(){
    it('should animate positive motion', function(){
      rect.keyframes = { 0: { top: 0, left: 0, visible: true }, 10: { top: 10, left: 10, visible: true }, index: [0,10] };
      expect(rect.get('top')).to.equal(0);
      expect(rect.get('left')).to.equal(0);
      rect.anim(5);
      expect(rect.get('top')).to.equal(5);
      expect(rect.get('left')).to.equal(5);
    });

    it('should animate negative motion', function(){
      rect.set({ top: 10, left: 10 });
      rect.keyframes = {0: { top: 10, left: 10, visible: true}, 10: {top: 0, left: 0, visible: true }, index: [0,10] };
      expect(rect.get('top')).to.equal(10);
      expect(rect.get('left')).to.equal(10);
      rect.anim(5);
      expect(rect.get('top')).to.equal(5);
      expect(rect.get('left')).to.equal(5);
    });
  });

  describe('Angle', function(){
    it('should animate positive rotation', function(){
      rect.keyframes = { 0: { angle: 0, visible: true }, 10: { angle: 10, visible: true }, index: [0,10] };
      expect(rect.get('angle')).to.equal(0);
      rect.anim(5);
      expect(rect.get('angle')).to.equal(5);
    });

    it('should animate negative rotation', function(){
      rect.set({ angle: 10 });
      rect.keyframes = {0: { angle: 10, visible: true}, 10: {angle: 0, visible: true}, index: [0,10] };
      expect(rect.get('angle')).to.equal(10);
      rect.anim(5);
      expect(rect.get('angle')).to.equal(5);
    });
  });

  describe('Dimensions', function(){
    it('anim should animate increase in height', function(){
      rect.set({ height: 100 });
      rect.keyframes = { 0: { height: 100, visible: true }, 10: { height: 200, visible: true }, index: [0,10] };
      expect(rect.get('height')).to.equal(100);
      rect.anim(5);
      expect(rect.get('height')).to.equal(150);
    });

    it('anim should animate decrease in height', function(){
      rect.set({ height: 200 });
      rect.keyframes = { 0: { height: 200, visible: true }, 10: { height: 100, visible: true }, index: [0,10] };
      expect(rect.get('height')).to.equal(200);
      rect.anim(5);
      expect(rect.get('height')).to.equal(150);
    });
    it('anim should animate increase in width', function(){
      rect.set({ width: 100 });
      rect.keyframes = { 0: { width: 100, visible: true }, 10: { width: 200, visible: true }, index: [0,10] };
      expect(rect.get('width')).to.equal(100);
      rect.anim(5);
      expect(rect.get('width')).to.equal(150);
    });

    it('anim should animate decrease in width', function(){
      rect.set({ width: 200 });
      rect.keyframes = { 0: { width: 200, visible: true }, 10: { width: 100, visible: true }, index: [0,10] };
      expect(rect.get('width')).to.equal(200);
      rect.anim(5);
      expect(rect.get('width')).to.equal(150);
    });
  });

  describe('Radius', function(){
    it('should animate increase in radius', function(){
      circle.set({ radius: 10 });
      circle.keyframes = { 0: { radius: 10, visible: true }, 10: { radius: 20, visible: true }, index: [0,10] };
      expect(circle.get('radius')).to.equal(10);
      circle.anim(5);
      expect(circle.get('radius')).to.equal(15);
    });

    it('should animate decrease in radius', function(){
      circle.set({ radius: 20 });
      circle.keyframes = {0: { radius: 20, visible: true}, 10: {radius: 10, visible: true}, index: [0,10] };
      expect(circle.get('radius')).to.equal(20);
      circle.anim(5);
      expect(circle.get('radius')).to.equal(15);
    });
  });

  describe('Color', function(){
    it('should animate tween fill color', function(){
      circle.set({ fill: 'rgb(100,100,100)' });
      circle.keyframes = { 0: { fill: 'rgb(100,100,100)', visible: true }, 10: { fill: 'rgb(200,200,200)', visible: true }, index: [0,10] };
      expect(new fabric.Color(circle.get('fill')).toRgb()).to.equal('rgb(100,100,100)');
      circle.anim(5);
      expect(new fabric.Color(circle.get('fill')).toRgb()).to.equal('rgb(150,150,150)');
    });
  });

  describe('Star', function(){
    describe('Inner Radius', function(){
      it('should animate increase in inner radius', function(){
        star.set({ innerRadius: 10 });
        star.keyframes = { 0: { innerRadius: 10, visible: true }, 10: { innerRadius: 20, visible: true }, index: [0,10] };
        expect(star.get('innerRadius')).to.equal(10);
        star.anim(5);
        expect(star.get('innerRadius')).to.equal(15);
      });

      it('should animate decrease in inner radius', function(){
        star.set({ innerRadius: 20 });
        star.keyframes = {0: { innerRadius: 20, visible: true}, 10: {innerRadius: 10, visible: true}, index: [0,10] };
        expect(star.get('innerRadius')).to.equal(20);
        star.anim(5);
        expect(star.get('innerRadius')).to.equal(15);
      });
    });

    describe('Outer Radius', function(){
      it('should animate increase in outer radius', function(){
        star.set({ outerRadius: 10 });
        star.keyframes = { 0: { outerRadius: 10, visible: true }, 10: { outerRadius: 20, visible: true }, index: [0,10] };
        expect(star.get('outerRadius')).to.equal(10);
        star.anim(5);
        expect(star.get('outerRadius')).to.equal(15);
      });

      it('should animate decrease in inner radius', function(){
        star.set({ outerRadius: 20 });
        star.keyframes = {0: { outerRadius: 20, visible: true}, 10: {outerRadius: 10, visible: true}, index: [0,10] };
        expect(star.get('outerRadius')).to.equal(20);
        star.anim(5);
        expect(star.get('outerRadius')).to.equal(15);
      });
    });

    describe('Points', function(){
      it('should animate number of points', function(){
        star.keyframes = { 0: { numPoints: 0, visible: true }, 10: { numPoints: 10, visible: true }, index: [0,10] };
        expect(star.get('numPoints')).to.equal(0);
        star.anim(5);
        expect(star.get('numPoints')).to.equal(5);
      });
    });
  });
});