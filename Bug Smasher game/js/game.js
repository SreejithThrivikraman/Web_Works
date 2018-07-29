

      var ctx = null;
      var x_icon = 0;
      var y_icon = 0;
      var stepX = 1;
      var stepY = 1;
      var size_x = 23;
      var size_y = 22;
      var canvas_size_x = 1420;
      var canvas_size_y = 700;
      var bug_image = null;
      var background_image = null;
      var replacable_string = "";
      var speed = 10;

      var score = 0;
      var canvas = null;
      var speed_flag = false;
      var game_flag = false;


      function draw()

      {
        var interval_id = 0;
        canvas      = document.getElementById("Game_Canvas");


        ctx = canvas.getContext("2d");

        if(speed_flag)
        {
          clearInterval(interval_id);
          speed = speed + 10;
          speed_flag = false;
          alert("hello");

        }

        if(game_flag)
        {
          score = 0;
          $('#score').replaceWith("<h2 id= 'score' class='title is-4'>Score : "+ score +"</h2>");
          game_flag = false;
          alert("good bye");

        }


        bug_image = new Image(size_x, size_y);
        bug_image.src = 'images/bug.png';
        bug_image.onload = function()
        { interval_id = setInterval('myAnimation()', speed);
        }
       bug_image.src = 'images/bug.png';

       background_image = new Image(size_x, size_y);
       background_image.src = 'images/bug.png';
       background_image.src = 'leaf.jpg';


       canvas.addEventListener("click", function(e){


         // main logic for identifying catching the bug, score calculation and speed increment.

         // if  ( (   (e.pageX == x_icon) || (   (e.pageX < x_icon + 20) && (e.pageX > x_icon - 100)   )  )  &&
         // ((e.pageY == y_icon) || ((e.pageY < y_icon + 100) && (e.pageY > y_icon -80))))

         if   ( (e.pageX == x_icon) || ( (e.pageX < x_icon + 20) && (e.pageX > x_icon - 100) ) )

         {
           alert("Grrrr !!! you caught me 😡😡");
           speed = speed - 10;
           score = score + 1;
           $('#score').replaceWith("<h2 id= 'score' class='title is-4'>Score : "+ score +"</h2>");
           draw();

         }

         else
         {
            alert("Hahaha you missed me 😛 😛 ")
         }



      });

         // debugginh code : uncomment the below code for debugging.
        // alert("x = "+e.pageX+ " y = " + e.pageY + "other x =" + x_icon + "other y = " + y_icon + "speed =" + speed);



      }


      function myAnimation()
       {
        ctx.clearRect(0, 0, canvas_size_x, canvas_size_y);
        if (x_icon < 0 || x_icon > canvas_size_x - size_x) {stepX = -stepX; }
        if (y_icon < 0 || y_icon > canvas_size_y - size_y) {stepY = -stepY; }
             x_icon += stepX;
             y_icon += stepY;

          ctx.drawImage(background_image, 0, 0);
          ctx.drawImage(bug_image, x_icon, y_icon);
       }

       // function to reset the score to 0.
       function reset_game()
       {
         alert("game resetted");

         game_flag = true;
         draw();
       }

       // function to reset the speed of game to 10.
       function reset_speed()
       {
         alert("speed resetted");
         speed_flag = true;
         draw();
       }
