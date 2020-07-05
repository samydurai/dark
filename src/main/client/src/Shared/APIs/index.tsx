import {
  loadWatchList,
  addToWatchList,
  removeFromWatchList,
} from "./WatchList";

import {
  loadIgnoreList,
  addToIgnoreList,
  removeFromIgnoreList,
} from "./IgnoreList";

export const watchList = {
  load: loadWatchList,
  add: addToWatchList,
  delete: removeFromWatchList,
};

export const ignoreList = {
  load: loadIgnoreList,
  add: addToIgnoreList,
  delete: removeFromIgnoreList,
};
