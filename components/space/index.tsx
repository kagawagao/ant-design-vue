import { inject, defineComponent, App } from 'vue';
import { initDefaultProps } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import { filterEmpty } from '../_util/props-util';
import { ConfigConsumerProps } from '../config-provider';

export const SpaceProps = {
  prefixCls: PropTypes.string,
  align: PropTypes.tuple<'start' | 'end' | 'center' | 'baseline'>(),
  size: PropTypes.tuple<'small' | 'middle' | 'large'>(),
  direction: PropTypes.tuple<'horizontal' | 'vertical'>(),
};

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const Space = defineComponent({
  name: 'ASpace',
  props: initDefaultProps(SpaceProps, {
    align: 'start',
    size: 'small',
    direction: 'horizontal',
  }),
  setup(props, { slots }) {
    const configProvider = inject('configProvider', ConfigConsumerProps);
    const { align, size, direction, prefixCls: customizePrefixCls } = props;

    const { getPrefixCls } = configProvider;
    const prefixCls = getPrefixCls('space', customizePrefixCls);
    const items = filterEmpty(slots.default?.());
    const len = items.length;

    if (len === 0) {
      return null;
    }

    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;

    const someSpaceClass = {
      [prefixCls]: true,
      [`${prefixCls}-${direction}`]: true,
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    };

    const itemClassName = `${prefixCls}-item`;
    const marginDirection = 'marginRight'; // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

    return () => (
      <div class={someSpaceClass}>
        {items.map((child, i) => (
          <div
            class={itemClassName}
            key={`${itemClassName}-${i}`}
            style={
              i === len - 1
                ? {}
                : {
                    [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                      typeof size === 'string' ? `${spaceSize[size]}px` : `${size}px`,
                  }
            }
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
});

/* istanbul ignore next */
Space.install = function(app: App) {
  app.component(Space.name, Space);
};

export default Space;
