let getFileAnwbData = new XMLHttpRequest();
getFileAnwbData.onreadystatechange = () => {
    if (getFileAnwbData.readyState === 4) {
        let anwbFileInformatieData = JSON.parse(getFileAnwbData.responseText);
        let trafficJamToHTML = "";
        for (let i = 0; i < anwbFileInformatieData.roadEntries.length; i++) {

            /* The if and else statement is checking if there is actualy a traffic jam.
            This to prevent it is adding data without a traffic jam.
            */

            if (anwbFileInformatieData.roadEntries[i].events.trafficJams.length > 0) {
              // Making a place to store the total amount of traffic jam in km
              let totalFileForThisRoad = 0;
              trafficJamToHTML += "<div id=\"road-";
              trafficJamToHTML += anwbFileInformatieData.roadEntries[i].road.toLowerCase();
              trafficJamToHTML += "\"class=\"file-panel\">";

              if (anwbFileInformatieData.roadEntries[i].roadType === "aWegen") {
                trafficJamToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"snel-weg\">";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].road;
                trafficJamToHTML += "</span></h2>";
              } else if (anwbFileInformatieData.roadEntries[i].roadType === "nWegen") {
                trafficJamToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"prov-weg\">";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].road;
                trafficJamToHTML += "</span></h2>";
              };

              /*
              Addded a conditional statement to check the amount of jams. This because of the word that
              is ended after the data from the api.
              */

              if (anwbFileInformatieData.roadEntries[i].events.trafficJams.length === 1) {
                  trafficJamToHTML += "<p>";
                  trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams.length;
                  trafficJamToHTML += " Vertraging &dtrif;</p>";
              } else {
                  trafficJamToHTML += "<p>";
                  trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams.length;
                  trafficJamToHTML += " Vertragingen &dtrif;</p>";
              };

              trafficJamToHTML += "</div>";
              trafficJamToHTML += "<div class=\"file-panel-content-container\">";

              // Looping through all the traffic jams
              for (let j = 0; j < anwbFileInformatieData.roadEntries[i].events.trafficJams.length; j++) {

                trafficJamToHTML += "<div class=\"file-panel-content\">";
                trafficJamToHTML += "<h3>";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].segStart;
                trafficJamToHTML += " richting ";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].segEnd;
                trafficJamToHTML += "</h3><p>Tussen: ";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].from;
                trafficJamToHTML += " - ";
                trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].to;
                trafficJamToHTML += "</p><p>";

                if (!isNaN(anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance)) {
                    // Adding the distance to the total for this road
                    totalFileForThisRoad += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance;
                    trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance / 1000 + " km - ";
                };
                // trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].reason;
                // Looping through the events at a traffic jam
                for (let k = 0; k < anwbFileInformatieData.roadEntries[i].events.trafficJams[j].events.length; k++) {

                  trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].events[k].text + ". ";

                };
                trafficJamToHTML += "</p>";

                /* sometimes the data in the api is not a number so we check that in order to make the
                calculation.
                */
                if (!isNaN(anwbFileInformatieData.roadEntries[i].events.trafficJams[j].delay)) {
                    trafficJamToHTML += "<p> &plusmn; ";
                    trafficJamToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].delay / 60 + " minuten vertraging ";
                    trafficJamToHTML += "</p>";
                };

                trafficJamToHTML += "</div>";
              };
              // Login the total amount of traffic jam distance for each road
              console.log(totalFileForThisRoad);
            };

            trafficJamToHTML += "</div></div>";

        };
        document.getElementById("jam-results-output").innerHTML = trafficJamToHTML;
    };
};

getFileAnwbData.open("GET", "https://www.anwb.nl/feeds/gethf");
getFileAnwbData.send();
