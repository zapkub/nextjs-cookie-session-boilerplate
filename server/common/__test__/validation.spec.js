const { expect } = require('chai');

const helpers = require('../validations');

describe('Validation helpers', () => {
  it('ValidationEmail ต้องตรวจ email ถูกต้อง', () => {
    expect(helpers.ValidationEmail('rungsikorn@me.com')).to.be.true;
  });
  it('ValidationEmail ต้องตรวจ email ที่ผิด return เป็น false', () => {
    expect(helpers.ValidationEmail('rungsikornme.com')).to.be.false;
  });
  it('ValidationEmail ต้องตรวจ email ผิด @.com return เป็น false', () => {
    expect(helpers.ValidationEmail('rungsikorn@.com')).to.be.false;
  });
});
