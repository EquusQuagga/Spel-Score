enyo.kind({
	name: "About", 
	kind: "onyx.Popup", 
	classes: "onyx-light", 
	centered: true, 
	floating: true, 
	scrim: true, 
	style: "color:black;margin-bottom:216px;",
	components: [
		{kind: "WebService", name:"loader", url: "appinfo.json", onResponse:"processResponse", callbackName: "callback"},
		{name:"abouticon", kind:"enyo.Image", src:"icon.png", style:"position: absolute; left:-20px;top:-20px;"},
		{name:"abouttitle", content: "-Bootplate-", allowHtml: true, classes:"head"},
		{name:"aboutversion", content: "-Version: 1.4.2-", allowHtml: true, classes:"version"},
		{name:"aboutid", content: "-Equus Quagga-", allowHtml: true, classes:"version"},
		{kind:"enyo.Image", src:"assets/eqlogo.png", style:"position: absolute; right:-40px;bottom:-40px;"},
		{content: "A bootplate for webOS applications made by Equus Quagga", allowHtml: true, classes:"aboutinfo"}
	],
    create: function() {
        this.inherited(arguments);
		if(window.PalmSystem) {
			this.$.loader.send();
		}
	},
	processResponse: function(inSender, inEvent) {
		// do something with it
		this.appinfo = inEvent.data;
		this.$.abouttitle.setContent( this.appinfo.title );
		this.$.aboutversion.setContent( "VERSION:"+ this.appinfo.version);
		this.$.aboutid.setContent( "ID: "+this.appinfo.id );
		this.$.abouticon.setSrc( this.appinfo.icon );
	}
});