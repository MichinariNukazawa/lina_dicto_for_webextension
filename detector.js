'use strict';

// https://stackoverflow.com/a/30586239

class Detector {
	constructor(callback) {
		this.callback = callback;
	}

	get_full_word_ex(e){
		let word = this.getFullWord(e);
		let info = {
			"x" : e.clientX,
			"y" : e.clientY,
			"word" : word,
		};

		return info;
	}

	// Helper functions

	// Get the full word the cursor is over regardless of span breaks
	getFullWord(event) {
		let i, begin, end, range, textNode, offset;

		// Internet Explorer
		if (document.body.createTextRange) {
			try {
				range = document.body.createTextRange();
				range.moveToPoint(event.clientX, event.clientY);
				range.select();
				range = this.getTextRangeBoundaryPosition(range, true);

				textNode = range.node;
				offset = range.offset;
			} catch(e) {
				return ""; // Sigh, IE
			}
		}

		// Firefox, Safari
		// REF: https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
		else if (document.caretPositionFromPoint) {
			range = document.caretPositionFromPoint(event.clientX, event.clientY);
			textNode = range.offsetNode;
			offset = range.offset;

			// Chrome
			// REF: https://developer.mozilla.org/en-US/docs/Web/API/document/caretRangeFromPoint
		} else if (document.caretRangeFromPoint) {
			range = document.caretRangeFromPoint(event.clientX, event.clientY);
			textNode = range.startContainer;
			offset = range.startOffset;
		}

		// Only act on text nodes
		if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
			return "";
		}

		let data = textNode.textContent;

		// Sometimes the offset can be at the 'length' of the data.
		// It might be a bug with this 'experimental' feature
		// Compensate for this below
		if (offset >= data.length) {
			offset = data.length - 1;
		}

		// Ignore the cursor on spaces - these aren't words
		if (this.isW(data[offset])) {
			return "";
		}

		// Scan behind the current character until whitespace is found, or beginning
		i = begin = end = offset;
		while (i > 0 && !this.isW(data[i - 1])) {
			i--;
		}
		begin = i;

		// Scan ahead of the current character until whitespace is found, or end
		i = offset;
		while (i < data.length - 1 && !this.isW(data[i + 1])) {
			i++;
		}
		end = i;

		// This is our temporary word
		let word = data.substring(begin, end + 1);

		// Demo only
		this.showBridge(null, null, null);

		// If at a node boundary, cross over and see what 
		// the next word is and check if this should be added to our temp word
		if (end === data.length - 1 || begin === 0) {

			let nextNode = this.getNextNode(textNode);
			let prevNode = this.getPrevNode(textNode);

			// Get the next node text
			if (end == data.length - 1 && nextNode) {
				let nextText = nextNode.textContent;

				// Demo only
				this.showBridge(word, nextText, null);

				// Add the letters from the next text block until a whitespace, or end
				i = 0;
				while (i < nextText.length && !this.isW(nextText[i])) {
					word += nextText[i++];
				}

			} else if (begin === 0 && prevNode) {
				// Get the previous node text
				let prevText = prevNode.textContent;

				// Demo only
				this.showBridge(word, null, prevText);

				// Add the letters from the next text block until a whitespace, or end
				i = prevText.length - 1;
				while (i >= 0 && !this.isW(prevText[i])) {
					word = prevText[i--] + word;
				}
			}
		}
		return word;
	}

	// Whitespace checker
	isW(s) {
		return /[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(s);
	}

	// Barrier nodes are BR, DIV, P, PRE, TD, TR, ... 
	isBarrierNode(node) {
		return node ? /^(BR|DIV|P|PRE|TD|TR|TABLE)$/i.test(node.nodeName) : true;
	}

	// Try to find the next adjacent node
	getNextNode(node) {
		let n = null;
		// Does this node have a sibling?
		if (node.nextSibling) {
			n = node.nextSibling;

			// Doe this node's container have a sibling?
		} else if (node.parentNode && node.parentNode.nextSibling) {
			n = node.parentNode.nextSibling;
		}
		return this.isBarrierNode(n) ? null : n;
	}

	// Try to find the prev adjacent node
	getPrevNode(node) {
		let n = null;

		// Does this node have a sibling?
		if (node.previousSibling) {
			n = node.previousSibling;

			// Doe this node's container have a sibling?
		} else if (node.parentNode && node.parentNode.previousSibling) {
			n = node.parentNode.previousSibling;
		}
		return this.isBarrierNode(n) ? null : n;
	}

	// REF: http://stackoverflow.com/questions/3127369/how-to-get-selected-textnode-in-contenteditable-div-in-ie
	getChildIndex(node) {
		let i = 0;
		while( (node = node.previousSibling) ) {
			i++;
		}
		return i;
	}

	// All this code just to make this work with IE, OTL
	// REF: http://stackoverflow.com/questions/3127369/how-to-get-selected-textnode-in-contenteditable-div-in-ie
	getTextRangeBoundaryPosition(textRange, isStart) {
		let workingRange = textRange.duplicate();
		workingRange.collapse(isStart);
		let containerElement = workingRange.parentElement();
		let workingNode = document.createElement("span");
		let comparison, workingComparisonType = isStart ?
			"StartToStart" : "StartToEnd";

		let boundaryPosition, boundaryNode;

		// Move the working range through the container's children, starting at
		// the end and working backwards, until the working range reaches or goes
		// past the boundary we're interested in
		do {
			containerElement.insertBefore(workingNode, workingNode.previousSibling);
			workingRange.moveToElementText(workingNode);
		} while ( (comparison = workingRange.compareEndPoints(
						workingComparisonType, textRange)) > 0 && workingNode.previousSibling);

		// We've now reached or gone past the boundary of the text range we're
		// interested in so have identified the node we want
		boundaryNode = workingNode.nextSibling;
		if (comparison == -1 && boundaryNode) {
			// This must be a data node (text, comment, cdata) since we've overshot.
			// The working range is collapsed at the start of the node containing
			// the text range's boundary, so we move the end of the working range
			// to the boundary point and measure the length of its text to get
			// the boundary's offset within the node
			workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

			boundaryPosition = {
				node: boundaryNode,
				offset: workingRange.text.length
			};
		} else {
			// We've hit the boundary exactly, so this must be an element
			boundaryPosition = {
				node: containerElement,
				offset: this.getChildIndex(workingNode)
			};
		}

		// Clean up
		workingNode.parentNode.removeChild(workingNode);

		return boundaryPosition;
	}

	// DEMO-ONLY code - this shows how the word is recombined across boundaries
	showBridge(word, nextText, prevText) {
		if (nextText) {
			console.log("`" + word + "` `" + nextText.substring(0, 20) + "`");
		} else if (prevText) {
			console.log("`" + prevText.substring(prevText.length - 20, prevText.length) + "` `" + word + "`");
		} else {
			// console.log("");
		}
	}

};

