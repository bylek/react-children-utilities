import { shallow } from 'enzyme';
import type { ReactElement, ReactNode } from 'react';
import React, { isValidElement } from 'react';
import filter from '../filter';

interface Props {
  children?: ReactNode;
}

describe('filter', () => {
  it('returns same children', () => {
    const Filtered = ({ children }: Readonly<Props>): ReactElement => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'div'),
        )}
      </div>
    );

    const wrapper = shallow(
      <Filtered>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Filtered>,
    );

    expect(wrapper.children()).toHaveLength(3);
  });

  it('returns only matching children', () => {
    const Filtered = ({ children }: Readonly<Props>): ReactElement => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'span'),
        )}
      </div>
    );

    const wrapper = shallow(
      <Filtered>
        <span>1</span>
        <strong>2</strong>
        <span>3</span>
      </Filtered>,
    );

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find('strong')).not.toExist();
    expect(wrapper.find('span')).toHaveLength(2);
  });

  it('does not filter nested elements', () => {
    const Filtered = ({ children }: Readonly<Props>): ReactElement => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'span'),
        )}
      </div>
    );

    const wrapper = shallow(
      <Filtered>
        <span>1</span>
        <span>
          <strong>2</strong>
        </span>
        <span>3</span>
      </Filtered>,
    );

    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find('strong')).toExist();
  });

  it('can handle empty children', () => {
    const Filtered = ({ children }: Readonly<Props>): ReactElement => (
      <div>
        {filter(children, (item: ReactNode) =>
          Boolean(isValidElement(item) && item.type === 'div'),
        )}
      </div>
    );

    const wrapper = shallow(<Filtered />);

    expect(wrapper.children()).toHaveLength(0);
  });
});
