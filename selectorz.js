
(function () {
	function displayInput() {
		var doc = document, 
			div, 
			input,
			heading,
			link,
			textarea,
			close;
		
		// @todo: change styles from div.style.xxx = div.style.cssText
		div = doc.createElement('div');
		div.id = 'selectorz_wrapper';
		div.style.width = '550px';
		div.style.position = 'absolute';
		div.style.top = '35px';
		div.style.right = '35px';
		div.style.padding = '10px';
		div.style.paddingTop = '40px';
		div.style.background = '#fff';
		div.style.border = '1px solid #ccc';
		div.style.fontSize = '13px';
		div.style.fontFamily = 'Helvetica, Arial, sans-serif';
		div.style.textAlign = 'left';
		div.style.borderRadius = '6px';
		div.style.zIndex = 9001; // OVER 9000!	
		
		heading = doc.createElement('h1');
		heading.style.fontSize = '18px';
		heading.style.color = '#444';
		heading.style.margin = '5px';
		heading.style.position = 'absolute';
		heading.style.top = '0';
		heading.appendChild(doc.createTextNode('GET UR SELECTORZ!'));

		input = doc.createElement("input");
		input.id = "selectorz_input";

		link = doc.createElement("a");
		link.href = "#";
		link.appendChild(doc.createTextNode("GET SOME"));
		link.onclick = selectorz_getSome;

		textarea = doc.createElement('textarea');
		textarea.id = "selectorz_output";
		textarea.style.width = '540px';
		textarea.style.display = 'none';
		textarea.style.minHeight = "300px";
		
		close = doc.createElement('span');
		close.style.position = 'absolute';
		close.style.top = '10px';
		close.style.right = '10px';
		close.style.color = '#444';
		close.style.cursor = 'pointer';
		close.style.borderBottom = '1px solid #333';
		close.onclick = function () {
			// @todo: Check cross browser support
			doc.body.removeChild(doc.getElementById('selectorz_wrapper'));
		};
		close.appendChild(doc.createTextNode('close'));

		div.appendChild(heading);
		div.appendChild(close);
		div.appendChild(input);
		div.appendChild(link);
		div.appendChild(textarea);
		doc.body.appendChild(div);
	}
	
	function selectorz_getSome() {
		var doc = document,
			selector,
			el,
			tags = false;

		selector = doc.getElementById("selectorz_input").value;

		if (doc.getElementById(selector)) {
			el = doc.getElementById(selector);
			tags = el.getElementsByTagName("*");
		} else if (doc.getElementsByClassName(selector)) {
			// @todo: what if return values is an array?
			el = doc.getElementsByClassName(selector);
			tags = el.getElementsByTagName("*");
		} else {
			console.log("The Fuck is this!");
		}
		
		if (tags) {
			selectorz_process(tags);
		}
	}

	function inArray(needle, haystack) {
		var i, length;

		for (i = 0, length = haystack.length; i < length; i++) {
			if (haystack[i] === needle) {
				return true;
			}
		}
		return false;
	}

	function selectorz_process(tags) {
		var selectors = [],
			added = [],
			tagIndex, 
			classIndex,
			length,
			temp,
			classes,
			textarea;

		for (tagIndex = 0, length = tags.length; tagIndex < length; tagIndex++) {
			if (tags[tagIndex].id !== "") {
				if (!inArray(tags[tagIndex].id, added)) {
					temp = '$("#%s");';
					selectors.push(temp.replace("%s", tags[tagIndex].id));
					added.push(tags[tagIndex].id);
				}
			} else if (tags[tagIndex].className !== "") {
				classes = tags[tagIndex].className.split(" ");	
				for (classIndex = 0; classIndex < classes.length; classIndex++) {
					if (!inArray(classes[classIndex], added)) {
						temp = '$(".%s");';
						selectors.push(temp.replace("%s", classes[classIndex]));
						added.push(classes[classIndex]);
					}
				}
			}
		}
		
		textarea = document.getElementById("selectorz_output");
		textarea.innerHTML = selectors.join("\n");
		textarea.style.display = "block";
	}

	displayInput();
})();

