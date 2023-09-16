import Cookies from 'js-cookie';

export default class search {
  static engine = '';

  static params = ['--bing', '--baidu', '--google'];

  static describe = '搜索功能';

  static paramsInfo = [
    { name: 'sia search', info: '搜索功能，接受一个参数作为搜索关键字' },
    { name: '--bing', info: '指定使用 Bing 搜索，无视默认引擎设置' },
    { name: '--baidu', info: '指定使用 Baidu 搜索，无视默认引擎设置' },
    { name: '--google', info: '指定使用 Google 搜索，无视默认引擎设置' },
  ];

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
    let { engine } = this;
    let url = '';
    let res = '';
    if (engine === undefined) {
      engine = 'bing';
      res = `<div>未配置默认搜索引擎，可以通过
        sia conf --engine value进行默认搜索引擎的设置。</div>`;
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
