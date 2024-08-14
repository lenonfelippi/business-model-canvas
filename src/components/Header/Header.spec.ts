import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
// @ts-ignore:next-line
import Header from './Header.vue'

describe('Header.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('contains the Contabilizei logo', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Contabilizei Logo 10 anos')
    expect(img.attributes('src')).toBe('/src/assets/logo-contabilizei-10-anos.svg')
    expect(img.attributes('width')).toBe('180')
    expect(img.attributes('height')).toBe('45')
  })

  it('has a RouterLink to the homepage', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/')
  })
})
