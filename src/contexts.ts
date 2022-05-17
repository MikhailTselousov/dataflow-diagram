import React from "react";

import { PreBoundContextT } from "./types";

export const BoundContext = React.createContext<PreBoundContextT>({
  preBound: null,
  setPreBound: (id) => {},
});
