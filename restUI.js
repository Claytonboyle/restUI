// restUI.js

var app = angular.module("restUI",[]);



app.factory('restaurantFactory',[function(){
		

		var Ingredient = function (name, calories, vegan, glutenFree, citrusFree){
			this.name = name;
			this.calories = calories;
			this.vegan = vegan || false;
			this.glutenFree = glutenFree || false;
			this.citrusFree = citrusFree || false;
		}

		Ingredient.prototype.stringify = function (){
			return (this.name+ " has "+this.calories+" calories. It is vegan: "+this.vegan+". It is glutenFree: "+this.glutenFree+". It is citrus free: "+this.citrusFree+".");
		}


		//------------------------------------------------------------------------


		var Drink = function (name,description,price,ingredientsArray){
			this.name = name;
			this.description = description;
			this.price = price;
			this.ingredientsArray = ingredientsArray;

			this.ingredientsNameArray = _.map(this.ingredientsArray, function(element){

				return element.name;
			})

		}

		Drink.prototype.isCitrusFreeCheck = function(){
			
			for (var i=0;i<this.ingredientsArray.length;i++){
				if (this.ingredientsArray[i].citrusFree == false)
					return false;
			}
			return true;
		}



		Drink.prototype.stringify = function(){
			return (this.name+" is a drink for $"+this.price+". It consists of: "+this.ingredientsNameArray.join(", ")+". "+this.description);
		}

		//----------------------------------------------------------------------------------------------

		var Plate = function (name,description,price,ingredientsArray){
			this.name = name;
			this.description = description;
			this.price = price;
			this.ingredientsArray = ingredientsArray;

			// this.ingredientsNameArray = ingredientsArray.map(function(element){
			// 	return element.name;
			// }); just for giggles

			this.ingredientsNameArray = _.map(this.ingredientsArray, function(element){

				return element.name;
			})


		}

		Plate.prototype.stringify = function(){
			return (this.name+" is a dish for $"+this.price+". It consists of: "+this.ingredientsNameArray.join(", ")+". "+this.description);
		}

		//edit these functions to check the ingredients array rather that a property on the plate itself

		Plate.prototype.isVeganCheck = function(){
			
			for (var i=0;i<this.ingredientsArray.length;i++){
				if (this.ingredientsArray[i].vegan == false)
					return false;
			}
			return true;
		}

		Plate.prototype.isGlutenFreeCheck = function(){
			
			for (var i=0;i<this.ingredientsArray.length;i++){
				if (this.ingredientsArray[i].glutenFree == false)
					return false;
			}
			return true;
		}

		Plate.prototype.isCitrusFreeCheck = function(){
			
			for (var i=0;i<this.ingredientsArray.length;i++){
				if (this.ingredientsArray[i].citrusFree == false)
					return false;
			}
			return true;
		}

		//----------------------------------------------------------------------------------------------

		var Order = function (orderArray){
			this.orderArray = orderArray;
		}

		Order.prototype.stringify = function (){
			return ( _.map(this.orderArray, function(plate){
				return plate.stringify();
			} ).join(" \n\n"));	
		}

		//----------------------------------------------------------------------------------------------

		var Menu = function (menuArray){
			this.menuArray = menuArray;
		}

		Menu.prototype.stringify = function (){
			return ( _.map(this.menuArray, function(plate){
				return plate.stringify();
			} ).join(" \n\n"));	
		}

		//----------------------------------------------------------------------------------------------

		var Restaurant = function (name, description, foodMenu, drinkMenu ){
			this.name = name;
			this.description = description;
			this.foodMenu = foodMenu;
			this.drinkMenu = drinkMenu;
		}

		Restaurant.prototype.stringify = function(){
			return ("The joint is called '"+this.name+"'.\nDescription: \n"+this.description+" \n\nHeres's the food menu:\n"+this.foodMenu.stringify()+"\n\nHere's the drink menu:\n"+this.drinkMenu.stringify());
		};

		//----------------------------------------------------------------------------------------------

		var Customer = function (name,vegan,glutenFree,citrusFree){
			this.name = name;
			this.vegan = vegan || false;
			this.glutenFree = glutenFree || false;
			this.citrusFree = citrusFree || false;
		}

		Customer.prototype.stringify = function(){
			return (this.name + " has this dietary preference: "+ this.preference);
		}

		//----------------------------------------------------------------------------------------------

		var whiteBread = new Ingredient ("White Bread",2000,true,false,true);
		var wheatBread = new Ingredient ("Wheat Bread",1000,true,false,true);
		var turkey = new Ingredient ("Turkey",200,false,true,true);
		var tuna = new Ingredient ("Tuna",300,false,true,true);
		var ham = new Ingredient ("Ham",300,false,true,true);
		var veggieMash = new Ingredient ("Veggie Smash", 4, true,true,true);
		var cheese = new Ingredient ("Cheese Product", 2200,false,true,true);
		var mayo = new Ingredient ("Mayonaise", 500,false,true,true);

		var gin = new Ingredient ("Gin",350,true,true,true);
		var whiskey = new Ingredient ("Whiskey",350,true,true,true);
		var vodka = new Ingredient ("Vodka",100,true,true,true);
		var tonic = new Ingredient ("Tonic",100,true,true,true);
		var coke = new Ingredient ("Coke",500,true,true,true);
		var lime = new Ingredient ("Lime Wedge", 50, true, true, false);


		var ginTonic = new Drink("Gin and Tonic","Description: Classic gin and tonic.",5.50,[gin,tonic,lime]);
		var vodkaTonic = new Drink("Vodka and Tonic","Description: Simple Vodka soda.",5.50,[vodka,tonic,lime]);
		var whiskeyCoke = new Drink ("Whiskey and Coke","Description: Early Times Whiskey and Diet Pepsi.",22.50,[whiskey,coke]);

		var hamSammy = new Plate ("Ham Sandwich","Description: Swine slices on white bread, with cheese and mayonaise.",14.50,[whiteBread,ham,cheese,mayo]);
		var tunaSammy = new Plate ("Tuna Sandwich","Description: Pulverized ocean pigeon on wheat bread, with no cheese and extra mayonaise.",14.50,[wheatBread,tuna,mayo]);
		var turkeySammy = new Plate ("Bird Sandwich","Description: Winged land racoon nestled between two slices of cheese, with mayonaise.",14.50,[turkey,cheese,mayo]);
		var veggieSammy = new Plate ("Veggie Sandwich","Description: Veggie surprise, on white bread without cheese or mayo. Garnished with a lime.",14.50,[whiteBread,veggieMash, lime]);


		var foodMenu = new Menu([hamSammy,tunaSammy,turkeySammy,veggieSammy]);
		var drinkMenu = new Menu([ginTonic,vodkaTonic,whiskeyCoke]);
		var myOrder = new Order([]);

		var myRestaurant = new Restaurant("The Clam Shack","Upscale and exclusive destination for the rich and famous.",foodMenu,drinkMenu);
		
		var frank = new Customer("FRANK",false,true,false);

		return {
			restaurant:myRestaurant,
			customer:frank,
			order:myOrder
		}



}]);




app.controller('appController',['$scope', 'restaurantFactory',function($scope,restaurantFactory){

		var s=$scope;

		s.trueValue = false; //compatible with customer

		s.myRestaurant=restaurantFactory.restaurant;
		s.myCustomer = restaurantFactory.customer;
		s.myOrder = restaurantFactory.order;
		s.runningTotal = 0;
		s.runningTotal = (Math.round(s.runningTotal*10))/10;

		console.log(s.myOrder);

		console.log(s.myRestaurant);
		console.log(s.myRestaurant.foodMenu.menuArray[0].stringify());
		console.log(s.myRestaurant.drinkMenu.menuArray[0].stringify());

		console.log("Vegan veggie?: "+s.myRestaurant.foodMenu.menuArray[3].isVeganCheck());
		console.log("Gluten Free veggie?: "+s.myRestaurant.foodMenu.menuArray[3].isGlutenFreeCheck());
		console.log("Gluten Free turkey?: "+s.myRestaurant.foodMenu.menuArray[2].isGlutenFreeCheck());

		console.log("Vegan ham?: "+s.myRestaurant.foodMenu.menuArray[0].isVeganCheck());



		s.menuDrinkClick = function(drink){

			s.myOrder.orderArray.push(angular.copy(drink));
			s.runningTotal +=drink.price;
			s.runningTotal = (Math.round(s.runningTotal*100))/100;
		}

		s.menuPlateClick = function(plate){
			//push it to the order
			s.myOrder.orderArray.push(angular.copy(plate));
			s.runningTotal += plate.price;
			s.runningTotal = (Math.round(s.runningTotal*100))/100;
		}




		//------------------------

		s.removeItem = function($index,item){

			s.myOrder.orderArray.splice($index,1);
			s.runningTotal -= item.price;
			s.runningTotal = (Math.round(s.runningTotal*100))/100;
			
		}

}]);


























