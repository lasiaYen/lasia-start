import Cookies from 'js-cookie';

export default class echo {
  static params = ['--time', '--config'];

  static do(val, params) {
    let result = '';
    result += this.operate(val);
    Object.keys(params).forEach((key) => {
      result += this[key](params[key]);
    });
    return result;
  }

  static operate(val) {
    return `<div>${val}</div>`;
  }

  static time() {
    const date = new Date();
    return `<div>${date}</div>`;
  }

  static config(val) {
    if (val === '') {
      return "<div class='error'>--config 参数需要一个值</div>";
    }
    const res = Cookies.get(val);
    if (res === undefined) {
      return `<div class='warning'>${val}配置不存在</div>`;
    }
    return `<div>${val}=> ${res}</div>`;
  }
}
