// Generated by CoffeeScript 1.4.0
(function() {
  var Controls, PageController, Trainer, WordsCollection,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageController = (function() {

    function PageController() {
      var controls, trainer;
      trainer = new Trainer;
      controls = new Controls;
      $(controls).on("started", function(event, words, interval) {
        return trainer.start(words, interval);
      });
      $(controls).on("paused", function() {
        return trainer.pause();
      });
      $(controls).on("resumed", function(event, interval) {
        return trainer.resume(interval);
      });
    }

    return PageController;

  })();

  Controls = (function() {

    function Controls() {
      this.togglePause = __bind(this.togglePause, this);

      this.start = __bind(this.start, this);
      this.el = $("#controls");
      $("#start", this.el).on("click", this.start);
      $("#pause", this.el).on("click", this.togglePause);
    }

    Controls.prototype.start = function() {
      this.isPaused = false;
      $("#pause", this.el).html("Pause");
      return $(this).trigger("started", [this.getWordsArray(), this.getInterval()]);
    };

    Controls.prototype.pause = function() {
      this.isPaused = true;
      $("#pause", this.el).html("Resume");
      return $(this).trigger("paused");
    };

    Controls.prototype.resume = function() {
      this.isPaused = false;
      $("#pause", this.el).html("Pause");
      return $(this).trigger("resumed", [this.getInterval()]);
    };

    Controls.prototype.togglePause = function(event) {
      if (this.isPaused) {
        return this.resume();
      } else {
        return this.pause();
      }
    };

    Controls.prototype.getWordsArray = function() {
      return this.getWords().toArray();
    };

    Controls.prototype.getWords = function() {
      this.words = this.getWordsCollection();
      this.prepareWordsCollection();
      this.words.errorCheck();
      return this.words;
    };

    Controls.prototype.prepareWordsCollection = function() {
      if (this.parseSelectedOptions().delimiter) {
        this.words.delimit($("#worddelimiter", this.el).val());
      }
      if (this.parseSelectedOptions().reverse) {
        return this.words.reverse();
      }
    };

    Controls.prototype.getWordsCollection = function() {
      return new WordsCollection($("textarea", this.el).val().split(" "));
    };

    Controls.prototype.getInterval = function() {
      return 60 / parseInt($("#wpm", this.el).val()) * 1000;
    };

    Controls.prototype.parseSelectedOptions = function() {
      return {
        delimiter: this.getDelimiterOption(),
        reverse: this.getReverseOption()
      };
    };

    Controls.prototype.getDelimiterOption = function() {
      return $("#delimit", this.el).hasClass("active");
    };

    Controls.prototype.getReverseOption = function() {
      return $("#backwards", this.el).hasClass("active");
    };

    return Controls;

  })();

  WordsCollection = (function() {

    function WordsCollection(words) {
      this.words = words;
    }

    WordsCollection.prototype.delimit = function(delimiter) {
      console.log(delimiter);
      this.words = this.words.join(" " + delimiter + " ").split(" ");
      return console.log(this.words);
    };

    WordsCollection.prototype.reverse = function() {
      this.words.reverse();
      return console.log("Reverse ran");
    };

    WordsCollection.prototype.errorCheck = function() {
      var word, _i, _len, _ref;
      this.approvedWords = [];
      _ref = this.words;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        if (word) {
          this.approvedWords.push(word);
        }
      }
      this.words = this.approvedWords;
      return console.log(this.words);
    };

    WordsCollection.prototype.toArray = function() {
      return this.words;
    };

    return WordsCollection;

  })();

  Trainer = (function() {

    function Trainer() {
      this.displayNextWord = __bind(this.displayNextWord, this);
      this.el = $("#trainer");
    }

    Trainer.prototype.start = function(words, interval) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.currentWordIndex = 0;
      this.words = words;
      return this.interval = setInterval(this.displayNextWord, interval);
    };

    Trainer.prototype.pause = function() {
      return clearInterval(this.interval);
    };

    Trainer.prototype.resume = function(interval) {
      return this.interval = setInterval(this.displayNextWord, interval);
    };

    Trainer.prototype.displayNextWord = function() {
      $("#word", this.el).html(this.words[this.currentWordIndex]);
      return this.currentWordIndex += 1;
    };

    return Trainer;

  })();

  new PageController();

}).call(this);
