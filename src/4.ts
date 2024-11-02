// region Interfaces
interface IKey {
    getSignature(): number;
}

interface IPerson {
    getKey(): number;
}

interface IHouse {
    comeIn(tenant: IPerson): void;

    openDoor(key: number): void;
}

interface IMyHouse {
    openDoor(someKey: number): void;
}

// endregion Interfaces


// region Classes
class Key implements IKey {
    private readonly signature: number;

    constructor() {
        this.signature = Math.random();
    }

    public getSignature(): number {
        return this.signature;
    }
}


class Person implements IPerson {
    constructor(private key: IKey) {}

    public getKey(): number {
        return this.key.getSignature();
    }
}


abstract class House implements IHouse {

    protected constructor(
        protected key: IKey,
        protected door: boolean           = false,
        protected tenants: Array<IPerson> = []) {}

    public comeIn(tenant: IPerson) {
        if (this.door) this.tenants.push(tenant);
    }

    abstract openDoor(someKey: number): void
}


class MyHouse extends House implements IMyHouse {
    constructor(key: IKey) {
        super(key);
    }

    public openDoor(someKey: number) {
        this.door = someKey === this.key.getSignature();
    }
}
// endregion Classes


const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};
