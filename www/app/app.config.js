config = {
	section : {
		"PATCH" : 4,
		"PATTEREN" : 1,
		"COLOR" : 5,
		"SIZE" : 3,
		"ARTWORK" : 8,
		"MAINFRONTCENTER" : 9,
		"MAINBACKCENTER" : 10,
		"ELBOW-RIGHT" : 11,
		"ELBOW-LEFT" : 12

	},
	
	sectionImgs : {
		"PATCH":["assets/public/images/1.png", "assets/public/images/2.png", "assets/public/images/3.png", "assets/public/images/4.png"],
		"COLOR":[ "assets/public/images/dumpBlue.png", "assets/public/images/dumpLight.png", "assets/public/images/light.png", "assets/public/images/green.png", "assets/public/images/blue.png", "assets/public/images/black.png", "assets/public/images/dark.png", "assets/public/images/magenta.png" ],
		"PATTEREN":["assets/public/images/1.png", "assets/public/images/2.png", "assets/public/images/3.png", "assets/public/images/4.png", "assets/public/images/5.png", "assets/public/images/6.png", "assets/public/images/7.png", "assets/public/images/8.png", "assets/public/images/9.jpg", "assets/public/images/10.jpg", "assets/public/images/11.jpg"],
		"SIZE":[],
		"ARTWORK":["assets/public/images/1.png"]
	},
	productImages : [
		{
			"id":1,
			"imageURL":"./assets/public/images/product1.png"
		},
		{
			"id":2,
			"imageURL":"./assets/public/images/product2.png"
		}
	],
	viewAngle : {
		Front : "front",
		Back : 'back',
		SideLeft: 'sideleft',
		SideRight: 'sideright'		
	},

	conponentType: {
		"PATCH": "Patch",
		"PATTEREN": "Pattern",
		"COLOR": "Color",
		"SIZE": "Size",
		"ARTWORK": "ArtWork"
	},

	productImagePath : "./assets/public/images/product"
	
};