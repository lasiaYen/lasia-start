// eslint-disable-next-line import/no-cycle
import Modules from './index';

export default class help {
  static params = [];

  static describe = '显示指定命令的使用方法';

  static paramsInfo = [
    { name: 'sia help', info: '接收一个值，不能为空，用于显示该命令的使用方法' },
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
    if (val === '') {
      return "<div class='error'>此命令必须要求一个值</div>";
    }
    if (Object.keys(Modules).indexOf(val) === -1) {
      return `<div class='error'>没有 ${val} 指令</div>`;
    }
    let res = '';
    Modules[val].paramsInfo.forEach((item) => {
      res += `<div>
      <div style="display:inline-block;width:120px">${item.name}</div>
      <div style="display:inline-block">${item.info}</div>
    </div>`;
    });
    return res;
  }
}
