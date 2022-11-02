export class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // This method adds an element to the end of the list
    add(element) {
        this.size++;
        let newNode = new Node(element);

        if (this.tail) {
            // list is not empty
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            return newNode;
        }

        this.head = this.tail = newNode;
        return newNode;
    }

    // This method inserts an element at the index of the list
    insertAt(element, index) {
        if (index >= this.size) throw new Error("Please enter a valid index");

        if (index === 0) return this.insertHead(element);

        this.size++;
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        const prevNode = currentNode.prev;
        const newNode = new Node(element);
        newNode.next = currentNode;
        newNode.prev = prevNode;
        prevNode.next = newNode;
        currentNode.prev = newNode;
        return newNode;
    }

    //  This method removes and returns an element from the list from the specified index 
    removeFrom(index) {
        if (index >= this.size) throw new Error("Remove index out of bounds");

        if (index === 0) return this.removeHead();

        this.size--;
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        const prevNode = currentNode.prev;
        const nextNode = currentNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        return currentNode.element;
    }

    // This method removes element from the list. It returns the removed element, or if it’s not found it returns -1. 
    removeElement(element) {
        let current = this.head;
        let prev = null;

        // iterate over the list
        while (current !== null) {
            // compare the element with current element and if found then remove the element and return true
            if (current.element === element) {
                if (prev === null) this.head = current.next;
                else prev.next = current.next;
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    removeLast() {
        if (this.tail) {
            this.size--;

            const removedTail = this.tail;

            this.tail = this.tail.prev;
            if (this.tail) this.tail.next = null;
            else this.head = null;

            return removedTail;
        }

        return -1;
    }

    insertHead(element) {
        this.length++;
        let newNode = new Node(element);

        if (this.head) {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
            return newNode;
        }

        this.head = this.tail = newNode;
        return newNode;
    }

    removeHead() {
        if (this.head) {
            this.size--;
            const removedHead = this.head;
            this.head = this.head.next;

            if (this.head) this.head.prev = null; 
            else this.tail = null;

            return removedHead;
        }
        return undefined;
    }

    // This method returns the index of a given element if the element is in the list. 
    indexOf(element) {
        let count = 0;
        let current = this.head;

        // iterate over the list
        while (current !== null) {
            // compare each element of the list with the given element
            if (current.element === element) return count;
            count++;
            current = current.next;
        }

        // not found
        return -1;
    }


    // This method checks if the list is empty
    isEmpty() {
        return this.size === 0;
    }

    // This method returns the size of the list
    getSize() {
        return this.size;
    }
}

export default LinkedList;