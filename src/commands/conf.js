import Cookies from 'js-cookie';
import store from '@/store';

export default class conf {
  static params = ['--user', '--engine', '--location', '--del', '--clear'];

  static describe = '';

  static confInfo = [
    { name: '--user', info: '用户名' },
    { name: '--engine', info: '默认搜索引擎' },
    { name: '--location', info: '所处城市' },
  ];

  static do(val, params) {
    let res = '';
    res += this.operate(val, params);
    Object.keys(params).forEach((key) => {
      res += this[key](params[key]);
    });
    return res;
  }

  static operate(val, params) {
    console.log(params);
    if (Object.keys(params).length === 0) {
      let res = '';
      this.confInfo.forEach((item) => {
        const data = Cookies.get(item.name.slice(2));
        res += `
        <div>
          <div style="display:inline-block;width:140px">${item.name}</div>
          <div style="display:inline-block;width:180px">${item.info}</div>
          <span>${data}</span>
        </div>`;
      });
      return res;
    }
    return '';
  }

  static user(val) {
    if (val.length > 10) {
      return "<div class='error'>用户名长度不能超过十位</div>";
    }
    Cookies.set('user', val);
    store.commit('setName', Cookies.get('user'));
    return '';
  }

  static engine(val) {
    const engineList = ['bing', 'baidu', 'google'];
    if (engineList.indexOf(val) === -1) {
      return `<div class="error">--engine 参数只能接受 ${engineList.join(', ')} 之一的值。
      若此项未配置则默认使用Bing</div>`;
    }
    Cookies.set('engine', val);
    return '';
  }

  static location(val) {
    Cookies.set('location', val);
    return '';
  }

  static del(val) {
    let isExist = false;
    this.confInfo.forEach((item) => {
      if (item.name.slice(2) === val) {
        isExist = true;
      }
    });
    if (isExist) {
      Cookies.remove(val);
      if (val === 'user') {
        this.user(undefined);
      }
      return `<div class="success">--${val}配置删除成功</div>`;
    }
    return `<div class="warning">--${val}配置不存在</div>`;
  }

  static clear() {
    this.confInfo.forEach((item) => {
      Cookies.remove(item.name.slice(2));
    });
    this.user(undefined);
    return '<div class="success">配置已全部清空</div>';
  }
}
