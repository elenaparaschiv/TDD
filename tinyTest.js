// -Joe Walnes
// MIT License. See https://github.com/joewalnes/jstinytest/


var TinyTestHelper = {
  renderStats: function(tests, failures){
    var numberOfTests = Object.keys(tests).length;
    var successes = numberOfTests - failures;

    var summaryString = "Ran " +  numberOfTests + " tests: "
                        + successes + " successes, "
                        + failures + " failures";

    var summaryElement = document.createElement('h1');
    summaryElement.textContent = summaryString;
    document.body.appendChild(summaryElement);
  }
}

var TinyTest = {

  run:function(tests){
    var failures = 0;
    for(testName in tests){
      var testAction = tests[testName];
      try{
        testAction.apply(this);
        console.log('%c' + testName , "color:green"); // added + sign instead of commas because color has to be 2nd arg
      }catch(e){
        failures++;
        console.groupCollapsed('%c' + testName, "color:red");
        console.error(e.stack);
        console.groupEnd();
      }
    }
    // runing the code inside setTimeout ensures the code in this function is run after The Dom has been updated
    setTimeout(function(){
      if(window.document && document.body){
        document.body.style.backgroundColor = (failures == 0 ? "green" : "red");
        TinyTestHelper.renderStats(tests, failures);
      }
    }, 0);

  },

  fail: function(msg){
    //throws an error
    throw new Error('fail():' + msg);
  },
  assert: function(value, msg){
    // check if the value is true/ if not throw msg
    if(!value){
      throw new Error('assert' + msg);
    }
  },
  assertStrictEquals: function(expected, actual){
    if(expected !== actual){
      throw new Error('assertEquals()' + expected + "!==" + actual);
    }

  }
};

var fail                  = TinyTest.fail.bind(TinyTest),
    assert                = TinyTest.assert.bind(TinyTest),
    assertStrictEquals    = TinyTest.assertStrictEquals.bind(TinyTest),
    eq                    = TinyTest.assertStrictEquals.bind(TinyTest),
    tests                 = TinyTest.run.bind(TinyTest);
