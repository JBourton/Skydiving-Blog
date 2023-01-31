// Crypto is used to generate the unique ID
const crypto = require('crypto');

class Dropzone {
    constructor (name, likes, dislikes, img_src, img_description, kit_rental, ticket_cost, weather, min_licence, map_src, map_description, contacts) {
        this.dropzone_id = this.generateUniqueID;

        this.name = name;
        this.likes = likes;
        this.dislikes = dislikes;
        this.img_src = img_src;
        this.img_description = img_description;
        this.kit_rental = kit_rental;
        this.ticket_cost = ticket_cost;
        this.weather = weather;
        this.min_licence = min_licence;
        this.map_src = map_src;
        this.map_description = map_description;
        this.contacts = contacts;

        this.comments = {};
        
        this.datapath = '/data/Dropzones.json' ;
    }

    /**
     * Return list of all stored dropzones
     * @returns {[Object]}
     */
    async fetchEntities() {
        const dzFle = await fs.promises.readFile(this.datapath);

        // If no data exsists, return empty list
        if (dzFle.toString('utf8') === '') return {dropzones: []};

        const entityList = await JSON.parse(fileData);
        return entityList;
    }

    /**
     * Generates a unique id for a new instance of Dropzone
     * @returns {string}
     */
    generateUniqueID() {
        // Thanks to stack overflow user Pono at https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js for thier post on how to implement it
        let id = crypto.randomBytes(8).toString("hex");
        return id;
    }
        

        

        
}




module.exports.Dropzone = Dropzone;

/*
	static createManyToOne (many, one) {
		many.parent[one.name] = one;
        const pluralName = many.name + 's'
		one.child[pluralName] = many;
	}
}
*/
/*
// File for creating nested entities
export class Entity {
    constructor (name) {
        this.name = name;

        this.parent = {};
		this.child = {};
    }

    /**
	 * Create the many to one relationship between entities
	 * @param {Entity} many The many entity in the many to one
	 * @param {Entity} one The one entity in the many to one
	 */