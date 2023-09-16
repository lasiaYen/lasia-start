/* eslint-disable import/no-cycle */
import echo from './echo';
import list from './list';
import search from './search';
import conf from './conf';
import help from './help';

const Modules = {
  search,
  echo,
  conf,
  list,
  help,
};

export default Modules;
