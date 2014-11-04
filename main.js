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

String.prototype.repeat = function(num) {
	for (var str = ""; (this.length * num) > str.length; str += this);
	return str;
};