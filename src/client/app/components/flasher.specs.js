import React from 'react'
import { createStore } from 'redux'
import expect from 'expect'
import { mount } from 'enzyme'
import Flasher from './flasher'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sixapp from '../reducers'


Enzyme.configure({adapter: new Adapter()})

const store = createStore(sixapp)

describe('Flasher', function() {
    it('should emit a message', function() {
        let wrapper = mount(<Flasher message="Extra extra extra" store={store}/>)
        expect(wrapper.find('#flash-wrapper').length).toEqual(1)
    })
})
