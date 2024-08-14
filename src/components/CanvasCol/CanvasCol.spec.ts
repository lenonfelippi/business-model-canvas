import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
// @ts-ignore:next-line
import CanvasCol from './CanvasCol.vue'

describe('CanvasCol.vue', () => {
  it('should render the title correctly', () => {
    const wrapper = mount(CanvasCol, {
      props: {
        title: 'Título de Teste',
        addButton: vi.fn(),
        infoButton: vi.fn()
      }
    })

    expect(wrapper.find('h2').text()).toBe('Título de Teste')
  })

  it('should trigger the infoButton function when the info button is clicked', async () => {
    const infoButtonMock = vi.fn()
    const wrapper = mount(CanvasCol, {
      props: {
        title: 'Título de Teste',
        addButton: vi.fn(),
        infoButton: infoButtonMock
      }
    })

    await wrapper.find('button[type="button"]').trigger('click')
    expect(infoButtonMock).toHaveBeenCalledTimes(1)
  })

  it('should trigger the addButton function when the add button is clicked', async () => {
    const addButtonMock = vi.fn()
    const wrapper = mount(CanvasCol, {
      props: {
        title: 'Título de Teste',
        addButton: addButtonMock,
        infoButton: vi.fn()
      }
    })

    await wrapper.findAll('button[type="button"]')[1].trigger('click')
    expect(addButtonMock).toHaveBeenCalledTimes(1)
  })

  it('should render the slot content correctly', () => {
    const wrapper = mount(CanvasCol, {
      props: {
        title: 'Título de Teste',
        addButton: vi.fn(),
        infoButton: vi.fn()
      },
      slots: {
        default: '<div class="slot-content">Slot Content</div>'
      }
    })

    expect(wrapper.find('.slot-content').text()).toBe('Slot Content')
  })
})
