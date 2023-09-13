import Cookies from 'js-cookie';

export default class search {
  static engine = '';

  static do(val, params) {
    let result = '';
    this.engine = Cookies.get('engine');
    Object.keys(params).forEach((key) => {
      result += this[key](params[key]);
    });
    result += this.operate(val);
    return result;
  }

  static bing() {
    this.engine = 'bing';
    return '';
  }

  static baidu() {
    this.engine = 'baidu';
    return '';
  }

  static google() {
    this.engine = 'google';
    return '';
  }

  static operate(val) {
    const valid = ['bing', 'baidu', 'google'];
    let { engine } = this;
    let url = '';
    let res = '';
    if (engine === undefined) {
      engine = 'bing';
      res = '<div>未配置默认搜索引擎，可以通过sia set --engine value进行默认搜索引擎的设置。</div>';
    }
    if (valid.indexOf(engine) === -1) {
      res = ` <div>本地配置中engine参数不合法，其合法参数为bing,baidu,google</div>
              <div>当前参数为${engine}，默认使用bing</div>`;
    }
    switch (engine) {
      case 'baidu':
        url = `https://www.baidu.com/s?word=${val}`;
        break;
      case 'bing':
        url = `https://cn.bing.com/search?q=${val}`;
        break;
      case 'google':
        url = `https://www.google.com/search?q=${val}`;
        break;
      default:
        url = `https://cn.bing.com/search?q=${val}`;
    }
    window.open(url);
    return res;
  }
}
