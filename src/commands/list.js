export default class list {
  static do(val, params) {
    this.operate(val);
    Object.keys(params).forEach((key) => {
      console.log(key);
    });
  }

  static operate(val) {
    console.log(val);
  }
}
