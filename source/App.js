/*
   Copyright 2012 Equus Quagga

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


enyo.kind({
	name: "App",
	fit: true,
	classes:"onyx",
	components:[
        {kind: "Signals", onwindowactivated: "windowactivated"},
        {kind: "Signals", onwindowdeactivated: "windowdeactivated"},
		{name: "appMenu", kind: "onyx.appMenu", components: [
			{content: "About", ontap:"about"},
			{classes: "onyx-menu-divider"}
		]},
		{name: "AboutPop", kind: "About"}, //popup over het programma
		{name: "nieuwSpelPop", kind: "nieuwSpel"},//popup voor het maken van een neiuw spel
		{name: "nieuweSpelerPop", kind: "nieuweSpeler"}, //popup voor het amken van een nieuwe speler
		{name: "nieuwGespeeldPop", kind: "nieuwGespeeld"}, //popup voor het maken van een spelsessie.
		{name: "nieuwFilterPop", kind: "nieuwFilter"}, //popup voor het maken van een spelsessie.
		{kind: "Panels",
			classes: "app enyo-fit onyx enyo-unselectable",
			arrangerKind:"CollapsingArranger",
			realtimeFit: true,
			name: "Arranger", 
			components: [
				{kind: "FittableRows", name:"linkerPaneel", classes: "linkerPaneel", components:[
					{kind: "onyx.Toolbar", classes:"headers onyx-toolbar-inline", components: [
						{kind: "onyx.RadioGroup", name:"linkerKeuze", style:"margin:-1px 0 0 0;width:100%;", onActivate:"updateLinkerPaneel", components: [
							{content: "Spellen", name:"spellenKeuze", style:"width:33%;",value:0 , classes: "buttonGroen", active: true},
							{content: "Spelers", name:"spelersKeuze", style:"width:34%;",value:1, classes: "buttonBlauw"},
							{content: "Filters", name:"filterKeuze", style:"width:33%;",value:2, classes: "buttonPaars"}
						 ]}
					]},
					{kind: "Panels", name:"linkerlijsten", fit: true, draggable: false, classes: "", components: [
						// Spellenlijst
						{kind: "FittableRows", fit: true, components:[
							{components: [{content: "Nieuw Spel", classes:"spelnaam"},{kind: "Image", src: "assets/ico_addgreen.png", classes:"addbutton"}], classes:"spellistitem", ontap:"nieuwSpel"},
							{components: [
								{content: "Alles", kind: "onyx.Button", ontap:"selectAllSpellen", classes: "buttonGroen selectButton"},
								{content: "Niets", kind: "onyx.Button", ontap:"selectNoneSpellen", classes: "buttonGroen selectButton"},
								{content: "Wissel", kind: "onyx.Button", ontap:"selectInvertSpellen", classes: "buttonGroen selectButton"}
							], classes:"spellistitem", name:"AllSpellen"},
							{classes:"spelline"},
							{name: "SpelList", kind: "List", count: 1, touch:true, fit: true, multiSelect: true, onSetupItem: "setupSpelItem", components: [
								{name: "SpelItem", kind: "SpelItem", classes: "enyo-border-box", onEdit: "editTap"}
							]}
						]},
						// Spelerslijst
						{kind: "FittableRows", fit: true, components:[
							{components: [{content: "Nieuwe Speler", classes:"spelernaam"},{kind: "Image", src: "assets/ico_addblue.png", classes:"addbutton"}], classes:"spelerlistitem", ontap:"nieuweSpeler"},
							{components: [
								{content: "Alles", kind: "onyx.Button", ontap:"selectAllSpelers", classes: "buttonBlauw selectButton"},
								{content: "Niets", kind: "onyx.Button", ontap:"selectNoneSpelers", classes: "buttonBlauw selectButton"},
								{content: "Wissel", kind: "onyx.Button", ontap:"selectInvertSpelers", classes: "buttonBlauw selectButton"}
							], classes:"spelerlistitem", name:"AllSpelers"},
							{classes:"spelerline"},
							{name: "SpelerList", kind: "List", count: 1, touch:true, fit: true, multiSelect: true, onSetupItem: "setupSpelerItem", components: [
								{name: "SpelerItem", kind: "SpelerItem", classes: "enyo-border-box", onEdit: "editTap"}
							]}
						]},
						// Filterslijst
						{kind: "FittableRows", fit: true, components:[
							{components: [{content: "Nieuw Filter", classes:"filternaam"},{kind: "Image", src: "assets/ico_addpurple.png", classes:"addbutton"}], classes:"filterlistitem", ontap:"nieuwFilter"},
							{classes:"filterline"},
							{name: "FilterList", kind: "List", count: 1, touch:true, fit: true, multiSelect: false, onSetupItem: "setupFilterItem", components: [
								{name: "FilterItem", kind: "FilterItem", classes: "enyo-border-box", onEdit: "editTap"}
							]}
						]}
					]}
				]
				},
				{kind: "FittableRows", name:"middenPaneel",  classes: "middenPaneel", components:[
					{classes:"panelshadow"},
					{kind: "onyx.Toolbar", classes:"headers onyx-toolbar-inline", components: [
						{kind: "onyx.Grabber"},
						{content:"Gespeeld"}
					]},
					{components: [{content: "Nieuw Potje", classes:"gespeeldnaam"},{kind: "Image", src: "assets/ico_addblack.png", classes:"addbutton"}], classes:"gespeeldlistitem", ontap:"nieuwGespeeld"},
					{components: [
						{content: "Alles", kind: "onyx.Button", ontap:"selectAllGespeeld", classes: "buttonZwart selectButton"},
						{content: "Niets", kind: "onyx.Button", ontap:"selectNoneGespeeld", classes: "buttonZwart selectButton"},
						{content: "Wissel", kind: "onyx.Button", ontap:"selectInvertGespeeld", classes: "buttonZwart selectButton"}
					], classes:"gespeeldlistitem", name:"AllGespeeld"},
					{classes:"gespeeldline"},
					{name: "GespeeldList", kind: "List", count: 1, touch:true, fit: true, multiSelect: true, onSetupItem: "setupGespeeldItem", components: [
						{name: "GespeeldItem", kind: "GespeeldItem", classes: "enyo-border-box", onEdit: "editTap"}
					]}
				]
				},
				{kind: "FittableRows", name:"rechterPaneel", fit:true, classes: "rechterPaneel", components:[
					{classes:"panelshadow"},
					{kind: "onyx.Toolbar", classes:"headers onyx-toolbar-inline", components: [
						{kind: "onyx.Grabber"},
						{content:"Informatie"}
					]},
					{content: "Informatie"},
					{kind:"onyx.Button", classes: "buttonGroen selectButton", content:"about", ontap:"about"},
					{content: "Informatie", fit:true}
				]
				}
			]
		}
	],
	rendered: function() {
		this.inherited(arguments);
		this.populateSpelList();
		this.populateSpelerList();
		this.populateFilterList();
	},
	updateLinkerPaneel: function(inSender, inEvent){
		if (inEvent.originator.getActive()) {
			this.$.linkerlijsten.setIndex(inEvent.originator.value);
		}
	},
	populateSpelList: function() {
		this.$.SpelList.setCount(this.defaultspellen.length);
		this.$.SpelList.setRowsPerPage(20);
		this.$.SpelList.reset();
	},
	setupSpelItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var spel = this.defaultspellen[i];
		// content
		this.$.SpelItem.setSpel(spel);
		// selection
		this.$.SpelItem.setSelected(inSender.isSelected(i));
	},
	selectAllSpellen: function() {
		//selecteer alles. eerst wissen en dan selecteren
		for (i=0;i<this.$.SpelList.count;i++){
			this.$.SpelList.deselect(i);
			this.$.SpelList.select(i);
		}
	},
	selectNoneSpellen: function() {
		//deselecteer alles
		for (i=0;i<this.$.SpelList.count;i++){
			this.$.SpelList.deselect(i);
		}
	},
	selectInvertSpellen: function() {
		//wissel de selectie
		for (i=0;i<this.$.SpelList.count;i++){
			this.$.SpelList.select(i);
		}
	},
	selectAllSpelers: function() {
		//selecteer alles. eerst wissen en dan selecteren
		for (i=0;i<this.$.SpelerList.count;i++){
			this.$.SpelerList.deselect(i);
			this.$.SpelerList.select(i);
		}
	},
	selectNoneSpelers: function() {
		//deselecteer alles
		for (i=0;i<this.$.SpelerList.count;i++){
			this.$.SpelerList.deselect(i);
		}
	},
	selectInvertSpelers: function() {
		//wissel de selectie
		for (i=0;i<this.$.SpelerList.count;i++){
			this.$.SpelerList.select(i);
		}
	},
	populateSpelerList: function() {
		this.$.SpelerList.setCount(this.avatars.length);
		this.$.SpelerList.setRowsPerPage(20);
		this.$.SpelerList.reset();
	},
	setupSpelerItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var speler = this.avatars[i];
		// content
		this.$.SpelerItem.setSpeler(speler);
		// selection
		this.$.SpelerItem.setSelected(inSender.isSelected(i));
	},
	populateFilterList: function() {
		this.$.FilterList.setCount(this.defaultfilters.length);
		this.$.FilterList.setRowsPerPage(20);
		this.$.FilterList.reset();
	},
	setupFilterItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var filters = this.defaultfilters[i];
		// content
		this.$.FilterItem.setFilter(filters);
		// selection
		this.$.FilterItem.setSelected(inSender.isSelected(i));
	},
	about: function(inSender, inEvent) {
		this.$.appMenu.hide();
		this.$.AboutPop.show();
	},
	nieuwSpel: function(inSender, inEvent) {
		this.$.appMenu.requestAppMenuHide();
		this.$.nieuwSpelPop.show();
	},
	nieuweSpeler: function(inSender, inEvent) {
		this.$.appMenu.requestAppMenuHide();
		this.$.nieuweSpelerPop.show();
	},
	nieuwFilter: function(inSender, inEvent) {
		this.$.appMenu.requestAppMenuHide();
		this.$.nieuwFilterPop.show();
	},
	nieuwGespeeld: function(inSender, inEvent) {
		this.$.appMenu.requestAppMenuHide();
		this.$.nieuwGespeeldPop.show();
	},
	windowactivated: function(inSender, inEvent) {
		//event when app gets activated again
	},
	windowdeactivated: function(inSender, inEvent) {
		//event when app gets deactivated. 
	},
	editTap: function(inSender, inEvent) {
		//edit een spel.
	},
	defaultspellen:[
		{naam:"Afrika", icon:"afrika.jpg", spelers:"2-4", tijd:"45 min", waardering:"3", highscore:10, aantal:9, laatst:"3 juni"},
		{naam:"Agricola", icon:"agricola.jpg", spelers:"2-4", tijd:"1 uur", waardering:"5", highscore:40, aantal:23, laatst:"12 september"},
		{naam:"Kolonisten van Catan", icon:"kolonisten.jpg", spelers:"2-6", tijd:"45 min", waardering:"1", highscore:10, aantal:9, laatst:"11 oktober"},
		{naam:"Skip Bo", icon:"skipbo.jpg", spelers:"2-10", tijd:"", waardering:"2", highscore:10, aantal:9, laatst:"vorig jaar"},
		{naam:"Zwarte Vrouwen", icon:"zwartevrouwen.jpg", spelers:"2-4", tijd:"1 uur", waardering:"3", highscore:10, aantal:9, laatst:"met Kerst"}
	],
	avatars:[	"A01.png",	"A02.png",	"A03.png",	"A04.png",	"A05.png",
				"B01.png",	"B02.png",	"B03.png",	"B04.png",	"B05.png",
				"C01.png",	"C02.png",	"C03.png",	"C04.png",	"C05.png",
				"D01.png",	"D02.png",	"D03.png",	"D04.png",	"D05.png",
				"E01.png",	"E02.png",	"E03.png",	"E04.png",	"E05.png",
				"F01.png",	"F02.png",	"F03.png",	"F04.png",	"F05.png",
				"FA01.png",	"FA02.png",	"FA03.png",	"FA04.png",	"FA05.png",
				"FB01.png",	"FB02.png",	"FB03.png",	"FB04.png",	"FB05.png",
				"FC01.png",	"FC02.png",	"FC03.png",	"FC04.png",	"FC05.png",
				"FD01.png",	"FD02.png",	"FD03.png",	"FD04.png",	"FD05.png",
				"FE01.png",	"FE02.png",	"FE03.png",	"FE04.png",	"FE05.png",
				"FG01.png",	"FG02.png",	"FG03.png",	"FG04.png",	"FG05.png",
				"FH01.png",	"FH02.png",	"FH03.png",	"FH04.png",	"FH05.png",
				"FI01.png",	"FI02.png",	"FI03.png",	"FI04.png",	"FI05.png",
				"G01.png",	"G02.png",	"G03.png",	"G04.png",	"G05.png",
				"H01.png",	"H02.png",	"H03.png",	"H04.png",	"H05.png",
				"I01.png",	"I02.png",	"I03.png",	"I04.png",	"I05.png",
				"J01.png",	"J02.png",	"J03.png",	"J04.png",	"J05.png",
				"K01.png",	"K02.png",	"K03.png",	"K04.png",	"K05.png",
				"L01.png",	"L02.png",	"L03.png",	"L04.png",	"L05.png",
				"M01.png",	"M02.png",	"M03.png",	"M04.png",	"M05.png",
				"O01.png",	"O02.png",	"O03.png",	"O04.png",	"O05.png"
	],
	defaultfilters: [
		{naam:"Maarten en Marlieke",laatst:"Gisteren"},
		{naam:"One Path",laatst:"Zaterdag"},
		{naam:"Test",laatst:"Woensdag"}
	]
});


// It's convenient to create a kind for the item we'll render in the games list.
enyo.kind({
	name: "SpelItem",
	classes:"spellistitem",
	components: [
		{name: "icon", kind: "Image", classes: "spelicon"},
		{name: "naam", classes: "spelnaam"},
		{name: "spelers", classes: "spelspelers"},
		{name: "tijd", classes: "speltijd"},
		{name: "waardering", kind: "Image", classes: "spelwaardering"},
		{name: "highscore", classes: "spelhighscore"},
		{name: "aantal", classes: "spelaantal"},
		{name: "laatst", classes: "speldatum"}
	],
	setSpel: function(inSpel) {
		this.$.naam.setContent(inSpel.naam);
		this.$.icon.setSrc("assets/spellen/"+inSpel.icon);
		this.$.highscore.setContent("HS: "+inSpel.highscore);
		this.$.spelers.setContent("Spelers: "+inSpel.spelers);
		this.$.tijd.setContent("Tijd: "+inSpel.tijd);
		this.$.waardering.setSrc("assets/star"+inSpel.waardering+".png");
		this.$.aantal.setContent("Aantal: "+inSpel.aantal+"x");
		this.$.laatst.setContent(inSpel.laatst);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("spelselected", inSelected);
	}
});

//Spelers
enyo.kind({
	name: "SpelerItem",
	classes:"spelerlistitem",
	components: [
		{name: "spelericon", kind: "Image", classes: "spelericon"},
		{name: "spelernaam", classes: "spelernaam"},
		{name: "speleraantal", classes: "speleraantal"},
		{name: "spelerlaatst", classes: "spelerdatum"}
	],
	setSpeler: function(inSpeler) {
		//var i = inSpel.index;
		this.$.spelericon.setSrc("assets/avatars/48/"+inSpeler);
		this.$.spelernaam.setContent(inSpeler);
		this.$.speleraantal.setContent("Aantal: "+7+"x");
		this.$.spelerlaatst.setContent(inSpeler);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("spelerselected", inSelected);
	}
});

// Filters
enyo.kind({
	name: "FilterItem",
	classes:"filterlistitem",
	components: [
		{name: "filternaam", classes: "filternaam"},
		{name: "filterlaatst", classes: "filterdatum"}
	],
	setFilter: function(inFilter) {
		this.$.filternaam.setContent(inFilter.naam);
		this.$.filterlaatst.setContent(inFilter.laatst);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("filterselected", inSelected);
	}
});
