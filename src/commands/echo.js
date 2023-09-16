import Cookies from 'js-cookie';

export default class echo {
  static params = ['--time', '--conf'];

  static describe = '用于输出特定信息';

  static paramsInfo = [
    { name: 'sia echo', info: '接收一个值，并将其输出' },
    { name: '--time', info: '输出当前时间，不接收值' },
    { name: '--conf', info: '输出某一项Conf,接受一个值用于描述 Conf 的 key' },
  ];

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

  static conf(val) {
    if (val === '') {
      return "<div class='error'>--config 参数需要一个值</div>";
    }
    const res = Cookies.get(val);
    if (res === undefined) {
      return `<div class='warning'>${val}配置不存在</div>`;
    }
    return `<div>${val} ------> ${res}</div>`;
  }
}
