// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count=0;
      var ans=false;
      for(var i=0;i<rowIndex.length;i++){
        rowIndex[i] === 1 && ( count++ ) ;
      }
      count>1 && ( ans=true )
      return ans
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for(var i = 0; i < this.rows().length; i++){
        var check = this.hasRowConflictAt(this.get(i));
        if(check){
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      var ans = false;
      for(var rIndex = 0; rIndex < this.rows().length; rIndex++){
        var matrix = this.rows();
        matrix[rIndex][colIndex] === 1 && (count++);
      }
      count > 1 && (ans = true);
      return ans;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var colIndex = this.get(0).length;
      for(var i = 0; i < colIndex; i++){
        var check = this.hasColConflictAt(i);
        if(check){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict


            /*[ [0,0,1,0,0],    
                [0,0,0,0,1],
                [0,1,0,0,0],
                [0,0,0,1,0],
                [1,0,0,0,0] ]  */


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var ans = false;
      var c_Idx = majorDiagonalColumnIndexAtFirstRow  
      matrix[0] [c_Idx] === 1 && ( count++ );
      for(var r_Idx = c_Idx; r_Idx < this.rows().length; r_Idx++){ // loops through each row
          matrix[ r_Idx + 1 ] [ c_Idx + 1] === 1 && (count++);
          //console.log("matrix[r_Idx + 1][c +1]", matrix[ r_Idx + 1 ] [ c_Idx + 1]);
      }

      // for(var i = 0; i < diagLength; i++){ // loops through each column
      //   var matrix = this.rows();
      //   if(matrix[ r_Idx + i ] [ i ]){
      //     matrix[ r_Idx + i ] [ i ] === 1 && (count++);
      //   }
        //console.log("matrix[r_Idx + i][i]", matrix[ r_Idx + i ] [ i ]);
      // }

      count > 1 && (ans = true);
      return ans;
      
      /*var count = 0;
      var ans = false;
      for(var r_Idx = 0; r_Idx < this.rows().length; r_Idx++){
        for(var i = 0; i < this.rows().length; i++){
          var matrix = this.rows();
          matrix[ r_Idx + i ] [ i ] === 1 && (count++);
        }
      }
      count > 1 && (ans = true);
      return ans;*/
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var count = 0;
      var ans = false;
      var diagLength = this.rows().length
      for(var r_Idx = 0; r_Idx < this.rows().length; r_Idx++){ // loops through each row
        for(var i = 0; i < diagLength; i++){ // loops through each column
          var matrix = this.rows();
          if(matrix[ r_Idx + i ] [ i ]){
            matrix[ r_Idx + i ] [ i ] === 1 && (count++);
          }
          console.log("matrix[r_Idx + i][i]", matrix[ r_Idx + i ] [ i ]);
        }
         diagLength--;
      }
      count > 1 && (ans = true);
      return ans;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
