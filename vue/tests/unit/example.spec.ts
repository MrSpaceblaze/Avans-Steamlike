import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import GameDetail from '@/components/GameDetail.vue';

describe('GameDetail.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'name';
    const wrapper = mount(GameDetail);
    wrapper.setData({game:msg})
    console.log("wraper = "+wrapper.element.outerHTML)
    expect(wrapper.text()).to.include(msg);
  });
});
