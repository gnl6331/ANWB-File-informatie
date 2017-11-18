let getFileAnwbData = new XMLHttpRequest();
getFileAnwbData.onreadystatechange = () => {
    if (getFileAnwbData.readyState === 4) {
        let anwbFileInformatieData = JSON.parse(getFileAnwbData.responseText);
        let statusHTML = "";
        for (let i = 0; i < anwbFileInformatieData.roadEntries.length; i++) {

            /* The if and else statement is checking if there is actualy a traffic jam.
            This to prevent it is adding data without a traffic jam.
            */

            if (anwbFileInformatieData.roadEntries[i].events.trafficJams.length > 0) {
              // Making a place to store the total amount of traffic jam in km
              let totalFileForThisRoad = 0;
              statusHTML += "<div id=\"road-";
              statusHTML += anwbFileInformatieData.roadEntries[i].road.toLowerCase();
              statusHTML += "\"class=\"file-panel\">";
              statusHTML += "<div class=\"file-panel-heading\"><h2>";
              statusHTML += anwbFileInformatieData.roadEntries[i].road;
              statusHTML += "</h2>";
              statusHTML += "<p>Totaal aantal vertragingen: ";
              statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams.length;
              statusHTML += "</p>";
              statusHTML += "</div>";
              statusHTML += "<div class=\"file-panel-content-container\">";

              // Looping through all the traffic jams
              for (let j = 0; j < anwbFileInformatieData.roadEntries[i].events.trafficJams.length; j++) {

                statusHTML += "<div class=\"file-panel-content\">";
                statusHTML += "<h3>";
                statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].segStart;
                statusHTML += " Richting ";
                statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].segEnd;
                statusHTML += "</h3><p>Tussen: ";
                statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].from;
                statusHTML += " - ";
                statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].to;
                statusHTML += "</p><p>";

                if (!isNaN(anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance)) {
                    // Adding the distance to the total for this road
                    totalFileForThisRoad += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance;
                    statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].distance / 1000 + " km - ";
                };

                // Looping through the events at a traffic jam
                for (let k = 0; k < anwbFileInformatieData.roadEntries[i].events.trafficJams[j].events.length; k++) {

                  statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].events[k].text + " ";

                };
                statusHTML += "</p>";

                /* sometimes the data in the api is not a number so we check that in order to make the
                calculation.
                */
                if (!isNaN(anwbFileInformatieData.roadEntries[i].events.trafficJams[j].delay)) {
                    statusHTML += "<p> &plusmn; ";
                  statusHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].delay / 60 + " minuten vertraging ";
                    statusHTML += "</p>";
                };

                statusHTML += "</div>";
              };
              // Login the total amount of traffic jam distance
              console.log(totalFileForThisRoad);
            };



            statusHTML += "</div></div>";

        };
        document.getElementById("results-output").innerHTML = statusHTML;
    };
};

getFileAnwbData.open("GET", "https://www.anwb.nl/feeds/gethf");
getFileAnwbData.send();
