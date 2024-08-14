import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
// @ts-ignore:next-line
import Note from './Note.vue'

describe('Note.vue', () => {
  it('should render the text correctly', () => {
    const wrapper = mount(Note, {
      props: {
        id: 1,
        text: 'Texto de Teste',
        color: 'rgb(255, 0, 0)',
        editButton: vi.fn()
      }
    })

    expect(wrapper.find('[data-testid="note-text"]').text()).toBe('Texto de Teste')
  })

  it('should apply the background color correctly', () => {
    const wrapper = mount(Note, {
      props: {
        id: 1,
        text: 'Texto de Teste',
        color: 'rgb(255, 0, 0)',
        editButton: vi.fn()
      }
    })

    const divElement = wrapper.find('div').element as HTMLElement
    expect(divElement.style.backgroundColor).toBe('rgb(255, 0, 0)')
  })

  it('should trigger the editButton function when clicking the edit button', async () => {
    const editButtonMock = vi.fn()
    const wrapper = mount(Note, {
      props: {
        id: 1,
        text: 'Texto de Teste',
        color: 'rgb(255, 0, 0)',
        editButton: editButtonMock
      }
    })

    await wrapper.find('button[type="button"]').trigger('click')
    expect(editButtonMock).toHaveBeenCalledTimes(1)
  })
})
