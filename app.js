//Global variables =====================================================
var topics=["kittens", "bigfoot", "Jane Austen", "sea turtles", "triathlon", "owls", "Harry Potter", 
"sleepy puppies", "the Simpsons", "Doctor Who", "coffee", "the Beatles", "NASA", "rowing", 
"Labyrinth", "popstar"]; 

//Functions===============================================

// Function for displaying topic buttons 
    function renderButtons() {   
        $("#itemButtons").empty();
		//loop for adding buttons modeled after in class example on movie topics
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topicItem");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#itemButtons").append(a);
        }
     }; //end of renderButtons function

// Function to add new topic button
    $("#addItem").on("click", function(event) {

        event.preventDefault();
        var newTopic = $("#item-input").val().trim();
        $("#item-input").val(""); 
        //if statement to prevent duplicate items from being added
        if (topics.indexOf(newTopic)=== -1) {
        topics.push(newTopic);
        renderButtons();
    	} else {return}
      });

//onclick function to get still gifs
    $("#itemButtons").on("click", ".topicItem", function() { 
      $("#itemGifs").empty(); 
      topic = $(this).attr("data-name"); 

      var queryUrl="http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

        $.ajax({
          url: queryUrl, 
          method: "GET"
          }).done(function(response) {
          
           results=response.data; 

            for (var i=0; i<results.length; i++) {
              gifsDiv=$("<div>")
              p=$("<p>"); 
              p.text("Rating: " + results[i].rating);
              topicGifs=$("<img>"); 
              topicGifs.attr("src", results[i].images.fixed_height_still.url);  
              topicGifs.attr("data-still", results[i].images.fixed_height_still.url); 
              topicGifs.attr("data-animate", results[i].images.fixed_height.url);  
              topicGifs.addClass("topicImage");  
              topicGifs.attr("data-state", "still");        
              gifsDiv.append(p); 
              gifsDiv.append(topicGifs); 
              gifsDiv.addClass("gifsDiv"); 
              $("#itemGifs").append(gifsDiv); 
            } // end of for loop
          });  // end of done function response           
    }); // end of topicItem on click function

  //on click function to change gifs to/from animate and still
  $("#itemGifs").on("click", ".topicImage", function() {
      var state= $(this).attr("data-state"); 

        if (state==="still") {
          $(this).attr("src", $(this).attr("data-animate")); 
          $(this).attr("data-state", "animate");         
        } else {                    
            $(this).attr("src", $(this).attr("data-still")); 
            $(this).attr("data-state", "still"); 
        }
  })  // end of itemGifs onclick

//Main process to render initial buttons===============================================
renderButtons()