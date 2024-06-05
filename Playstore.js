{
	"translatorID": "new-id-for-play-store",
	"label": "Google Play Store",
	"creator": "Best Bud Sophie",
	"target": "https://play.google.com/store/",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-06-05"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2024 Best Bud Sophie

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

function detectWeb(doc, url) {
	if (url.includes('/store/apps/details')) {
		return 'computerProgram';
	}
	return false;
}

function doWeb(doc, url) {
	scrape(doc, url);
}

function scrape(doc, url) {
	// Title
	var title = doc.querySelector('h1 span').textContent;

	// Description
	var description = doc.querySelector('div[jsname="sngebd"]').textContent;

	// Developers (creators)
	var devs = doc.querySelectorAll('a.hrTbp.R8zArc');
	var cleanDevs = [];
	for (let dev of devs) {
		cleanDevs.push(ZU.cleanAuthor(dev.textContent, 'programmer', true));
	}

	// Publisher
	var publisher = doc.querySelector('a.hrTbp.R8zArc').textContent;

	// Release date
	var date = doc.querySelector('span.hAyfc:nth-child(1) > span:nth-child(2)').textContent;

	// Tags (categories)
	var tags = doc.querySelectorAll('a.hrTbp.EJBMKb');
	var cleanTags = [];
	for (let tag of tags) {
		cleanTags.push(ZU.trimInternal(tag.textContent));
	}

	// Platforms (assume Android for Play Store)
	var platforms = "Android";

	// Create & assemble object
	var item = new Z.Item("computerProgram");
	item.title = title;
	item.tags = cleanTags;
	item.creators = cleanDevs;
	item.date = date;
	item.abstractNote = description;
	item.company = publisher;
	item.system = platforms;
	item.url = url;
	item.libraryCatalog = "play.google.com";
	item.complete();
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo",
		"detectedItemType": "computerProgram",
		"items": [
			{
				"itemType": "computerProgram",
				"title": "Pokémon GO",
				"creators": [
					{
						"lastName": "Niantic, Inc.",
						"creatorType": "programmer"
					}
				],
				"date": "July 6, 2016",
				"abstractNote": "Join Trainers across the globe who are discovering Pokémon as they explore the world around them. Pokémon GO is the global gaming sensation that has been downloaded over 1 billion times and named 'Best Mobile Game' by the Game Developers Choice Awards and 'Best App of the Year' by TechCrunch.",
				"company": "Niantic, Inc.",
				"libraryCatalog": "play.google.com",
				"system": "Android",
				"url": "https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo",
				"attachments": [],
				"tags": [
					{
						"tag": "Adventure"
					},
					{
						"tag": "AR"
					},
					{
						"tag": "Multiplayer"
					},
					{
						"tag": "Simulation"
					}
				],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
