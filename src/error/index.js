class Error {
  static headerErr(header) {
    return `${header}不是可执行命令类，请使用sia`;
  }

  static commandErr(cmd) {
    return `未识别的命令，${cmd}不是一条命令，使用 sia list 命令查看所有命令`;
  }

  static paramsErr(params, target) {
    let errMsg = '参数使用错误';
    params.array.forEach((param) => {
      errMsg += `${param},`;
    });
    errMsg += `并非属于${target}的参数，查看详细参数信息请使用 sia help 命令`;
    return errMsg;
  }
}

export default Error;
