//CODE MODIFIED BY: Riana Freedman

'use strict';

var test = require('tape');
// Object containing the interns we want to evaluate
var potentialHires = require('./input/groupOne.json');
var interns = potentialHires.interns;

var recruiter = require('../recruiter.js');
var util = require('../util.js');

//Test for value to company requirement...
test('util.getValueFromWageAndExp', function(t) {
  t.ok(util.getValueFromWageAndExp(31, 1) > util.getValueFromWageAndExp(30, 1), 'factors in wage');

  if (util.getValueFromWageAndExp(30, 1) > util.getValueFromWageAndExp(30, 0)) {
  	t.pass('factors in experiance');
  } else {
  	t.fail('does not factor in experiance');
  }

  t.equal(util.getValueFromWageAndExp(34, 1.3), false,
  	"getValueFromWageAndExp catches a partial year input and returns false");

  t.end();
});

test('util.sortInternObjects', function(t) {
	var inputArr = [interns[0], interns[1], interns[2], interns[3]];
	inputArr[0].metric = 3;
	inputArr[1].metric = 1;
	inputArr[2].metric = 2;
	inputArr[3].metric = 0;

	// Lets get the input sorted manually, in the expected array
	var expectedArr = inputArr.slice();
	expectedArr = [
		expectedArr[0], // 3
		expectedArr[2], // 2
		expectedArr[1], // 1
		expectedArr[3]  // 0
	];

	// Lets make a copy of the input to sort with the function
	var actualArr = inputArr.slice();

	// Sort by reference (in-place)
	util.sortInternObjects(actualArr);

  t.deepEqual(actualArr, expectedArr, 'bascially sorts by metric');

  // Let's throw a wrench in it and change our metrics
  actualArr[0].metric = 0;
  inputArr[0].metric = 0;

  expectedArr = [
		inputArr[2], // 2
		inputArr[1], // 1
		inputArr[0], // 0
		inputArr[3]  // 0
	];

	util.sortInternObjects(actualArr);

	t.deepEqual(actualArr, expectedArr, 'preserves order of same-metric objects');

  t.end();
});

// Your tests go here  (methods reference: https://www.npmjs.com/package/tape#testname-opts-cb )

// test('Test Name', function(t) {

//   if (/*some condition*/) {
//   	t.pass('passes condition');
//   } else {
//   	t.fail('does not pass condition');
//   }

// and/or an actual comparison like t.equal();

//   t.end();
// });


//Test for GPA Bracket requirement...
test('bracketFromGPA', function(t) {
  t.deepEqual(recruiter.bracketFromGPA(3.5), 3, "returns bracket three");
  t.deepEqual(recruiter.bracketFromGPA(3.4), 2, "returns bracket two");
  t.deepEqual(recruiter.bracketFromGPA(2.99), 1, "returns bracket one");
  t.deepEqual(recruiter.bracketFromGPA(2.49), 0, "returns bracket zero (unhirable)");

  //end test
  t.end();
});


//Test for recruiter function requirements...
test('recruiter function TEST', function(t) {

  //Array of five potential hires (each of which is to be used for different tests, since function calls are non-blocking in JavaScript)...
  var inputArr = [interns[0], interns[1], interns[2], interns[3], interns[4], interns[5]];
  var test1Array = inputArr;
  var test2Array = inputArr;
  var test3Array = inputArr;
  var test4Array = inputArr;
  var test5Array = inputArr;
  var test6Array = inputArr;
  var test7Array = inputArr;
  var test8Array = inputArr;


  //----------------------------------------------------------------------------
  //  TEST 1
  console.log("-----------------------------------------------------------------------");
  console.log("SUB-TEST 1: CHECKING GPA and DEGREE CONSIDERATION FOR POTENTIAL HIRES");
  console.log("-----------------------------------------------------------------------");
  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them unhirable - then the returned array from the recruiter function should be empty...
  inputArr[0].gpa=2.4;
  inputArr[1].gpa=2.4;
  inputArr[2].gpa=2.4;
  inputArr[3].gpa=2.4;
  inputArr[4].gpa=2.4;
  inputArr[5].gpa=2.4;

  //Assign all interns a degree that is recognizable - then the returned array from the recruiter function should be decided entirely by GPA...
  inputArr[0].degree="computer science";
  inputArr[1].degree="bme";
  inputArr[2].degree="applied mathematics";
  inputArr[3].degree="manufacturing engineering technology";
  inputArr[4].degree="electronics engineering";
  inputArr[5].degree="real estate";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray = recruiter.recruiter(inputArr);

  t.deepEqual(potentialHiresArray.length, 0, "no potential hires due to GPA being less than 2.5 (since all degrees are recognizable)");

  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them hirable - then the returned array from the recruiter function should include all intern objects if degrees are all recognizable...
  test1Array[0].gpa=2.5;
  test1Array[1].gpa=2.5;
  test1Array[2].gpa=2.5;
  test1Array[3].gpa=2.5;
  test1Array[4].gpa=2.5;
  test1Array[5].gpa=2.5;

  //Assign all interns a degree that is recognizable - then the returned array from the recruiter function should include all intern objects if GPAs are all in accepted brackets...
  test1Array[0].degree="computer science";
  test1Array[1].degree="bme";
  test1Array[2].degree="applied mathematics";
  test1Array[3].degree="manufacturing engineering technology";
  test1Array[4].degree="electronics engineering";
  test1Array[5].degree="real estate";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray1 = recruiter.recruiter(test1Array);

  t.deepEqual(potentialHiresArray1.length, 6, "6 potential hires due to GPA being equal to 2.5 AND degree being recognizable)");

  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them hirable - then the returned array from the recruiter function should include all intern objects if degrees are all recognizable...
  test2Array[0].gpa=4.0;
  test2Array[1].gpa=4.0;
  test2Array[2].gpa=4.0;
  test2Array[3].gpa=4.0;
  test2Array[4].gpa=4.0;
  test2Array[5].gpa=4.0;

  //Assign all interns a degree that is recognizable - then the returned array from the recruiter function should include all intern objects if GPAs are all in accepted brackets...
  test2Array[0].degree="computer science";
  test2Array[1].degree="bme";
  test2Array[2].degree="applied mathematics";
  test2Array[3].degree="manufacturing engineering technology";
  test2Array[4].degree="electronics engineering";
  test2Array[5].degree="real estate";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray2 = recruiter.recruiter(test2Array);

  t.deepEqual(potentialHiresArray2.length, 6, "6 potential hires due to GPA being greater than 2.5 AND degree being recognizable)");

  //----------------------------------------------------------------------------

  //Assign 4 interns a GPA that makes them hirable - then the returned array from the recruiter function should include 4 of the intern objects (pending degree)...
  test3Array[0].gpa=4.0;
  test3Array[1].gpa=4.0;
  test3Array[2].gpa=4.0;
  test3Array[3].gpa=2.5;
  test3Array[4].gpa=0.0;
  test3Array[5].gpa=2.4;

  //Assign all interns a degree that is recognizable - then the returned array from the recruiter function should be decided by GPA...
  test3Array[0].degree="computer science";
  test3Array[1].degree="bme";
  test3Array[2].degree="applied mathematics";
  test3Array[3].degree="manufacturing engineering technology";
  test3Array[4].degree="electronics engineering";
  test3Array[5].degree="real estate";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray3 = recruiter.recruiter(test3Array);

  t.deepEqual(potentialHiresArray3.length, 4, "4 potential hires due to GPA being greater than or equal to 2.5 (since all degrees are recognizable)");

  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them hirable - then the returned array from the recruiter function should be decided by the degree...
  test4Array[0].gpa=4.0;
  test4Array[1].gpa=4.0;
  test4Array[2].gpa=4.0;
  test4Array[3].gpa=2.5;
  test4Array[4].gpa=2.5;
  test4Array[5].gpa=3.0;

  //Assign zero interns a degree that is recognizable - then the returned array from the recruiter function should be empty...
  test4Array[0].degree="N/A";
  test4Array[1].degree="hello world";
  test4Array[2].degree="sleeping";
  test4Array[3].degree="running";
  test4Array[4].degree="skipping class";
  test4Array[5].degree="fashion forecasting";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray4 = recruiter.recruiter(test4Array);

  t.deepEqual(potentialHiresArray4.length, 0, "no potential hires due to unrecognizable degrees (since all GPAs are >= 2.5)");

  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them hirable - then the returned array from the recruiter function should be decided by the degree...
  test5Array[0].gpa=4.0;
  test5Array[1].gpa=4.0;
  test5Array[2].gpa=4.0;
  test5Array[3].gpa=2.5;
  test5Array[4].gpa=2.5;
  test5Array[5].gpa=3.0;

  //Assign 3 interns a degree that is recognizable - then the returned array from the recruiter function should be three interns...
  test5Array[0].degree="electronics engineering";
  test5Array[1].degree="hello world";
  test5Array[2].degree="physics";
  test5Array[3].degree="running";
  test5Array[4].degree="skipping class";
  test5Array[5].degree="computing";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray5 = recruiter.recruiter(test5Array);

  t.deepEqual(potentialHiresArray5.length, 3, "3 potential hires due to recognizable degrees (since all GPAs are >= 2.5)");


  //----------------------------------------------------------------------------
  //  TEST 2
  console.log("-----------------------------------------------------------------------");
  console.log("SUB-TEST 2: CHECKING CONSIDERATION FOR POTENTIAL HIRES GIVEN ASTROLOGY DEGREE");
  console.log("-----------------------------------------------------------------------");
  //----------------------------------------------------------------------------


  //Assign all interns a GPA that makes them hirable EXCEPT the astrology degree candidate - then the returned array from the recruiter function should be decided by the degree...
  test6Array[0].gpa=4.0;
  test6Array[1].gpa=4.0;
  test6Array[2].gpa=4.0;
  test6Array[3].gpa=2.5;
  test6Array[4].gpa=2.5;
  test6Array[5].gpa=0.0;

  //Assign one intern (whose GPA is < 2.5) a degree that is astrology - then the returned array from the recruiter function should be one intern...
  test6Array[0].degree="a";
  test6Array[1].degree="b";
  test6Array[2].degree="c";
  test6Array[3].degree="d";
  test6Array[4].degree="e";
  test6Array[5].degree="astrology";

  var potentialHiresArray6 = recruiter.recruiter(test6Array);

  t.deepEqual(potentialHiresArray6.length, 1, "1 potential hire due to astrology degree despite 0.0 GPA (since all other GPAs are >= 2.5 and all other degrees are unrecognizable)");

  //----------------------------------------------------------------------------

  //Assign all interns a GPA that makes them hirable (where all have the same GPA)- then the returned array from the recruiter function should be decided by the degree...
  test7Array[0].gpa=4.0;
  test7Array[1].gpa=4.0;
  test7Array[2].gpa=4.0;
  test7Array[3].gpa=4.0;
  test7Array[4].gpa=4.0;
  test7Array[5].gpa=4.0;

  //Assign 4 interns a degree that is recognizable - then the returned array from the recruiter function should include four interns...
  test7Array[0].degree="a";
  test7Array[1].degree="astrology";
  test7Array[2].degree="c";
  test7Array[3].degree="astrology";
  test7Array[4].degree="computer science";
  test7Array[5].degree="cs";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray7 = recruiter.recruiter(test7Array);

  //For checking ordering of results...
  var error = false; //if true, indicates that there was a potential hire with a degree other than "astrology" placed as less valuable than an astrology candidate
  var currentIndex = -1; //indicate the index of the most recent astrology candidate (initialized to -1 to indicate none have been found yet)
  var correct = false; //if true, indicates that at least one astrology candidate exists and is/are the least valuable potential hire(s)

  //Check that, even though the interns with astrology degrees have the same gpa as the other degrees, they should be the last to be hired...
  for(var i = 0; i < potentialHiresArray7.length; i++)
  {
    if(potentialHiresArray7[i].degree === "astrology")
    {
      currentIndex = i;
    }

    //There is a problem if there is an intern with a degree other than astrology ordered AFTER an intern with a degree in astrology...
    if(currentIndex > -1 && potentialHiresArray7[i].degree !== "astrology")
    {
      error = true;
      break;
    }
  }

  //Indicate that the astrology candidate(s) were present and were the least valuable hires...
  if(error === false && currentIndex > -1)
  {
    correct = true;
  }

  t.deepEqual(error, false, "no error indicating astrology candidate(s) present yet not the least valuable hires");
  t.deepEqual(correct, true, "astrology candidate(s) present as the least valuable potential hires");


  //----------------------------------------------------------------------------
  //  TEST 3
  console.log("-----------------------------------------------------------------------");
  console.log("SUB-TEST 3: CHECKING OUTPUT AND ORDER OF OUTPUT FOR POTENTIAL HIRES");
  console.log("-----------------------------------------------------------------------");
  //----------------------------------------------------------------------------


  //Assign values such that the order of hirable interns should be 3,5,0,2...
  //Then verify by checking the output...
  test8Array[0].name="NAME0";
  test8Array[1].name="NAME1";
  test8Array[2].name="NAME2";
  test8Array[3].name="NAME3";
  test8Array[4].name="NAME4";
  test8Array[5].name="NAME5";

  test8Array[0].gpa=2.5; //third option - next highest gpa and same degree as others that are recognizable and not astrology...
  test8Array[1].gpa=2.4; //NOT AN OPTION - unhirable due to gpa being below 2.5 (even though the degree is recognizable)
  test8Array[2].gpa=4.0; //astrology - so last option (even though high gpa)
  test8Array[3].gpa=4.0; //first option - highest gpa and same degree as others that are recognizable and not astrology...
  test8Array[4].gpa=4.0; //NOT AN OPTION = unhirable due to unrecognizable degree
  test8Array[5].gpa=3.0; //second option - next highest gpa and same degree as others that are recognizable and not astrology...

  test8Array[0].degree="cs";
  test8Array[1].degree="cs";
  test8Array[2].degree="astrology";
  test8Array[3].degree="cs";
  test8Array[4].degree="z"; //unrecognizable degree --> UNHIRABLE
  test8Array[5].degree="cs";

  //run the recruiter function on the array now and test if the output is as expected
  var potentialHiresArray8 = recruiter.recruiter(test8Array);

  t.deepEqual(potentialHiresArray8.length, 4, "correct number of potential hires (4)");
  t.deepEqual(potentialHiresArray8[0].name, "NAME3", "potential hire 0 is in correct order");
  t.deepEqual(potentialHiresArray8[1].name, "NAME5", "potential hire 1 is in correct order");
  t.deepEqual(potentialHiresArray8[2].name, "NAME0", "potential hire 2 is in correct order");
  t.deepEqual(potentialHiresArray8[3].name, "NAME2", "potential hire 3 is in correct order");

  //end test
  t.end();
});
