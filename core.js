function convert(in_text, tab_type){
	var arr_text = in_text.split("");
	var out_text = "";
	var section_kw = "";
	var buf_kw = "";

	if (tab_type = 0){
		tab_code = "\t";
	}else{
		tab_code = "    ";
	}

	for (var i = 0; i < arr_text.length; i++) {
		if (arr_text[i] == " "){
			if (primary_kw.indexOf(buf_kw.toUpperCase()) >= 0){

			}
		}
	};

	return out_text;
};