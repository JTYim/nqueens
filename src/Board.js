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
    hasRowConflictAt: function(rowIndex) {
      var count=0;
      var ans=false;
      for(var i=0;i<rowIndex.length;i++){
        rowIndex[i] === 1 && ( count++ ) ;
      }
      count>1 && ( ans=true )
      return ans
    },


    hasAnyRowConflicts: function() {
      for(var i = 0; i < this.rows().length; i++){
        var check = this.hasRowConflictAt(this.get(i));
        if(check){
          return true;
        }
      }
      return false;
    },


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


  /*[0,0,1,0],    
    [0,0,0,0],
    [1,0,0,0],
    [0,0,0,0],*/

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var index = majorDiagonalColumnIndexAtFirstRow;
      outerArray = this.rows();
      outerArray.forEach(function(innerArray, i){
        if(innerArray[index] && (outerArray[i])){
          if(innerArray[index] === 1){
            count++;
          }
        }
        index++;
      });
      return count > 1 ? true : false;
    },


    hasAnyMinorDiagonalConflicts: function() {
      var flipReverseMatrix = [];
      var check = false;
      var outerArray = this.rows();
      for(var verticalIndex=0; verticalIndex<this.rows().length; verticalIndex++){
        check === false && ( check = this.hasMajorDiagonalConflictAt(verticalIndex) )
        if(check){
          return check;
        }
      }

      for(var i = 0; i < this.rows().length; i++){
        flipReverseMatrix.unshift(outerArray[i].reverse());
      }
      
      for(var verticalIndex=0; verticalIndex<this.rows().length; verticalIndex++){
        check === false && ( check = this.hasMajorDiagonalConflictAt(verticalIndex) )
      }

      return check;
    },

 
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var index = majorDiagonalColumnIndexAtFirstRow;
      outerArray = this.rows();
      outerArray.forEach(function(innerArray, i){
        if(innerArray[index] && (outerArray[i])){
          if(innerArray[index] === 1){
            count++;
          }
        }
        index++;
      });
      return count > 1 ? true : false;
    },


    hasAnyMajorDiagonalConflicts: function() {
      var flipReverseMatrix = [];
      var check = false;
      var outerArray = this.rows();
      for(var verticalIndex=0; verticalIndex<this.rows().length; verticalIndex++){
        check === false && ( check = this.hasMajorDiagonalConflictAt(verticalIndex) )
        if(check){
          return check;
        }
      }

      for(var i = 0; i < this.rows().length; i++){
        flipReverseMatrix.unshift(outerArray[i].reverse());
      }
      
      for(var verticalIndex=0; verticalIndex<this.rows().length; verticalIndex++){
        check === false && ( check = this.hasMajorDiagonalConflictAt(verticalIndex) )
      }

      return check;
    }

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
