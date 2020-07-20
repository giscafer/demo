module.exports = function (plop) {
  plop.setActionType('doTheThing', function (answers, config, plop) {
    // do something
    // doSomething(config.configProp);
    // if something went wrong
    // throw 'error message';
    // otherwise
    return 'success status message';
  });

  // or do async things inside of an action
  plop.setActionType('doTheAsyncThing', function (answers, config, plop) {
    // do something
    return new Promise((resolve, reject) => {
      if (success) {
        resolve('success status message');
      } else {
        reject('error message');
      }
    });
  });
  // use the custom action
  plop.setGenerator('test', {
    prompts: [],
    actions: [
      {
        type: 'doTheThing',
        configProp: 'available from the config param',
      },
      {
        type: 'doTheAsyncThing',
        speed: 'slow',
      },
    ],
  });
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });
};
