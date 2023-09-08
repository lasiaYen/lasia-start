export default class echo {
  static do(val, params) {
    let result = '';
    result += this.operate(val);
    Object.keys(params).forEach((key) => {
      result += this[key](params[key]);
    });
    console.log(result);
    return result;
  }

  static operate(val) {
    return `<div>${val}</div>`;
  }

  static time() {
    return `<div>${new Date()}</div>`;
  }
}
