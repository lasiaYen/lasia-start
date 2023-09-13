import Cookies from 'js-cookie';

export default class echo {
  static do(val, params) {
    let result = '';
    result += this.operate(val);
    Object.keys(params).forEach((key) => {
      result += this[key](params[key]);
    });
    return result;
  }

  static operate(val) {
    Cookies.remove('engine');
    console.log(Cookies.get('engine'));
    return `<div>${val}</div>`;
  }

  static time() {
    const date = new Date();
    return `<div>${date}</div>`;
  }

  static config(val) {
    const res = Cookies.get(val);
    if (res === undefined) {
      return `<div>${val}配置不存在</div>`;
    }
    return `<div>${val}=> ${res}</div>`;
  }
}
