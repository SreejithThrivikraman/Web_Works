var user_name = "";
var logged_in_flag = true;
var task ="";
var popped_up_flag = false;
var todo_item_no = 0;

function auto()
{
     json_operations();
     startTime();
     backgr();
     initialize();
}

function backgr()
{
    var backimg = ["images/pic.jpg","images/pic2.jpeg","images/pic3.jpeg"];
    var randimg = Math.floor(Math.random()*3);
    document.body.background = backimg[randimg];
    setInterval(backgr,30000);
}

function startTime()
  {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("current_time").innerHTML =
    h + ":" + m + ":" + s;

    // greeting messages.
    if ((h > 12) && (h < 18))
    {
      document.getElementById("greeting_time_msg").innerHTML = "afternoon,";
    }
    else if ((h >= 18) && (h <= 23))
    {
       document.getElementById("greeting_time_msg").innerHTML = "evening,";
    }
    else
    {
       document.getElementById("greeting_time_msg").innerHTML = "morning,";
    }

    var t = setTimeout(startTime);
  }

function checkTime(i)
  {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

function check_key()
  {
    if(event.keyCode === 13)
    {
      if(logged_in_flag == true)                  // if the user is already logged in.
      {
        task = $("input#focuses").val();
        localStorage.setItem("task_name1",task);

        HTML_content = "<h2 id='focuses' style='display:inline;border:none;font-family: Arial, Helvetica, sans-serif;'>"+ task +"  </h2>"
        $("#focuses").replaceWith(HTML_content);
        $("#hidden").show();
        $("#hidden_chk").show();
        $("#hidden_but").show();
      }

      /* code to show the greeting with the user's name */
      else
      {
            //  alert("name is to be displayed");

          $("#greeting").show();
          var userName = $("input#focuses").val();
          $("#user_name").replaceWith(userName);
          localStorage.setItem("focus_name_temp_4",userName);

          $("h3:first").replaceWith("<h3>What is your main focus for today?</h3>");
          $("#focuses").val('');
          logged_in_flag = true;

      }

    }

 }

function json_operations()
{
  var xhr = new XMLHttpRequest();
  getLocation();

  var lat = localStorage.getItem("lat");
  var lon  = localStorage.getItem("lon");

  url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3b887932d40c57775ab6a7f8ee55a44f";
  xhr.open('GET', url,true);
  xhr.send();

  xhr.onreadystatechange = processRequest;


  function processRequest(e)
    {
      if (xhr.readyState == 4 && xhr.status == 200)
      {
          var response = JSON.parse(xhr.responseText);
          document.getElementById("label_location").innerHTML = response.name;
          document.getElementById("temp").innerHTML = Math.round(response.main.temp - 273.15);    // converting kelvin to celcius.


           // icon changing code

          // switch (JSON.stringify(response.weather.main))
          // {
          //   case Clouds:
          //   {
          //
          //     $("#icon").attr("src", "images/cloudy.png");
          //
          //     break;
          //   }
          //   case clear sky:
          //   {
          //     var HTML_content = "<img id="\"icon"\" src ="\"images/sunny.png"\">";
          //       $("#icon").attr("src", "images/sunny.png");
          //     break;
          //   }
          //
          // }
      }
    }
}

function getLocation()
{
    if (navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position)
{
    localStorage.setItem("lat",position.coords.latitude);
    localStorage.setItem("lon",position.coords.longitude);
}


function initialize()
{
    user_name = localStorage.getItem("focus_name_temp_4");
    if(user_name == null)   // if the user is not logged in
    {
       $("#greeting").hide();
      // $("h3:first").replaceWith("Hello, what's your name ?");
      $("h3:first").replaceWith("<h3>Hello, what's your name ?</h3>");
      // <h3 id="logged_in">What is your main focus for today?</h3>
      logged_in_flag = false;

    }
    else                      // case when the user is already logged in.
    {
      //alert(user_name);

      $("#greeting").show();
      $(hidden_chk).hide();
      $(hidden_but).hide();

      var userName = localStorage.getItem("focus_name_temp_4");
      var loaded_task = localStorage.getItem("task_name1");
      $("#user_name").replaceWith(userName);
    //  $("h3:first").replaceWith("<h3>What is your main focus for today?</h3>");

        if((loaded_task == "")||(loaded_task==null))
        {
          $("#focuses").val('');
         $(hidden_chk).hide();
        }
        else
        {
          HTML_content = "<h2 id='focuses' style='display:inline;border:none;font-family: Arial, Helvetica, sans-serif;'>"+ loaded_task +"  </h2>";


          $("#focuses").replaceWith(HTML_content);
          $("#hidden").show();
          $("#hidden_chk").show();
          $("#hidden_but").show();
        }
    }
}


function checkbox_change()
{
  if(document.getElementById('hidden_chk').checked)
  {
   // checkBox is checked.
   // HTML_content = "<h2 id= 'focuses'> <s>"+ task +"  </s></h2>";
   HTML_content = "<h2 id='focuses' style='display:inline;font-family: Arial, Helvetica, sans-serif;border:none'> <s>"+ task +"</s></h2>";
   $("#focuses").replaceWith(HTML_content);

  }
  else
  {
   // Not checked.
   HTML_content = "<h2 id='focuses' style='display:inline;font-family: Arial, Helvetica, sans-serif;border:none'>"+ task +"</h2>";
   $("#focuses").replaceWith(HTML_content);
  }
}

// check-box operation in the pop-up menu.
function pop_up_checkbox_change(id)
{
  if(document.getElementById('pop_chk').checked)
  {
   // checkBox is checked.

   HTML_content = '<li> <span id="+id+"><input id="pop_chk" type="checkbox" onchange="pop_up_checkbox_change(this.parentNode.id)"></input> <h2><s>'+item_list+'</s> </h2> <button id="bingo" type="button" onclick="popup_delete_task(this.parentNode.id)">X</button></span></li>';

   //$(ul_pop_up).append('<li> <span id='+todo_item_no+'><input id="pop_chk" type="checkbox" style="display:inline;" onchange="pop_up_checkbox_change(this.parentNode.id)"></input> <div id="text" style="display:inline;">'+item_list+'</div> <button id="bingo" type="button" onclick="popup_delete_task(this.parentNode.id)">X</button></span></li>');



   var id = $('#'+id).closest('span').attr('id');

   $('#'+id).replaceWith(HTML_content);
  }
  else
  {
   // Not checked.
   HTML_content = "<ul><li> "+ task +"  </li></ul>";
   $("ul:first").replaceWith(HTML_content);
  }
}

function delete_task()
{
  $("#greeting").show();
  $(hidden_chk).hide();
  $(hidden_but).hide();

  var userName = localStorage.getItem("focus_name_temp_4");
  localStorage.setItem("task_name1","");
  $("#user_name").replaceWith(userName);
  $("#focuses").replaceWith("<input id='focuses' type='text' onkeypress='check_key()''></input>");


}


// todo - list
function pop_up_logic()
{
  if(popped_up_flag == true)
  {
    $("#pop").hide();
    popped_up_flag= false;

  }
  else
  {
    $("#pop").show();
    popped_up_flag = true;
  }

}

// check_key_pop() will add the new element to the list.
function check_key_pop()
{
    if(event.keyCode === 13)
    {
      var item_list = $("input#pop_up_input").val();
       $(ul_pop_up).append('<li> <span id='+todo_item_no+'><input id="pop_chk" type="checkbox" style="display:inline;" onchange="pop_up_checkbox_change(this.parentNode.id)"></input> <div id="text" style="display:inline;">'+item_list+'</div> <button id="bingo" type="button" onclick="popup_delete_task(this.parentNode.id)">X</button></span></li>');
      var li = document.createElement("list");
    //  li.appendChild('<span id='+todo_item_no+'><input id="pop_chk" type="checkbox" style="display:inline;" onchange="pop_up_checkbox_change(this.parentNode.id)"></input> <div id="text" style="display:inline;">'+item_list+'</div> <button id="bingo" type="button" onclick="popup_delete_task(this.parentNode.id)">X</button></span>');
    //  $(ul_pop_up).appendChild(li);
      $("#pop_up_input").val('');
      todo_item_no = todo_item_no + 1;
    }
}

// deleting the element from the ul list
function popup_delete_task(id)
{
    var id = $('#'+id).closest('span').attr('id');
    $('#'+id).remove();
}
