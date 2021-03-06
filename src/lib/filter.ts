import type { ReactNode } from 'react';
import { Children } from 'react';

type FilterFunction = (child: ReactNode, index?: number, children?: ReactNode[]) => boolean;

const filter = (children: ReactNode, filterFn: FilterFunction): ReactNode[] => {
  return Children.toArray(children).filter(filterFn);
};

export default filter;
