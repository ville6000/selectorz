
(function () {
	function displayInput() {
		var doc = document, 
			div, 
			input,
			heading,
			link,
			textarea,
			close;
		
		div = doc.createElement('div');
		div.id = 'selectorz_wrapper';

		div.style.cssText = "position:fixed;top:35px;right:35px;width:550px;padding:10px;padding-top:40px;background:#fff;border:1px solid #ccc;text-align:left;border-radius:6px;z-index:9001;box-shadow:2px 2px 5px rgba(0,0,0,0.6);";
		
		heading = doc.createElement('h1');
		heading.style.cssText = "font-size:18px;font-weight:normal;margin:5px;position:absolute;top:0;";
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
			tags = false,
			temp,
			elIndex,
			tempIndex;

		selector = doc.getElementById("selectorz_input").value;

		if (doc.getElementById(selector)) {
			el = doc.getElementById(selector);
			tags = el.getElementsByTagName("*");
		} else if (doc.getElementsByClassName(selector)) {
			el = doc.getElementsByClassName(selector);
			if (el.length) {
				tags = [];
				for (elIndex = 0; elIndex < el.length; elIndex++) {
					temp = el[elIndex].getElementsByTagName("*");
					for (tempIndex = 0; tempIndex < temp.length; tempIndex++) {
						tags.push(temp[tempIndex]);
					}
				}
			} else {
				tags = el.getElementsByTagName("*");
			}
		} else {
			console.log("The Fuck is this!");
		}
		
		if (tags) {
			selectorz_process(tags);
		}
	}

	function inArray(needle, haystack) {
		var i, length = haystack.length;

		for (i = 0; i < length; i++) {
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
			tagsLength = tags.length,
			temp,
			classes,
			textarea;

		for (tagIndex = 0; tagIndex < tagsLength; tagIndex++) {
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
