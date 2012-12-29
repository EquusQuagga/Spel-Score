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
	name: "nieuweSpeler", 
	kind: "onyx.Popup", 
	classes: "onyx-light", 
	centered: true, 
	floating: true, 
	scrim: true, 
	style: "color:black;margin-bottom:216px;",
	components: [
		{kind:"enyo.Image", src:"assets/ico_addblue.png", style:"position: absolute; left:-10px;top:-10px;"},
		{content: "Nieuwe Speler", allowHtml: true, classes:"head"},
		{content: "Voeg een nieuwe speler toe", allowHtml: true, classes:"version"},
		{classes:"spelerline"},
		{content: "2do controlls voor het maken van een nieuwe speler!"},
	]
});