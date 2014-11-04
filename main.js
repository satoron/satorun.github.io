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
				console.log("push:" + i);
				break;
			case ")":
				if (pstack.length > 0){
					console.log("rmv_list.push:" + pstack[pstack.length-1] + ";i=" + i);
					rmv_list.push(pstack[pstack.length-1]);
					pstack.pop();
					rmv_list.push(i);
				}
				break;
			case " ":
				if (kw = "AND" || kw == "OR"){
					pstack.pop;
				}
				kw = "";
				break;
			default:
				kw += arr_text[i];
		}
	}
	console.log("arr_text");
	for (var i = 0; i < arr_text.length; i++){
		console.log(arr_text[i]);
	}
	console.log("rmv_list");
	for (var i = 0; i < rmv_list; i++){
		console.log(rmv_list[i]);
	}
	console.log("arr_text.length:" + arr_text.length);
	for (var i = 0; i < arr_text.length; i++){
		if (rmv_list.indexOf(i) >= 0) {
			console.log("rmv_list.indexOf:" + i);
			continue;
		}
		rtn_text += arr_text[i];
	}

	return rtn_text;
};

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};