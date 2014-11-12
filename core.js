function convert(in_text, tab_type){
	var arr_text = in_text.split("");
	var out_text = "";
	var section_kw = "";
	var operator_kw = "";
	var buf_kw = "";
	var tab_code = "";
	var tab_level= 0;
	var literal_start = false;

	if (tab_type = 0){
		tab_code = "\t";
	}else{
		tab_code = "    ";
	}

	for (var i = 0; i < arr_text.length; i++) {
		var chr = arr_text[i];
		if (literal_start == false){
			if (chr == " "){
				if (primary_kw.indexOf(buf_kw.toUpperCase()) >= 0){
					section_kw = buf_kw.toUpperCase();
					buf_kw = "";
					if (out_text == ""){
						out_text += section_kw + chr;
					}else{
						out_text += "\n" + section_kw + chr;
					}
				}else if (secondary_kw.indexOf(buf_kw.toUpperCase()) >= 0){
					operator_kw = buf_kw.toUpperCase();
					if (operator_kw == "INNER" || 
						operator_kw == "LEFT" ||
						operator_kw == "RIGHT" ||){
						out_text += "\n" + tab_code.repeat(tab_level + 1) + operator_kw + chr;
					}
				}
			}else if (chr == ","){
				out_text
			}
		}
	};

	return out_text;
};

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};