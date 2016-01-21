
//this.rows() === whole matrix
var arr5 =    [ [0,0,1,0,0],    // this.get(0)
                [0,0,0,0,1],
                [0,1,0,0,0],
                [0,0,0,1,0],
                [1,0,0,0,0] ]         // this.get(x.length-1)


[[0, 0, 1, 0, 0][0, 0, 0, 0, 1][0, 1, 0, 0, 0][0, 0, 0, 1, 0][1, 0, 0, 0, 0]];
//every 4th and 6th before and after should be empty
//every n - 1 and n + 1 should be empty
//n = 5 in this case
for(var i = 0; i < this.rows().length; i+=((this.rows().length)+1))
  j=(i-2)

var arr4 =    [ [0,1,0,0]
                [0,0,0,1]
                [1,0,0,0]
                [0,0,1,0] ]

[[0, 1, 0, 0][0, 0, 0, 1][1, 0, 0, 0][0, 0, 1, 0]]
//every 3rd and 5th should be empty
//every n - 1 and n + 1 should be empty
//n = 4 in this case
//for each element, iterate to 4th and 6th element and check if 1 or 0
  //if 1, return false
  //if no 1s, return true


var arr6 =     [[0,0,1,0,0,0]
                [0,0,0,1,0,0]
                [0,0,0,0,0,1]
                [1,0,0,0,0,0]
                [0,0,0,0,0,0]
                [0,0,0,1,0,0]]


[1,2,3]
[]  
for(var rIndex=0)
  arr[rIndex][cIndex]

var count = 0;
var ans = false;
for(var rIndex = 0; rIndex < this.rows().length; rIndex++){
  var matrix = this.rows();
  matrix[rIndex][colIndex] === 1 && (count++);
}
count > 1 && (ans = true);
return ans;

hasRowConflictAt: function(rowIndex) {
  var count=0;
  var ans=false;
  for(var i=0;i<rowIndex.length;i++){
    rowIndex[i] === 1 && ( count++ ) ;
  }
  count>1 && ( ans=true )
  // count===0
  return ans
}

// test if any rows on this board contain conflicts
hasAnyRowConflicts: function() {
  for(var eachRow = 0; eachRow < this.rows().length; eachRow++){
    var check = this.hasRowConflictAt(this.get(eachRow));
    console.log("check", check);
    this.get("this.get", this.get);
    if(check){
      console.log("here");
      return true;
    }
  } 
  return false;
}

  // this.rows().forEach(function(e,i, arr){
  //   var ans = this.hasRowConflictAt( this.get(e) )  
  // })
