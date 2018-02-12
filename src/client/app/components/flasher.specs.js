import React from 'react' // eslint-disable-line no-unused-vars
import { createStore } from 'redux'
import expect from 'expect'
import { mount } from 'enzyme'
import Flasher from './flasher' // eslint-disable-line no-unused-vars
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sixapp from '../reducers'


Enzyme.configure({adapter: new Adapter()})

const store = createStore(sixapp)

describe('Flasher', function() { // eslint-disable-line no-undef
    it('should emit a message', function() { // eslint-disable-line no-undef
        let wrapper = mount(<Flasher message="Extra extra extra" store={store}/>)
        expect(wrapper.find('#flash-wrapper').length).toEqual(1)
    })
})
