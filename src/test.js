
var Column_Conflict_At = function( c_index ) {
	var count = 0;
	var ans = false;
	for(var r_Idx = 0; r_Index < this.rows().length; r_Index++){
		var matrix = this.rows();
		matrix[ r_Idx ] [ c_Index ] === 1 && (count++);
	}
	count > 1 && (ans = true);
	return ans;
},

var Column_Conflicts = function() {
	var c_Index = this.get(0).length;
	for( var c_Index = 0; i < c_Index; i++){
		var check = this.Column_Conflict_At( i );
		if(check){ return true; }
	}
	return false;
},


var Row_Conflicts_At = function(r_Index) {
  var count=0;
  var ans = false;
  for(var i=0;i<r_Index.length;i++){
    r_Index[i] === 1 && ( count++ ) ;
  }
  count>1 && ( ans=true )
  return ans
}

    // test if any rows on this board contain conflicts
var Row_Conflicts = function() {
  for(var r_Index = 0; r_Index < this.rows().length; r_Index++){
    var check = this.hasRowConflictAt(this.get(r_Index));
    if(check){ return true; }
  }
  return false;
}

var Column_Conflict_At = function( c_index ) {
	var count = 0;
	var ans = false;
	for(var r_Idx = 0; r_Index < this.rows().length; r_Index++){
		for(var i = 0; i < this.rows().length; i++){
			var matrix = this.rows();
			matrix[ r_Idx + i ] [ c_Index + i] === 1 && (count++);
		}
	}
	count > 1 && (ans = true);
	return ans;
},

var Column_Conflicts = function() {
	var c_Index = this.get(0).length;
	for( var c_Index = 0; i < c_Index; i++){
		var check = this.Column_Conflict_At( i );
		if(check){ return true; }
	}
	return false;
},


var Row_Conflicts_At = function(r_Index) {
  var count=0;
  var ans = false;
  for(var i=0;i<r_Index.length;i++){
    r_Index[i] === 1 && ( count++ ) ;
  }
  count>1 && ( ans=true )
  return ans
}

    // test if any rows on this board contain conflicts
var Row_Conflicts = function() {
  for(var r_Index = 0; r_Index < this.rows().length; r_Index++){
    var check = this.hasRowConflictAt(this.get(r_Index));
    if(check){ return true; }
  }
  return false;
}