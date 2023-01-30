// File for creating nested entities
class Entity {
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
	static createManyToOne (many, one) {
		many.parent[one.name] = one;
        const pluralName = many.name + 's'
		one.child[pluralName] = many;
	}
}

module.exports.Entity = Entity;