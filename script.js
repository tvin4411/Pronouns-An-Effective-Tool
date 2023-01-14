//The following code is entirely inspired from Week 11's tutorial where we are taught how to filter the large amount of data in the csv's based on string values
//Reference: Alex Elton-Pym. (May 17, 2021). "week_11_tutorial_material/climate". Retrieved from https://canvas.sydney.edu.au/courses/30967/modules/items/1185684
//The function will combine and filer the data from trump and data tweets to the search tags I assigned to it
function combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama) {
  //add tsne data to trump and obama tweets
  trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
  obama_tweets = obama_tweets.map((obama_tweet, index) => Object.assign(obama_tweet, tsne_data_obama[index]))

  //adds an author property
  for (let tweet of trump_tweets) {
    tweet.author = "Trump"
  }
  for (let tweet of obama_tweets) {
    tweet.author = "Obama"
  }
  //combine all tweets into one array
  let tweets = [...trump_tweets, ...obama_tweets];
  //only include tweets containing one of these strings
  //I have added spaces besides the string value so to not include words that these values be within
  gun_topic = [" gun", "gun violence", "gun control", " shooting", "mass shooting", "rifle", "firearms", " AFK", " shotgun"]
  all_pronouns = [" I ", " me ", " my ", " you ", " we ", " us ", " our ", " they ", " them "]

  let tweets_gun = tweets.filter(tweet => gun_topic.some(topic => tweet.text.includes(topic))); //reduces the tweets to be gun topic releated as pronoun usage is quite significant and so focusing on one area can be less overwhelming (also for the sentimentGraph)
  let tweets_pronouns = tweets_gun.filter(tweet => all_pronouns.some(topic => tweet.text.includes(topic))); //typeGraph - filters from the gun_topic filter further by finding the ones that have pronouns in it

  return { //Reference: Joel Flanagan. (May 31, 2021). 'return multiple filters'. Retrieved from slack # the-remote-boat
    pronouns: tweets_pronouns,
    gunSentiment: tweets_gun
  }; 
}

//sentimentGraph: a line graph showing sentiment value of the tweets by each presidents that relate to gun violence and gun control with annotations of key events 
function sentimentGraph(gunSentiment) {
  var data = [{
    y: gunSentiment.map(d => d.y),
    hovertemplate: gunSentiment.map(d => convertToParagraph('<b>' + d.datetime + '</b><br>' + d.text + '<b> - ' + d.author + '<extra></extra>', 64)),
    mode: 'lines+markers',
    line: { color: 'rgb(197, 161, 61)' },
    marker: {
      color: gunSentiment.map(d => d.author=="Trump"?0:1), //color 0 if trump, 1 if obama
      colorscale: [ //custom color scheme
        ['0.0', '#FF4242'],
        ['1.0', '#95D2EC'],
      ],
      size: 10,
    },
  }];

  var layout = {
    hovermode: "closest", //hover closest by default
    xaxis: { visible: false, autorange: 'reversed'  },
    yaxis: { visible: true, },
    title: {
      text: '<b>Obama vs. Trump <br> Sentiment Value of Gun Topic Tweets (2011-2020)</b>',
      font: {size: 25}
    },
    modebar: { orientation: 'v' },
    // Reference: plotly. (2021). 'Text and Annotations in JavaScript'. Retrieved from https://plotly.com/javascript/text-and-annotations/
    // The annotations were gathered from the following websites:
    // - Reference: Longley, R. (May 2, 2020). 'Timeline of Gun Control in the United States'. ThoughtCo. Retrieved from https://www.thoughtco.com/us-gun-control-timeline-3963620
    // - Reference: Evon, D. (March 23, 2021). 'Did US Have No Mass Shootings Under Trump?'. Snopes. Retrieved from https://www.snopes.com/fact-check/mass-shootings-under-trump/
    // - Reference: Canipe, C. & Hartman, T. (May 31, 2021). 'A timeline of mass shootings in the U.S.'. Reuters Graphics. Retrieved from https://graphics.reuters.com/USA-GUNS/MASS-SHOOTING/nmovardgrpa/
    annotations: [
      {
        x: 185,
        y: 40,
        xref: 'x',
        yref: 'y',
        text: '<b>February 2010:</b> Federal law signed by Obama<br>for licensed gun owners to bring firearms<br>into national parks and wildlife.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -50
      }, 
      {
        x: 182,
        y: -40,
        xref: 'x',
        yref: 'y',
        text: '<b>2012:</b> Total deaths is 71 and<br>at least 80 are injured.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: 50
      }, {
        x: 90,
        y: -40,
        xref: 'x',
        yref: 'y',
        text: '<b>9th December 2013:</b> Extension on the Undetectable Firearms Act<br>of 1988 - guns must contain enough metal to be detected.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: 70
      }, {
        x: 85,
        y: 40,
        xref: 'x',
        yref: 'y',
        text: '<b>29th July 2015:</b> Fix Gun Checks Act -<br>background checks for all gun sales.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -30
      }, {
        x: 75,
        y: -10,
        xref: 'x',
        yref: 'y',
        text: '<b>12th June 2016:</b> Pulse Nightclub shooting<br>in Orlando, Florida (49 victims).',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: 55
      },  {
        x: 20,
        y: 30,
        xref: 'x',
        yref: 'y',
        text: '<b>November 2017:</b> 26 people were killed at a<br>church in Sutherland Springs, Texas.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -70
      }, {
        x: 55,
        y: -20,
        xref: 'x',
        yref: 'y',
        text: '<b>August 2019:</b> Three mass shootings resulted in <br>Congress pushing new gun control measures.',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: 70
      },
    ]
  }

  //This configuration will show the modebar all the time and also removes some buttons
  //Reference: plotly. (2021). 'Configurations Options in JavaScript - Remove the Modebar Buttons'. Retrieved from https://plotly.com/javascript/configuration-options/#remove-modebar-buttons
  var config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'toggleSpikelines']
  }

  Plotly.newPlot('sentimentGun', data, layout, config);
}

// I wanted the pronouns to show when the specific type is clicked. I learnt how to do this using the display attribute in javascript to toggle between none and block
// Reference: w3schools. (n.d.). "How TO - Toggle Hide and Show". Retrieved from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function openPersonal() {
  var x = document.getElementById("pronounP1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("pronounP2");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}
function openObject() {
  var x = document.getElementById("pronounO1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("pronounO2");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}
function openPossessive() {
  var x = document.getElementById("pronounS1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("pronounS2");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}
function openReflexive() {
  var x = document.getElementById("pronounR1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("pronounR2");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

//This jquery code is used to ensure that once a user interacts (clicks on) with the gender pronouns graph that it will not move when unhovered.
//Reference: Ionut. (January 31, 2017). 'How do I make a div with :hover stay in hover state on click?'. stackoverflow. Retrieved from https://stackoverflow.com/questions/41959779/how-do-i-make-a-div-with-hover-stay-in-hover-state-on-click
$('.note').on('click', function() {
  $(this).addClass('active');
});
//The following code is based upon Rob Dongas' Dropdown interaction slide in the Interactions and Animations on Plotly.js presentation shown during the Week 10 tutorial
//The code will read through the customised csv I made based on the twitter data containing tweets from the presidents with the date, sentiment and gender pronoun specificed in the tweet
//Reference: Dongas, R. (May 10, 2021). 'DECO3100 - Plotly.js - Interactions and Animations'. Retrieved from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/2/6
var csvData;
var allGenderPronouns;
var listofTweets = [];
var tweetSelector = document.querySelector(".tweetdata");
// gproGraph: A small scatter graph showing the presidents use of gender pronouns in their tweets
Plotly.d3.csv("potus_twitter_project_CSV/POTUS_gender_pronouns.csv",
  function (csvResults) {
    csvData = csvResults;
    allGenderPronouns = unpack(csvData, "genderpronoun");

    for (var i = 0; i < allGenderPronouns.length; i++) {         //for all of the gender pronouns found in csv (already designated manually for each tweet)
      if (listofTweets.indexOf(allGenderPronouns[i]) === -1) {   //if they are not already in the array
        listofTweets.push(allGenderPronouns[i]);                 //add them to the array
      }
    }
    //Pass the tweet list and HTML select element to create the options
    assignOptions(listofTweets, tweetSelector);
    //call the make plot function using the global csvData variable, and a default gender pronoun
    genderPronouns(csvData, "her");
  }
);
//create the DOM elements for the gender pronoun options for a given array and HTML select element
function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length; i++) {
    var currentOption = document.createElement("option");
    currentOption.text = textArray[i];
    selector.appendChild(currentOption);
  }
}
//Add the event listener for when the user selects a different gender pronoun 
tweetSelector.addEventListener("change", updatePronoun, false);
//Remake the plot if the gender pronoun option changes - based on above event listener
function updatePronoun() {
  genderPronouns(csvData, tweetSelector.value);
}
//get all the values from the csv given the column heading (key)
function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}
function genderPronouns(csvData, currentPronoun) {
  let tweetsG = csvData.filter((d) => d.genderpronoun == currentPronoun); //UPDATED with currentPronoun

  let data = [{
    x: tweetsG.map((d) => d.datetime), //xaxis of tweets are positioned based on date and time chronologically (left to right)
    y: tweetsG.map((d) => d.sentiment), //yaxis of tweets are positioned based on sentiment level (top = positive, bottom = negative)
    customdata: tweetsG.map(d => convertToParagraph("<b>" + d.president + ":</b><br>" + d.datetime + "<br>" + d.tweet, 64)),
    marker: {
      color: tweetsG.map(d => d.president == "Trump" ? 0 : 1), //color 0 if trump, 1 if obama
      size: 10,
      colorscale: [ //custom color scheme
        ['0.0', '#FF4242'],
        ['1.0', '#95D2EC'],
      ],
      line: { color: 'white', width: 2 }
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }];

  let layout = {
    hovermode: "closest", //hover closest by default
    xaxis: { visible: false },
    yaxis: { title: '<b>Sentiment<b>', font: {size: 25} },
    margin: {
      l: 45,
      r: 10,
      t: 10,
      b: 10,
    },
    font: { color: 'white', family: 'Georgia' },
    plot_bgcolor: '#8b9ca1',
    paper_bgcolor: '#8b9ca1'
  }

  Plotly.newPlot('gproGraph', data, layout, { displayModeBar: false });  //Reference: plotly. (2021). 'Configurations Options in JavaScript - Never Display the Modebar'. Retrieved from https://plotly.com/javascript/configuration-options/#never-display-the-modebar
}

// TypeScatter - A large scatter graph that shows the different pronouns the president used in their tweets relating to gun violence and control
function typeGraph(tweets_pronouns) {
  //for loop goes through the tweets_pronoun filter and finds ones' that has a specific pronoun and puts it into their corresponding list
  //this is so I can destigate the tweets colour by what pronoun is being used
  let I_list = [], me_list = [], my_list = [], you_list = [], we_list = [], us_list = [], our_list = [], they_list = [], them_list = [];
  for (i = 0; i < tweets_pronouns.length; i++) {
    if (tweets_pronouns[i].text.includes(' I ') === true) {
      I_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' me ') === true) {
      me_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' my ') === true) {
      my_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' you ') === true) {
      you_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' we ') === true) {
      we_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' us ') === true) {
      us_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' our ') === true) {
      our_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' they ') === true) {
      they_list.push(tweets_pronouns[i])
    }
    if (tweets_pronouns[i].text.includes(' them ') === true) {
      them_list.push(tweets_pronouns[i])
    }
  }
  //The following for loop will look through the tweet_pronouns list and find if they match the conditions of having:
    // - specified author of tweet
    // - any inclusion of the a specified pronoun
  //and if true put them in their respective list. This is so I can distinguish each marker in the scatter plot by colour for when switching between just looking at trump tweets or just obama tweets (just like the first for loop, which sees both presidents tweets together)
  let trump_I = [], trump_me = [], trump_my = [], trump_you = [], trump_we = [], trump_us = [], trump_our = [], trump_they = [], trump_them = []; //Trump pronoun lists
  let obama_I = [], obama_me = [], obama_my = [], obama_you = [], obama_we = [], obama_us = [], obama_our = [], obama_they = [], obama_them = []; //Obama pronoun lists
  //The for loop will also count the number of trump and obama tweets within the tweet_pronouns array
  //Reference: Jacobsen, T. (May 25, 2011). 'How to count certain elements in array?'. stackoverflow. Retrieved from https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array  
  let trumpCount_I = 0, trumpCount_me = 0, trumpCount_my = 0, trumpCount_you = 0, trumpCount_we = 0, trumpCount_us = 0, trumpCount_our = 0, trumpCount_they = 0, trumpCount_them = 0;
  let obamaCount_I = 0, obamaCount_me = 0, obamaCount_my = 0, obamaCount_you = 0, obamaCount_we = 0, obamaCount_us = 0, obamaCount_our = 0, obamaCount_they = 0, obamaCount_them = 0;  

  for (j = 0; j < tweets_pronouns.length; j++) {
    if (tweets_pronouns[j].author == "Trump") {
      if (tweets_pronouns[j].text.includes(' I ') === true) {
        trump_I.push(tweets_pronouns[j])
        trumpCount_I++;
      }
      if (tweets_pronouns[j].text.includes(' me ') === true) {
        trump_me.push(tweets_pronouns[j])
        trumpCount_me++;
      }
      if (tweets_pronouns[j].text.includes(' my ') === true) {
        trump_my.push(tweets_pronouns[j])
        trumpCount_my++;
      }
      if (tweets_pronouns[j].text.includes(' you ') === true) {
        trump_you.push(tweets_pronouns[j])
        trumpCount_you++;
      }
      if (tweets_pronouns[j].text.includes(' we ') === true) {
        trump_we.push(tweets_pronouns[j])
        trumpCount_we++;
      }
      if (tweets_pronouns[j].text.includes(' us ') === true) {
        trump_us.push(tweets_pronouns[j])
        trumpCount_us++;
      }
      if (tweets_pronouns[j].text.includes(' our ') === true) {
        trump_our.push(tweets_pronouns[j])
        trumpCount_our++;
      }
      if (tweets_pronouns[j].text.includes(' they ') === true) {
        trump_they.push(tweets_pronouns[j])
        trumpCount_they++;
      }
      if (tweets_pronouns[j].text.includes(' them ') === true) {
        trump_them.push(tweets_pronouns[j])
        trumpCount_them++;
      }
    } else {
      if (tweets_pronouns[j].text.includes(' I ') === true) {
        obama_I.push(tweets_pronouns[j])
        obamaCount_I++;
      }
      if (tweets_pronouns[j].text.includes(' me ') === true) {
        obama_me.push(tweets_pronouns[j])
        obamaCount_me++;
      }
      if (tweets_pronouns[j].text.includes(' my ') === true) {
        obama_my.push(tweets_pronouns[j])
        obamaCount_my++;
      }
      if (tweets_pronouns[j].text.includes(' you ') === true) {
        obama_you.push(tweets_pronouns[j])
        obamaCount_you++;
      }
      if (tweets_pronouns[j].text.includes(' we ') === true) {
        obama_we.push(tweets_pronouns[j])
        obamaCount_we++;
      }
      if (tweets_pronouns[j].text.includes(' us ') === true) {
        obama_us.push(tweets_pronouns[j])
        obamaCount_us++;
      }
      if (tweets_pronouns[j].text.includes(' our ') === true) {
        obama_our.push(tweets_pronouns[j])
        obamaCount_our++;
      }
      if (tweets_pronouns[j].text.includes(' they ') === true) {
        obama_they.push(tweets_pronouns[j])
        obamaCount_they++;
      }
      if (tweets_pronouns[j].text.includes(' them ') === true) {
        obama_them.push(tweets_pronouns[j])
        obamaCount_them++;
      }
    }
  }
  //Adds the total of pronouns for each president from the counted pronouns above
  let trump_total = trumpCount_I + trumpCount_me + trumpCount_my + trumpCount_you + trumpCount_we + trumpCount_us + trumpCount_our + trumpCount_they + trumpCount_them;
  let obama_total = obamaCount_I + obamaCount_me + obamaCount_my + obamaCount_you + obamaCount_we + obamaCount_us + obamaCount_our + obamaCount_they + obamaCount_them;
  //Reference: Mortensen, P. (July 8, 2019). 'How to 'output' a JavaScript variable into an HTML div'. stackoverflow. Retrieved from https://stackoverflow.com/questions/20089473/how-to-output-a-javascript-variable-into-an-html-div/20089639
  //This is to display the variable result for each presidents use of the pronoun on the site with the divs
  document.getElementById('trumpCount_I').innerHTML = trumpCount_I;
  document.getElementById('obamaCount_I').innerHTML = obamaCount_I;
  document.getElementById('trumpCount_me').innerHTML = trumpCount_me;
  document.getElementById('obamaCount_me').innerHTML = obamaCount_me;
  document.getElementById('trumpCount_my').innerHTML = trumpCount_my;
  document.getElementById('obamaCount_my').innerHTML = obamaCount_my;
  document.getElementById('trumpCount_you').innerHTML = trumpCount_you;
  document.getElementById('obamaCount_you').innerHTML = obamaCount_you;
  document.getElementById('trumpCount_we').innerHTML = trumpCount_we;
  document.getElementById('obamaCount_we').innerHTML = obamaCount_we;
  document.getElementById('trumpCount_us').innerHTML = trumpCount_us;
  document.getElementById('obamaCount_us').innerHTML = obamaCount_us;
  document.getElementById('trumpCount_our').innerHTML = trumpCount_our;
  document.getElementById('obamaCount_our').innerHTML = obamaCount_our;
  document.getElementById('trumpCount_they').innerHTML = trumpCount_they;
  document.getElementById('obamaCount_they').innerHTML = obamaCount_they;
  document.getElementById('trumpCount_them').innerHTML = trumpCount_them;
  document.getElementById('obamaCount_them').innerHTML = obamaCount_them;
  document.getElementById('trumpTotal').innerHTML = trump_total;
  document.getElementById('obamaTotal').innerHTML = obama_total;

  //In the data, I separated the different pronouns into their own traces so I can easily give them its distinct colours. 
  //I did this because I was having trouble figuring out how to give the pronouns their own color when they are in the tweets_pronouns form.
  //Putting them into their own arrays helped with this (as seen in the above code) and I was inspired to do this through how to style markers in the plotly reference site, specifically trace opacity.
  //Reference: plotly. (2021). 'Styling Markers in JavaScript - Trace Opacity'. Retrieved from https://plotly.com/javascript/marker-style/
  //Colour Palette Reference: Coolors. (n.d.). 'Generate Color Palette'. Retrieved from https://coolors.co/4b5e31-9ec26e-f9c80e-f97639-de172b-861d52-662e9b-5575b4-43bccd
  let data = [
    {//Both Tweets
    //'I' pronoun
    x: I_list.map(d => d.x),
    y: I_list.map(d => d.y),
    customdata: I_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'I',
    marker: {
      color: '#4B5E31',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Me' pronoun
    x: me_list.map(d => d.x),
    y: me_list.map(d => d.y),
    customdata: me_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'Me',
    marker: {
      color: '#9EC26E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'My' pronoun
    x: my_list.map(d => d.x),
    y: my_list.map(d => d.y),
    customdata: my_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'My',
    marker: {
      color: '#F9C80E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'You' pronoun
    x: you_list.map(d => d.x),
    y: you_list.map(d => d.y),
    customdata: you_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'You',
    marker: {
      color: '#F97639',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'We' pronoun
    x: we_list.map(d => d.x),
    y: we_list.map(d => d.y),
    customdata: we_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'We',
    marker: {
      color: '#DE172B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Us' pronoun
    x: us_list.map(d => d.x),
    y: us_list.map(d => d.y),
    customdata: us_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'Us',
    marker: {
      color: '#861D52',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Our' pronoun
    x: our_list.map(d => d.x),
    y: our_list.map(d => d.y),
    customdata: our_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'Our',
    marker: {
      color: '#662E9B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'They' pronoun
    x: they_list.map(d => d.x),
    y: they_list.map(d => d.y),
    customdata: they_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'They',
    marker: {
      color: '#5575B4',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Them' pronoun
    x: them_list.map(d => d.x),
    y: them_list.map(d => d.y),
    customdata: them_list.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: true,
    name: 'Them',
    marker: {
      color: '#43BCCD',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, 
  //The following trace datas are hidden and only are visible with the slider to make it true
  { //Trump Only Tweets
    //'I' pronoun
    x: trump_I.map(d => d.x),
    y: trump_I.map(d => d.y),
    customdata: trump_I.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'I',
    marker: {
      color: '#4B5E31',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Me' pronoun
    x: trump_me.map(d => d.x),
    y: trump_me.map(d => d.y),
    customdata: trump_me.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Me',
    marker: {
      color: '#9EC26E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'My' pronoun
    x: trump_my.map(d => d.x),
    y: trump_my.map(d => d.y),
    customdata: trump_my.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'My',
    marker: {
      color: '#F9C80E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'You' pronoun
    x: trump_you.map(d => d.x),
    y: trump_you.map(d => d.y),
    customdata: trump_you.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'You',
    marker: {
      color: '#F97639',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'We' pronoun
    x: trump_we.map(d => d.x),
    y: trump_we.map(d => d.y),
    customdata: trump_we.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'We',
    marker: {
      color: '#DE172B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Us' pronoun
    x: trump_us.map(d => d.x),
    y: trump_us.map(d => d.y),
    customdata: trump_us.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Us',
    marker: {
      color: '#861D52',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Our' pronoun
    x: trump_our.map(d => d.x),
    y: trump_our.map(d => d.y),
    customdata: trump_our.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Our',
    marker: {
      color: '#662E9B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'They' pronoun
    x: trump_they.map(d => d.x),
    y: trump_they.map(d => d.y),
    customdata: trump_they.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'They',
    marker: {
      color: '#5575B4',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Them' pronoun
    x: trump_them.map(d => d.x),
    y: trump_them.map(d => d.y),
    customdata: trump_them.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Them',
    marker: {
      color: '#43BCCD',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, 
  { //Obama Only Tweets
    //'I' pronoun
    x: obama_I.map(d => d.x),
    y: obama_I.map(d => d.y),
    customdata: obama_I.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'I',
    marker: {
      color: '#4B5E31',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Me' pronoun
    x: obama_me.map(d => d.x),
    y: obama_me.map(d => d.y),
    customdata: obama_me.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Me',
    marker: {
      color: '#9EC26E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'My' pronoun
    x: obama_my.map(d => d.x),
    y: obama_my.map(d => d.y),
    customdata: obama_my.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'My',
    marker: {
      color: '#F9C80E',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'You' pronoun
    x: obama_you.map(d => d.x),
    y: obama_you.map(d => d.y),
    customdata: obama_you.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'You',
    marker: {
      color: '#F97639',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'We' pronoun
    x: obama_we.map(d => d.x),
    y: obama_we.map(d => d.y),
    customdata: obama_we.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'We',
    marker: {
      color: '#DE172B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Us' pronoun
    x: obama_us.map(d => d.x),
    y: obama_us.map(d => d.y),
    customdata: obama_us.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Us',
    marker: {
      color: '#861D52',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Our' pronoun
    x: obama_our.map(d => d.x),
    y: obama_our.map(d => d.y),
    customdata: obama_our.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Our',
    marker: {
      color: '#662E9B',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'They' pronoun
    x: obama_they.map(d => d.x),
    y: obama_they.map(d => d.y),
    customdata: obama_they.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'They',
    marker: {
      color: '#5575B4',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }, {
    //'Them' pronoun
    x: obama_them.map(d => d.x),
    y: obama_them.map(d => d.y),
    customdata: obama_them.map(d => convertToParagraph("<b>" + d.author + ":</b><br>" + d.datetime + "<br><br>" + d.text, 64)),
    visible: false,
    name: 'Them',
    marker: {
      color: '#43BCCD',
      size: 18,
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }];

  let layout = {
    hovermode: "closest", //hover closest by default
    xaxis: { visible: true },
    yaxis: { visible: true },
    title: {
      text: '<b>Pronouns used by each President<b>',
      font: { size: 25 }
    },
    font: { size: 13 },
    modebar: { orientation: 'v' },
    legend: { x: 1, y: 0.7, font: { size: 18 } },
    plot_bgcolor: '#e7f9ff',
    //slider will let the viewer change what tweets they want to see only, 'Trump' or 'Obama' as well as have the option to go back to default with 'Both'
    //Reference: ploty. (2021). 'Slider Events in JavaScript'. Retrieved from https://plotly.com/javascript/sliders/
    sliders: [{
      active: 1, //puts the slider button in the middle
      currentvalue: {
        xanchor: 'center',
        font: {
          color: 'rgb(3, 192, 3)',
          size: 20,
        }
      },
      steps: [{
        label: '<b>President Trump</b>',
        method: 'update',   //Both                                                          //Trump Tweets                                       //Obama Tweets
        args: [{ 'visible': [false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false] }]
      }, {
        label: '<b>Both</b>',
        method: 'update',   //Both                                                 //Trump Tweets                                                 //Obama Tweets
        args: [{ 'visible': [true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] }]
      }, {
        label: '<b>President Obama</b>',
        method: 'update',    //Both                                                         //Trump Tweets                                                //Obama Tweets
        args: [{ 'visible': [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true] }]
      }]
      //I tried to shorten my code by erasing the 'both' trace data and just have both trump and obama tweets have a visible value of true to show all tweets but this ended up making duplicating legends. 
      //I then tried to overcome this with showlegend to only have half of the legned be shown but I realised that some of the legend entries are linked with only obama tweets or only trump tweets hence the duplication.
      //So in the end, I sticked with this method which though longer, doesn't impact the interaction of the graph like my other method did.
    }]
  }
  
  var config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['autoScale2d', 'select2d']
  }

  Plotly.newPlot('TypeScatter', data, layout, config);
}

//from https://codereview.stackexchange.com/a/171857
//will make the hoverlabels be converted into a paragraph and so fit within the textbox
function convertToParagraph(sentence, maxLineLength) {
  let lineLength = 0;
  sentence = sentence.split(" ")
  return sentence.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length;
      return result + `<br>${word}`;
    } else {
      lineLength += word.length + (result ? 1 : 0);
      return result ? result + ` ${word}` : `${word}`;
    }
  }, '');
}

Plotly.d3.csv("potus_twitter_project_CSV/trump_presidential_tweets.csv", (trump_tweets) => {
  Plotly.d3.csv("potus_twitter_project_CSV/obama_presidential_tweets.csv", (obama_tweets) => {
    Plotly.d3.csv("potus_twitter_project_CSV/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
      Plotly.d3.csv("potus_twitter_project_CSV/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
        let tweets = combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama)
        typeGraph(tweets['pronouns']);
        sentimentGraph(tweets['gunSentiment']);
      });
    });
  });
});

// viewsGraph: Mutliple graphs section that shows the different views on gun control and violence in America by the people
//The following graphs data are sourced from Pew Reseatch Center
//Reference: Parker, K., Horowitz, M, J., Igielnik, R., Oliphant, B, J. & Brown, A. (June 22, 2017). "America's Complex Relationship With Guns." Pew Research Center. Retrieved from https://www.pewresearch.org/social-trends/2017/06/22/views-on-gun-policy/
//The code below is inspired from the tutorial in Week 10 where we learn how to apply animations and interactivity into our plotly graphs as well as plotly's update-button page
//References: 
// - Donga, R. (May 10, 2021). "Button Interaction". Slides - CodePen. Retrieved from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/2/5
// - plotly. (2021). "Button Events in JavaScript - Update Button". Retrieved from https://plotly.com/javascript/custom-buttons/#update-button
//Coloue Palette Reference: Coolors. (n.d.). "Generate Color Palette". Retrieved from https://coolors.co/efefef-3454d1-34d1bf-070707-d1345b
const viewsDiv = document.getElementById('viewsGraph')
//The list of y values is used for some of the grouped bar charts which instead of having a hover label will show the number representing it inside the bar
//Reference: plotly. (2021). "Bar Charts in JavaScript: Grouped Bar Chart with Direct Labels". Retrieved from https://plotly.com/javascript/bar-charts/#grouped-bar-chart-with-direct-labels
let Yvalue = [
  //Gun violence as a U.S. problem vs. local community problem chart values
  [50, 33, 14, 2],
  [19, 25, 36, 19],
  //Stricter access to guns and mass shooting chart values
  [18, 29, 53],
  [10, 56, 32],
  //Party and Ideology relation to right to own values
  [95, 86, 50, 29],
  [69, 53, 25, 16]
]

var opinionData = [
  { //Opinions on current gun laws chart
    labels: ['Gun laws are about right', 'Gun laws should be more strict', 'Gun laws should be less strict'],
    values: [30, 52, 18],
    hovertemplate: '%{value}' + '% believe that ' + '%{label}<extra></extra>', //Reference: plotly. (2021). 'Hover Text and Formatting in JavaScript - Hovertemplate'. Retrieved from https://plotly.com/javascript/hover-text-and-formatting/#hovertemplate
    type: 'pie',
    hole: 0.4,
    marker: { colors: ['#3454D1', '#34D1BF', '#D1345B'] }
  }, { //Who should own a gun chart
    labels: ['Almost everyone', 'Most people', 'Some people', 'Almost no one'],
    values: [8, 64, 19, 9],
    hovertemplate: '%{value}' + '% believe that ' + '%{label}' + ' should.<extra></extra>',
    type: 'pie',
    marker: { colors: ['#3454D1', '#34D1BF', '#070707', '#D1345B'] },
    visible: false
  }, { //Where should people carry a gun chart
    labels: ['Almost everywhere', 'Most places', 'Some places', 'Almost nowhere'],
    values: [21, 35, 28, 15],
    hovertemplate: '%{value}' + '% believe that ' + '%{label}' + ' should allow you to carry.<extra></extra>',
    type: 'pie',
    marker: { colors: ['#3454D1', '#34D1BF', '#070707', '#D1345B'] },
    visible: false
  }, { //Gun violence as a U.S. problem vs. local community problem chart
    x: ['A very big problem', 'A moderately big problem', 'A small problem', 'Not a problem at all'],
    y: Yvalue[0],
    name: 'U.S. Problem',
    type: 'bar',
    text: Yvalue[0].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#34D1BF',
      opacity: 0.6,
    },
    visible: false
  }, {
    x: ['A very big problem', 'A moderately big problem', 'A small problem', 'Not a problem at all'],
    y: Yvalue[1],
    name: 'Local Community Problem',
    type: 'bar',
    text: Yvalue[1].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#D1345B',
      opacity: 0.6,
    },
    visible: false
  }, { //Stricter access to guns and mass shooting chart
    x: ['More mass shootings', 'Fewer mass shootings', 'No difference'],
    y: Yvalue[2].map(String),
    name: 'Gun Owners',
    type: 'bar',
    text: Yvalue[2].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#3454D1',
      opacity: 0.6,
    },
    visible: false
  }, {
    x: ['More mass shootings', 'Fewer mass shootings', 'No difference'],
    y: Yvalue[3].map(String),
    name: 'Non-gun Owners',
    type: 'bar',
    text: Yvalue[3].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#070707',
      opacity: 0.6,
    },
    visible: false
  }, { //Party and Ideology relation to right to own
    x: ['Conservative Republicans', 'Moderate/Liberal Republicans', 'Conservative/Moderate Democrats', 'Liberal Democrats'],
    y: Yvalue[4],
    name: 'Gun Owners',
    type: 'bar',
    text: Yvalue[4].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#070707',
      opacity: 0.6,
    },
    visible: false
  }, {
    x: ['Conservative Republicans', 'Moderate/Liberal Republicans', 'Conservative/Moderate Democrats', 'Liberal Democrats'],
    y: Yvalue[5],
    name: 'Non-gun Owners',
    type: 'bar',
    text: Yvalue[5].map(String),
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
      color: '#D1345B',
      opacity: 0.6,
    },
    visible: false
  }, { //Thoughts on what contributes to gun violence
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [53, 32, 8, 5],
    name: 'Ease with people ILLEGALLY obtaining guns',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#7686C5' },
    visible: false
  }, {
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [29, 45, 23, 3],
    name: 'Family instability',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#3454D1' },
    visible: false
  }, {
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [22, 43, 25, 9],
    name: 'Lack of economic oppotunities',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#34D1BF' },
    visible: false
  }, {
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [30, 29, 27, 13],
    name: 'Ease with people LEGALLY obtaining guns',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#1E6C63' },
    visible: false
  }, {
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [29, 31, 27, 12],
    name: 'Amount of gun violence in video games',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#070707' },
    visible: false
  }, {
    x: ['A great deal', 'A fair amount', 'Not too much', 'Not at all'],
    y: [25, 31, 34, 10],
    name: 'Amount of gun violence in movies & television',
    hovertemplate: '%{y}' + '%',
    type: 'bar',
    marker: { color: '#D1345B' },
    visible: false
  }, { //Protecting right vs. Controlling guns
    x: ['Dec, 1993', 'May, 1999', 'Jun, 1999', 'Mar, 2000', 'Apr, 2000', 'May, 2000', 'Jun, 2003', 'Feb, 2004', 'Apr, 2007', 'Nov, 2007', 'Apr, 2008', 'Apr, 2009', 'Mar, 2010', 'Sep, 2010', 'Jan, 2011', 'Mar, 2011', 'Oct, 2011', 'Apr, 2021', 'Jul, 2012', 'Dec, 2012', 'Jan, 2013', 'Feb, 2013', 'Feb, 2014', 'Dec, 2014', 'Jul, 2015', 'Aug, 2016', 'Apr, 2017'],
    y: [34, 30, 33, 29, 37, 38, 42, 37, 32, 42, 37, 45, 46, 46, 49, 48, 47, 49, 46, 42, 45, 46, 48, 49, 52, 47, 52, 47],
    name: 'Protect the right to own guns',
    hovertemplate: '%{y}' + '%',
    mode: 'lines+markers',
    line: { color: '#1E6C63' },
    visible: false
  }, {
    x: ['Dec, 1993', 'May, 1999', 'Jun, 1999', 'Mar, 2000', 'Apr, 2000', 'May, 2000', 'Jun, 2003', 'Feb, 2004', 'Apr, 2007', 'Nov, 2007', 'Apr, 2008', 'Apr, 2009', 'Sep, 2010', 'Jan, 2011', 'Mar, 2011', 'Oct, 2011', 'Apr, 2021', 'Jul, 2012', 'Dec, 2012', 'Jan, 2013', 'Feb, 2013', 'Feb, 2014', 'Dec, 2014', 'Jul, 2015', 'Aug, 2016', 'Apr, 2017'],
    y: [57, 65, 62, 66, 55, 57, 54, 58, 60, 55, 58, 49, 46, 50, 46, 47, 49, 45, 47, 49, 51, 50, 50, 48, 46, 50, 46, 51],
    name: 'Control gun ownership',
    hovertemplate: '%{y}' + '%',
    mode: 'lines+markers',
    line: { color: '#D1345B' },
    visible: false
  }, { //Limits on gun sales
    x: ['Preventing mentally ill from purchasing guns', 'Background checks for private sales at gun shows', 'Barring gun purchases on no-fly/watch lists', 'Creating a federal database to track gun sales', 'Banning assault-style weapons', 'Banning high-capacity magazines', 'Allowing concealed carry in more places', 'Allowing teachers & officals to carry guns in K-12', 'Shortening waiting periods for buying guns legally', 'Allowing concealed carry without a permit'],
    y: [89, 77, 82, 54, 48, 44, 67, 66, 53, 33],
    name: 'Gun Owners',
    hovertemplate: '%{y}' + '%',
    mode: 'markers',
    marker: { color: '#34D1BF', size: 10 },
    visible: false
  }, {
    x: ['Preventing mentally ill from purchasing guns', 'Background checks for private sales at gun shows', 'Barring gun purchases on no-fly/watch lists', 'Creating a federal database to track gun sales', 'Banning assault-style weapons', 'Banning high-capacity magazines', 'Allowing concealed carry in more places', 'Allowing teachers & officals to carry guns in K-12', 'Shortening waiting periods for buying guns legally', 'Allowing concealed carry without a permit'],
    y: [89, 87, 84, 80, 77, 74, 37, 35, 29, 12],
    name: 'Non-gun Owners',
    hovertemplate: '%{y}' + '%',
    mode: 'markers',
    marker: { color: '#7686C5', size: 10 },
    visible: false
  }
];

//updatemenus has buttons which will show the corresponding data through visible argument
var updatemenus = [
  {
    buttons: [
      {
        method: 'update',
        args: [
          { 'visible': [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
          { 'title': '<b>Opinions on current gun laws</b>' }
        ],
        label: '<br>Gun Laws<br>'
      }, {
        method: 'update',
        args: [
          { 'visible': [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
          { 'title': '<b>Who should be able to own guns legally?</b>' }
        ],
        label: '<br>Who should own guns<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
          { 'title': '<b>Where should people carry a gun?</b>' }
        ],
        label: '<br>Where should people have a gun<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false] }, //activates visibility to both U.S. and local datato give a group bar chart (which is why there is 2 true values)
          { 'title': '<b>How much of a problem is gun violence? (%)</b>' }
        ],
        label: '<br>U.S. Problem vs. Local Problem<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false] }, //activates visibility to both gun owners and non-gun owners data to give a group bar chart (which is why there is 2 true values)
          { 'title': '<b>If it was harder for people to legally<br>obtain guns, there would be... (%)</b>' }
        ],
        label: '<br>Mass Shootings<br>(Gun Owners vs. Non Owners)<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false] }, //activates visibility to both gun owners and non-gun owners data to give a group bar chart (which is why there is 2 true values)
          { 'title': '<b>Partys who say that the right to own guns<br>is essential to their own sense of freedom (%)</b>' }
        ],
        label: '<br>Party & Ideology and Right to Own<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false] }, //activates visibility to the 6 different potential reasons for gun violence to give a group bar chart (which is why there is 6 true values)
          { 'title': '<b>What contributes to gun violence?</b>' }
        ],
        label: '<br>Reasons for gun violence<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false] }, //activates visibility to both protect right and control ownership of guns for a multiple trace chart (which is why there is 2 true values)
          { 'title': '<b>Protect the rignt to own guns<br>vs. Control gun ownership</b>' }
        ],
        label: '<br>Protect right vs. Control ownership<br>',
      }, {
        method: 'update',
        args: [
          { 'visible': [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true] }, //activates visibility to both gun owners and non-gun owners data to give marker chart
          { 'title': '<b>Gun sale limits - Gun owners vs. Non owners</b>' }
        ],
        label: '<br>Limits on Gun Sales<br>',
      }
    ],
    direction: 'down',
    showactive: true,
    type: 'buttons',
    x: -1,
    xanchor: 'left',
    y: 2,
    yanchor: 'top',
    font: { size: 17.3 }
  },
]

var layout = {
  updatemenus: updatemenus,
  xaxis: { visible: true },
  yaxis: { visible: false },
  margin: {
    l: 400,
    r: 400,
    b: 210,
    t: 10,
    pad: 10
  },
  title: {
    text: '<b>Opinions on current gun laws</b>',
    font: { size: 30 },
  },
  font: { size: 14, family: 'Georgia'},
  modebar: { orientation: 'h' },
  legend: { 
    orientation: 'v', 
    x: 1.1, 
    y: 1, 
    font: { size: 15 }
  },
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent'
}

//This configuration will show the modebar all the time and also removes some buttons
var config = {
  displayModeBar: true,
  modeBarButtonsToRemove: ['hoverClosestCartesian', 'hoverCompareCartesian', 'resetScale2d', 'zoom2d', 'pan2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'select2d', 'zoomIn2d', 'zoomOut2d']
}

Plotly.newPlot(viewsDiv, opinionData, layout, config);