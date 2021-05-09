import React from 'react';
import { shallow } from 'enzyme';
import GraphView from './graphView';
import dataFile from "../../data/newOrders.json"
import DCO from "../../data/dataCalculationObject";

let wrapped = shallow(<GraphView type="line" data={dataFile.orders} title="new orders" id="1"/>);
let total = DCO.sumTimespan(dataFile.orders, 7);
let percentageDiff = Math.round(DCO.getPercentageDiff(dataFile.orders, 7));
describe('customers.jsx test', () => {
    it('has a h3 with the value NEW ORDERS', () => {   
        expect(wrapped.find("div.view-headers h3").text()).toBe("NEW ORDERS");
    })
    it(`has a h1 with the value ${total}${percentageDiff}%`, () => {   
        expect(wrapped.find("div.view-headers h1").text()).toBe(`${total}${percentageDiff}%`);
    });
});