import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Panelish from './panelish'

Enzyme.configure({adapter: new Adapter()})

describe('Panelish', function() { // eslint-disable-line no-undef
    it('should emit a panel', function() { // eslint-disable-line no-undef
        let wrapper = mount(<Panelish />)
        expect(wrapper.find('Panel').text()).toContain("This here's a tune")
    })
})
