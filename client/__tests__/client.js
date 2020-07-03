import React from 'react';
import enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../src/App';

enzyme.configure({ adapter: new Adapter() });

/**
 * Helper function to maintain DRY principle while searching for components with data-test attribute
 * @param {ReactWrapper} comp wrapper component to search for data-test attribute within
 * @param {string} searchTerm term to search for within a data-test attribute
 */
function find(comp, searchTerm) {
  return comp.find(`[data-test="${searchTerm}"]`);
}

describe('home page', () => {
  const wrapper = mount(<App />);

  it('renders home component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('has a welcome message', () => {
    const welcomeMessage = find(wrapper, 'welcome-message');
    expect(welcomeMessage.length).toBe(1);
    expect(welcomeMessage.text()).toBe('Welcome to Re(act)-Mail!');
  });

  describe('has a register form', () => {
    const registerForm = find(wrapper, 'register-form');
    const registerFormChildren = registerForm.children();

    it('has a register form', () => {
      expect(registerForm.length).toBe(1);
      expect(registerFormChildren.length).toBe(7);
    });

    it('has a username field', () => {
      const usernameField = find(registerForm, 'username');
      expect(usernameField.length).toBe(1);
    });

    it('has a password field', () => {
      const passwordField = find(registerForm, 'password');
      expect(passwordField.length).toBe(1);
    });

    it('has a confirm password field', () => {
      const confirmPasswordField = find(registerForm, 'confirm-password');
      expect(confirmPasswordField.length).toBe(1);
    });

    it('has a register submit button', () => {
      const registerButton = find(registerForm, 'register-submit');
      expect(registerButton.length).toBe(1);
    });
  });

  describe('login form', () => {
    const loginForm = find(wrapper, 'login-form');
    const loginFormChildren = loginForm.children();

    it('has a login form', () => {
      expect(loginForm.length).toBe(1);
      expect(loginFormChildren.length).toBe(5);
    });

    it('has a username field', () => {
      const usernameField = find(loginForm, 'username');
      expect(usernameField.length).toBe(1);
    });

    it('has a password field', () => {
      const passwordField = find(loginForm, 'password');
      expect(passwordField.length).toBe(1);
    });

    it('has a login submit button', () => {
      const loginButton = find(loginForm, 'login-submit');
      expect(loginButton.length).toBe(1);
    });
  });
});
