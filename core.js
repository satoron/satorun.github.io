function convert(in_text, tab_type){
	var arr_text = in_text.split("");
	var out_text = "";
	var section_kw = "";
	var operator_kw = "";
	var buf_kw = "";
	var tab_code = "";
	var tab_level = 0;
	var literal_start = false;
	var ppdfn_start = false; 
	var pstack = [];
	var tab_level= 0;
	var literal_start = false;

	if (tab_type = 0){
		tab_code = "\t";
	}else{
		tab_code = "    ";
	}

	for (var i = 0; i < arr_text.length; i++) {
		var chr = arr_text[i];
		if (literal_start){

		}else{
			switch (chr){
				case " ":
					if (primary_kw.indexOf(buf_kw.toUpperCase()) >= 0){
						section_kw = buf_kw.toUpperCase();
						if (out_text == ""){
							out_text = section_kw + chr;
						}else{
							out_text += "\n" + section_kw + chr;
						}
					}else if (section_kw.indexOf(buf_kw.toUpperCase()) >= 0){
						operator_kw = buf_kw.toUpperCase();
						if (operator_kw == "INNER" ||
							operator_kw == "LEFT" ||
							operator_kw == "RIGHT"){
							out_text += "\n" + tab_code.repeat(tab_level + 1) + operator_kw + chr;
						}else if (operator_kw == "ON"){
							out_text += "\n" + tab_code.repeat(tab_level + 2) + operator_kw + chr;
						}
					}else{
						out_text += buf_kw + chr;
					}
					buf_kw = "";
					break;
				case "(":
					if (ppdfn_kw.indexOf(buf_kw.toUpperCase() >= 0)){
						ppdfn_start = true;
					}
					pstack.push(i);
					out_text += buf_kw + chr;
					buf_kw = "";
					break;
				case ")":
					
					break;
				case ",":
					if (ppdfn_start){
						out_text += chr;
					}else{
						out_text += "\n " + chr; 
					}
					break;
			}
		}
	};

	return out_text;
};

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};