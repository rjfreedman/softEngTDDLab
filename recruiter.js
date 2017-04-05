//CODE MODIFIED BY: Riana Freedman

'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

//TODO: You need to write this function AND utilize it.
// bracketFromGPA(decimal GPA);
function bracketFromGPA(gpa) {
	// 4-3.5, 3.49 - 3.0, 2.99 - 2.5

	if(gpa <= 4.0 && gpa >=3.5)
	{
		return 3;
	}
	else if(gpa < 3.5 && gpa >= 3.0)
	{
		return 2;
	}
	else if(gpa < 3.0 && gpa >= 2.5)
	{
		return 1;
	}
	else //greater than 4.0 or less than 2.5
	{
		return 0;
	}

	//return; //some form of bracket number
}

// TODO: recruiter( Array of hireables )
function recruiter(internArr) {

	//Keep track of the hirable intern objects (containing their associated information)...
	var toConsider = [];

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort   --> ADD A LOOP

	//Process each intern object...
	for(var index = 0; index < internArr.length; index++)
	{
		//var index = 0; //only need this for handling a single intern object...
		var iname = internArr[index].name;
		var idegr = internArr[index].degree;
		var igpa = internArr[index].gpa;
		var iexp = internArr[index].experiance;
		var iwage, ivalue, ibracket, imetric;

		// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
		idegr = idegr.toLowerCase();
		iwage = degreeSWage[idegr];

		// You should use these functions at some point
		//Note: I have filled these in with the appropriate parameters here...
		ivalue = util.getValueFromWageAndExp( iwage, iexp /*wage, full years of experiance*/ );
		ibracket = bracketFromGPA ( igpa /*decimal GPA*/ );

		//////////////////////////////////////////////////////////////////////////////////////////

		//Handle astrology degree requirement...
		if(idegr === "astrology")
		{
			//interns with astrology degrees are hireable, yet should be the last in the list - the hirable interns are later sorted by imetric in descending order, so assign them the lowest possible metric
			imetric = 0;
		}
		else if(ibracket > 0 && degreeSWage.degreenames.includes(idegr))
		{
			//HIRABLE (considering the requirements)
			//handle requirement when consider sorting in descending order by imetric first involving value to company, then by GPA bracket...
			imetric = ivalue + ibracket;
		}
		else
		{
			//NOT hirable - "remove" this intern from the array and continue directly to processing the next potential intern...
			continue;
		}

		//////////////////////////////////////////////////////////////////////////////////////////

		// Hmm... this doesn't seem to follow the spec - fix it 		--> FIXED ABOVE...
		//imetric = ivalue + ibracket;

		// We really want to add our sorting number "metric" to objects (it really is this easy)
		internArr[index].metric = imetric;

		//If this intern is hirable, push the intern object (updated, such as with value of imetric) to the array of considerable interns (to be sorted later)...
		//Note that this point in the code will only be reached for the current intern if this intern is hirable...
		toConsider.push(internArr[index]);

	} //end loop

	// and then sort them all (it doesn't return anything, it modifies the array sent)
	util.sortInternObjects( toConsider /*Array of hireables with "metric" as a property*/ ); //send toConsider array, for which there is a metric property


	// Output
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.

	//return internArr;
	return toConsider; //return the array of hirable interns, in sorted order (ie.descending order of metric)
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
