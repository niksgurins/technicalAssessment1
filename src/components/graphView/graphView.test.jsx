import React from 'react';
import { shallow } from 'enzyme';
import GraphView from './graphView';
import dataFile from "../../data/newOrders.json"

let wrapped = shallow(<GraphView type="line" data={dataFile.orders} title="new orders" span="7" id="1"/>);
describe('customers.jsx test', () => {
    it('has a h3 with the value NEW ORDERS', () => {   
        expect(wrapped.find("div.view-headers h3").text()).toBe("NEW ORDERS");
    })
    it('has a h1 with the value 4345%', () => {   
        expect(wrapped.find("div.view-headers h1").text()).toBe("4345%");
    });
});