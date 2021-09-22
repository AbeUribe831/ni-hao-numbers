/**
 * @jest-environment jsdom
 */
import React from 'react';
import Resources from '../components/Resources';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

describe('rendering components ', () => {
    test('rendering Resouces', () => {
        shallow(
            <Resources
                isMobile={true} />
        );
    });
});

describe('rendering snapshots', () => {
    test('Resources when isMobile is true', () => {
        const wrapper = shallow(
            <Resources
                isMobile={true}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
test('Resources when isMobile is false', () => {
        const wrapper = shallow(
            <Resources
                isMobile={false}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});