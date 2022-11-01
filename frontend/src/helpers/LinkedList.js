class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // This method adds an element to the end of the list
    add(element) {
        // create a new node
        const node = new Node(element);

        // store the current node
        let current;

        // if the list is empty add the element and make it the head
        if (this.head === null) this.head = node;
        else {
            current = this.head;

            // iterate to the end of the list
            while (current.next) {
                current = current.next;
            }

            // add the node
            current.next = node;
        }
        this.size++;
    }

    // This method inserts an element at the index of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size) throw new Error('Please enter a valid index.');
        else {
            // create a new node
            const node = new Node(element);
            let curr, prev;

            curr = this.head;

            // add the element to the first index
            if (index === 0) {
                node.next = this.head;
                let i = 0;

                // iterate over the list to find the position to insert
                while (i < index) {
                    i++;
                    prev = curr;
                    curr = curr.next;
                }

                // add the element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }

    //  This method removes and returns an element from the list from the specified index 
    removeFrom(index) {
        if (index < 0 || index >= this.size) throw new Error('Please enter a valid index.');
        else {
            let curr, prev, i = 0;
            curr = this.head;
            prev = curr;

            // delete if its the first element
            console.log("heres some info from linked list => ", curr, this.head, index)
            if (index === 0) this.head = curr.next;
            else {
                // iterate over the list to the index to remove the element
                while (i < index) {
                    i++;
                    prev = curr;
                    curr = curr.next;
                }

                // remove the element
                prev.next = curr.next
            }
            this.size--;

            // return the element that was removed
            return curr.element;
        }
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

    // This method returns the index of a given element if the element is in the list. 
    indexOf(element) {
        let count = 0;
        let current = this.head;

        // iterate over the list
        while (current !== null) {
            // compare each element of the list with the given element
            if (current.element === element)
                return count;
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
    size() {
        return this.size;
    }
}

export default LinkedList;