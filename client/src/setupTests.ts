// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// import './__mocks__/yup'
import '../test/helpers/i18nTEST'
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key: string) {
      console.log('getItem ', key, store);
      // @ts-ignore
      return store[key];
    },
    setItem: function(key: string, value: any) {
      console.log('setItem ', key, value);
      // @ts-ignore
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string) {
      // @ts-ignore
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
