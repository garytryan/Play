var expect = requre("chai").expect;
descibe('Array', function(){
  descibe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
    });
  });
});