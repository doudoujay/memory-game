import BottomModule from './bottom';
import BottomController from './bottom.controller';
import BottomComponent from './bottom.component';
import BottomTemplate from './bottom.html';

describe('Bottom', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BottomModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BottomController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(BottomTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = BottomComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(BottomTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(BottomController);
    });
  });
});
