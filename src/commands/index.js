import echo from './echo';
// eslint-disable-next-line import/no-cycle
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
