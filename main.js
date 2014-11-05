function convert(in_text, tab_type){
	
	var out_text = "";
	var rows = in_text.split("\n");
	
	if (tab_type = 0){
		tab_code = "\t";
	}else{
		tab_code = "    ";
	}

	for (var i = 0; i < rows.length; i++){
		var row = rows[i];
		var spos = row.indexOf(" ");
		var row_head = row.substring(0, spos);
		var row_body = row.substring(spos + 1);
		out_text += row_head + " "; 

		if (row_head == "SELECT" || row_head == "SET"){
			var fields = row_body.split(",");
			out_text += "\n" + tab_code + fields[0] + "\n";
			for (var j = 1; j < fields.length; j++){
				out_text += tab_code + ", " + fields[j] + "\n";
			}	
		}else if (row_head == "FROM"){
			row_body = from_break(row_body, " INNER JOIN ", tab_code, 1);
			row_body = from_break(row_body, " LEFT JOIN ", tab_code, 1);
			row_body = from_break(row_body, " RIGHT JOIN ", tab_code, 1);
			row_body = from_break(row_body, " ON ", tab_code, 2);	
			row_body = row_body.replace(/\(|\)/g,"");
			out_text += row_body + "\n";
		}else if (row_head == "WHERE"){
			row_body = parentheses_remove(row_body); 
			row_body = where_break(row_body);
			out_text += row_body + "\n";
		}else{
			out_text += row_body + "\n";
		}
	}

	return out_text;	
};

function from_break(text, keyword, tab_code, tab_count){
	var start_pos = 0;
	var kw_pos = 0;
	kw_pos = text.indexOf(keyword, start_pos);
	var cntr = 0;
	while (kw_pos >= 0){	
		text = text.substring(0, kw_pos) +
					"\n" + tab_code.repeat(tab_count) + text.substring(kw_pos);
		start_pos = kw_pos + 2 + (tab_code.length * tab_count) + keyword.length;
		kw_pos = text.indexOf(keyword, start_pos);
		cntr++;
		if (cntr > 100) break;
	}

	return text;
};

function parentheses_remove(text){
	var arr_text = text.split("");
	var rtn_text = "";
	var pstack = [];
	var rmv_list = [];
	var kw = "";
	for (var i = 0; i < arr_text.length; i++){
		switch (arr_text[i]){
			case "(":
				pstack.push(i);
				break;
			case ")":
				if (pstack.length > 0){
					rmv_list.push(pstack[pstack.length-1]);
					pstack.pop();
					rmv_list.push(i);
				}
				break;
			case " ":
				if (kw = "And" || kw == "Or"){
					pstack.pop;
				}
				kw = "";
				break;
			default:
				kw += arr_text[i];
		}
	};
	for (var i = 0; i < arr_text.length; i++){
		if (rmv_list.indexOf(i) >= 0) {
			continue;
		}
		rtn_text += arr_text[i];
	}

	return rtn_text;
};

function where_break(text){
	var tab_level = 1;
	var rtn_text ="";
	var token = "";
	for (var i = 0; i < text.length; i++){
		if (text[i] == "("){
			rtn_text += text[i] + "\n";
			rtn_text += tab_code.repeat(tab_level);
			tab_level++;
		}else if (text[i] == ")"){
			tab_level--;
			rtn_text += "\n" + tab_code.repeat(tab_level);
			rtn_text += text[i];
		}else if (text[i] == " "){
			if (token == "And" || token == "OR"){
				if (btw_flg){
					btw_flg = false;
				}else{
					rtn_text += "\n" + tab_code.repeat(tab_level);
				}
			}else if (token == "Between"){
				btw_flg = true;
			}
			rtn_text += token + text[i];
			token = "";
		}else{
			token += text[i];
		}
	}
	return rtn_text += token;
};

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};