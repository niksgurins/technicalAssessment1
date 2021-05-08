import React from 'react';
import { shallow } from 'enzyme';
import Customers from './customers';

let wrapped = shallow(<Customers></Customers>);
describe('customers.jsx test', () => {
    it('it has a div with text "Customer page"', () => {   
        expect(wrapped.text()).toBe("Customers page");
    });
});