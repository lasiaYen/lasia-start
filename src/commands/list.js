// eslint-disable-next-line import/no-cycle
import Modules from './index';

export default class list {
  static params = [];

  static describe = '显示所有可用命令';

  static paramsInfo = [{ name: 'sia list', info: '展示所有可用命令，不接收值' }];

  static do(val, params) {
    let result = '';
    result += this.operate(val);
    Object.keys(params).forEach((key) => {
      result += this[key](params[key]);
    });
    return result;
  }

  static operate() {
    let res = '';
    Object.keys(Modules).forEach((key) => {
      res += `<div>
                <div style="display:inline-block;width:60px">${key}</div>
                <div style="display:inline-block;margin-right:20px">-------------------></div>
                <div style="display:inline-block">${Modules[key].describe}</div>
              </div>
            `;
    });
    return res;
  }
}
