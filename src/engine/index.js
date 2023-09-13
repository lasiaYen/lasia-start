import { echo, list, search } from '@/commands';

class Engine {
  static commands = {
    echo,
    list,
    search,
  };

  static syntaxTreeResolver(tree) {
    const { command, commandValue, params: raw } = tree;
    const params = {};
    Object.keys(raw).forEach((key) => {
      const tempKey = key.split('').slice(2).join('');
      params[tempKey] = raw[key];
    });
    const res = this.commands[command].do(commandValue, params);
    return res;
  }
}

export default Engine;
