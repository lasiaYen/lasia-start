import Modules from '@/commands';

class Engine {
  static syntaxTreeResolver(tree) {
    const { command, commandValue, params: raw } = tree;
    const params = {};
    Object.keys(raw).forEach((key) => {
      const tempKey = key.split('').slice(2).join('');
      params[tempKey] = raw[key];
    });
    const res = Modules[command].do(commandValue, params);
    return res;
  }
}

export default Engine;
