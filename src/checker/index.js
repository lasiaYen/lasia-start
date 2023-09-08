// import Error from '@/error';

class Commands {
  static commandsList = ['echo'];

  static paramsList = {
    echo: ['--time', '--date', '--weather'],
  };

  static commandCheck(tree) {
    let result = '';
    let isCorrect = true;
    const { command, paramsArr } = tree;
    if (this.commandsList.indexOf(command) === -1) {
      result += `${command}不是一个合法指令，使用 sia list 指令查看所有指令`;
      return { result, isCorrect: false };
    }
    paramsArr.forEach((param) => {
      if (this.paramsList[command].indexOf(param) === -1) {
        console.log(param);
        result += `<div>${param} 参数非法</div>`;
        isCorrect = false;
      }
    });
    return { result, isCorrect };
  }
}

export default Commands;
