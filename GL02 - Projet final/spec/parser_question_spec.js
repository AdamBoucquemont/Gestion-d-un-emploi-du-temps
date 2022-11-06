describe("Program testing function of Question", function(){
	
	
	beforeAll(function() {
		const Question = require('../Question.js');
		this.q = new Question("MM", "test", "ter");

	});
	
	it("can create a new Question", function(){
		
		expect(this.q).toBeDefined();
		// toBe is === on simple values
		expect(this.q.type).toBe("MM");
		expect(this.q).toEqual(jasmine.objectContaining({type: "MM"}));
		
	});
	
	/*it("can add a new ranking", function(){
		
		this.p.addRating(2);
		expect(this.q.ratings).toEqual([1,3,2,2]);
		
	});
	
	it("can compute the average ranking", function(){
		expect(this.p.averageRatings()).toBe(2);
	});
	
	it("can track POI last updates date (DD/MM/YYYY)", function(){
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(2020, 11, 20));
		
		let currentDate = new Date();
		let currentDateString = currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear();
		let currentDateStringPlus2days = (currentDate.getDate() + 2) +"/"+currentDate.getMonth()+"/"+currentDate.getFullYear();
		
		let trackedPOI = new POI("Café d'Albert", 48.857735, 2.394987, []);
		
		
		expect(trackedPOI.lastUpdate).toBeDefined();
		expect(trackedPOI.lastUpdate).toBe(currentDateString);
		
		jasmine.clock().mockDate(new Date(2020, 11, 22));

		trackedPOI.addRating(2);
		expect(trackedPOI.lastUpdate).toBe(currentDateStringPlus2days);

		jasmine.clock().uninstall();
	});*/
	
});