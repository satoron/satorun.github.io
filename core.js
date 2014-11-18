function convert(in_text, tab_type){
	var arr_text = in_text.split("");
	var out_text = "";
	var section_kw = "";
	var operator_kw = "";
	var token = "";
	var tab_code = "";
	var tab_level = 0;
	var literal_start = false;
	var ppdfn_start = false; 
	var pstack = [];
	var rmv_list = [];
	var tab_level= 0;
	var literal_start = false;

	if (tab_type = 0){
		tab_code = "\t";
	}else{
		tab_code = "    ";
	}

	for (var i = 0; i < arr_text.length; i++) {
		var chr = arr_text[i];
		console.log("token = " + token);
		console.log("out_text = " + out_text);
		if (literal_start){
			switch (chr){
				case '"':
					if (i < arr_text.length - 1 
						&& arr_text[i + 1] == '"'){
						out_text += '"';
						i++;
					}else{
						out_text += "'";
						literal_start = false;
					}
					break;
				case "[":
					if (operator_kw == "LIKE" 
						&& arr_text[i + 1] == "*"
						&& arr_text[i + 2] == "]") {
						out_text += "*";
						i += 2;
					}else if(operator_kw == "LIKE" 
						&& arr_text[i + 1] == "?"
						&& arr_text[i + 2] == "]"){
						out_text += "?";
						i += 2;
					}else{
						out_text += chr;
					}
					break;
				case "*":
					if (operator_kw == "LIKE"){
						out_text += "%";
					}else{
						out_text += chr;
					}
					break;
				case "?":
					if (operator_kw == "LIKE"){
						out_text += "_";
					}else{
						out_text += chr;
					}
					break;
				default:
					out_text += chr;
			}
		}else{
			switch (chr){
				case " ":
				case "\n":
					if (primary_kw.indexOf(token.toUpperCase()) >= 0){
						section_kw = token.toUpperCase();
						if (out_text == ""){
							out_text = section_kw + chr;
						}else{
							out_text += "\n" + section_kw + chr;
						}
					}else if (secondary_kw.indexOf(token.toUpperCase()) >= 0){
						operator_kw = token.toUpperCase();
						switch (operator_kw){
							case "INNER":
							case "LEFT":
							case "RIGHT":
								out_text += "\n" + tab_code.repeat(1)
								 + operator_kw + chr;
								break;
							case "ON":
								out_text += "\n" + tab_code.repeat(2)
								 + operator_kw + chr;
								break;
							case "AND":
							case "OR":
								pstack.pop;
							default:
								out_text += operator_kw + chr;
								break;
						}
					}else{
						if (chr == " "){
							out_text += token + chr;	
						}else{
							out_text += token;
						}
						
					}
					token = "";
					break;
				case "(":
					if (ppdfn_kw.indexOf(token.toUpperCase() >= 0)){
						ppdfn_start = true;
					}
					pstack.push(i);
					out_text += token + chr;
					token = "";
					break;
				case ")":
					if (pstack.length > 0){
						rmv_list.push(pstack[pstack.length-1]);
						pstack.pop();
						rmv_list.push(i);
					}
					break;
				case ",":
					if (ppdfn_start){
						out_text += token + chr;
					}else{
						out_text += token + "\n"
						 + tab_code.repeat(1) + chr + " "; 
					}
					token = "";
					break;
				case '"':
					literal_start = true;
					out_text += token + "'";
					break;
				default:
					token += chr;
					if (i == arr_text.length - 1){
						out_text += token;
					}
			}
		}
	};

	return out_text;
};

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};