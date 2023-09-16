import Modules from '@/commands';

class Checker {
  static commandCheck(tree) {
    let result = '';
    let isCorrect = true;
    const { command, paramsArr } = tree;
    if (Object.keys(Modules).indexOf(command) === -1) {
      result += `<div class='error'>${command} 不是一个合法指令，使用 sia list 指令查看所有指令</div>`;
      return { result, isCorrect: false };
    }
    console.log(Object.keys(Modules), Modules[command]);
    paramsArr.forEach((param) => {
      if (Modules[command].params.indexOf(param) === -1) {
        result += `<div class='error'>${param} 参数非法</div>`;
        isCorrect = false;
      }
    });
    return { result, isCorrect };
  }
}

export default Checker;
