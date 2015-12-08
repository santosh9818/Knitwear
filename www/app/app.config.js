config = {
	section : {
		"PATCH" : 4,
		"PATTEREN" : 1,
		"COLOR" : 5,
		"SIZE" : 3,
		"ARTWORK" : 8,
		"MAINFRONTCENTER" : 9,
		"MAINBACKCENTER" : 10,
		"ELBOWRIGHT" : 11,
		"ELBOWLEFT" : 12,
		"CUSTOUMIMAGE":13,
		"CUSTOUMTEXT":14

	},
	
	sectionImgs : {
		"PATCH":["assets/public/images/1.png", "assets/public/images/2.png", "assets/public/images/3.png", "assets/public/images/4.png"],
		"COLOR":[ "assets/public/images/dumpBlue.png", "assets/public/images/dumpLight.png", "assets/public/images/light.png", "assets/public/images/green.png", "assets/public/images/blue.png", "assets/public/images/black.png", "assets/public/images/dark.png", "assets/public/images/magenta.png" ],
		"PATTEREN":["assets/public/images/1.png", "assets/public/images/2.png", "assets/public/images/3.png", "assets/public/images/4.png", "assets/public/images/5.png", "assets/public/images/6.png", "assets/public/images/7.png", "assets/public/images/8.png", "assets/public/images/9.jpg", "assets/public/images/10.jpg", "assets/public/images/11.jpg"],
		"SIZE":[],
		"ARTWORK":[]
	},
	productImages : [
		{
			"id":1,
			"imageURL":"./assets/public/images/product1.jpg"
		},
		// {
		// 	"id":2,
		// 	"imageURL":"./assets/public/images/product2.png"
		// }
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
		"ARTWORK": "ArtWork",
		"MAINFRONTCENTER": "Front Vest",
		"MAINBACKCENTER": "Back Vest",
		"ELBOWRIGHT" : "Right Elbow",
		"ELBOWLEFT" : "Left Elbow",
		"CUSTOUMIMAGE": "Custom Image",
		"CUSTOUMTEXT": "Custom Text"
	},
	patchImages: {
		MAINFRONTCENTER: "_patch1.png",
		MAINBACKCENTER: "_patch2.png",
		ELBOWRIGHT : "_patch3.png",
		ELBOWLEFT : "_patch4.png"
		// MAINFRONTCENTER: "./assets/public/images/product5_1.png",
		// MAINBACKCENTER: "./assets/public/images/product5_1.png"
	},

	productImagePath : "./assets/public/images/product"
	
};