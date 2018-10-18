//All code wrapped in a "$" function. Provided by default. All tests are built into this top-level function.
$(function() {
  //First test suite. Basic functionality checks.
  describe('RSS Feeds', function() {
    //Default test provided with starter code. Checks that allFeeds exist and are not empty.
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    //Checks that the allFeeds array of objects have a URL and that the URL is not empty.
    it('have a URL, URL not empty', function(){
      for (let feed of allFeeds){
      expect(feed.url).toBeDefined();
      expect(feed.url.length).not.toBe(0);
      }
    });

    //Checks that the allFeeds objects have a name and the name is not empty.
    it('have a name, name not empty', function(){
      for (let feed of allFeeds){
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  //Second test suite. Focuses on menu visibility and toggling of visibility.
  describe('The Menu', function(){
    let menu= document.querySelector("body");

    //Checks that the menu is hidden by default; It is hidden if it has the "menu-hidden" class.
    it('is hidden by default', function(){
      expect(menu.classList.contains("menu-hidden")).toBe(true);
    });

    //Checks that the menu changes visibility when menu icon is clicked.
    it('changes visibility on click', function(){
      let iconButton= document.querySelector(".menu-icon-link");

      //Simulates a click on the menu icon to show the menu.
      iconButton.click();
      expect(menu.classList.contains("menu-hidden")).not.toBe(true);
      //Simulates a click on the menu icon to hide the menu.
      iconButton.click();
      expect(menu.classList.contains("menu-hidden")).toBe(true);
    });
  });

  //The feed container is used for the third and fourth suites. Placed in this scope for ease of accesss.
  let feed= document.querySelector(".feed");

  //Third test suite. Asynchonous test to ensure the feeds are not empty.
  describe('Initial Entries', function(){
    //Uses the asynchonous functionality with beforeEach method.
    beforeEach(function(done){
      loadFeed(0, done);
    });
    //Checks that the feed has a child and that the feed child has a class of "entry". Used jQuery to ease selection of elements.
    it('has at least one .entry element', function(){
      let entry= feed.querySelector(".entry");

      expect($('.feed .entry').length).toBeGreaterThan(0);
      expect(entry).toBeDefined();
    });
  });

  //Fourth test suite. Checks that when a new feed is loaded that the content changes.
  describe('New Feed Selection', function(){
    //Declare a variable to hold the value of the first feed when it loads.
    let firstFeed;

    /*Another use of asynchonous tasks. Both firstFeed and secondFeed have the same potential value, but are called at different
    times resulting in different values that can be compared against each other.*/
    beforeEach(function(done){
      loadFeed(0, function(){
        firstFeed= feed.children[0];
        loadFeed(1, done);
      });
    });
    //Checks that firstFeed and secondFeed exist and that they are different.
    it('changes content', function(){
      let secondFeed= feed.children[0];

      expect(firstFeed).toBeDefined();
      expect(secondFeed).toBeDefined();
      expect(firstFeed).not.toBe(secondFeed);
    });
  });
}());
