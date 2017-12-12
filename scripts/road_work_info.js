function getRoadWorkInformation () {

let getFileAnwbData = new XMLHttpRequest();
getFileAnwbData.onreadystatechange = () => {
    if (getFileAnwbData.readyState === 4) {
        let anwbFileInformatieData = JSON.parse(getFileAnwbData.responseText);
        let roadWorksToHTML = "";
        let totalRoadWorksAmount = 0;
        let totalRoadWorksAmountToHTML = "";
        let totalRoadWorksForThisRoad = 0;
        for (let i = 0; i < anwbFileInformatieData.roadEntries.length; i++) {

            /* The if and else statement is checking if there is actualy a traffic jam.
            This to prevent it is adding data without a traffic jam.
            */

            if (anwbFileInformatieData.roadEntries[i].events.roadWorks.length > 0) {
              // Making a place to store the total amount of traffic jam in km

              roadWorksToHTML += "<div id=\"road-";
              roadWorksToHTML += anwbFileInformatieData.roadEntries[i].road.toLowerCase();
              roadWorksToHTML += "\"class=\"file-panel\">";

              if (anwbFileInformatieData.roadEntries[i].roadType === "aWegen") {
                roadWorksToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"snel-weg\">";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].road;
                roadWorksToHTML += "</span></h2>";
              } else if (anwbFileInformatieData.roadEntries[i].roadType === "nWegen") {
                roadWorksToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"prov-weg\">";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].road;
                roadWorksToHTML += "</span></h2>";
              } else {
                roadWorksToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"overig-weg\">";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].road;
                roadWorksToHTML += "</span></h2>";
              };

              /*
              Addded a conditional statement to check the amount of jams. This because of the word that
              is ended after the data from the api.
              */

              if (anwbFileInformatieData.roadEntries[i].events.roadWorks.length === 1) {
                  roadWorksToHTML += "<p>";
                  roadWorksToHTML += anwbFileInformatieData.roadEntries[i].events.roadWorks.length;
                  roadWorksToHTML += " Plaats Wegwerkzaamheden &dtrif;</p>";
              } else {
                  roadWorksToHTML += "<p>";
                  roadWorksToHTML += anwbFileInformatieData.roadEntries[i].events.roadWorks.length;
                  roadWorksToHTML += " Wegwerkzaamheden &dtrif;</p>";
              };

              roadWorksToHTML += "</div>";
              roadWorksToHTML += "<div class=\"file-panel-content-container\">";

              // Looping through all the traffic jams
              for (let j = 0; j < anwbFileInformatieData.roadEntries[i].events.roadWorks.length; j++) {
                totalRoadWorksAmount++;
                roadWorksToHTML += "<div class=\"file-panel-content\">";
                roadWorksToHTML += "<h3>";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].events.roadWorks[j].segStart;
                roadWorksToHTML += " richting ";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].events.roadWorks[j].segEnd;
                roadWorksToHTML += "</h3><p>";
                roadWorksToHTML += anwbFileInformatieData.roadEntries[i].events.roadWorks[j].description;
                roadWorksToHTML += "</p>";


                /* sometimes the data in the api is not a number so we check that in order to make the
                calculation.
                */
                if (!isNaN(anwbFileInformatieData.roadEntries[i].events.roadWorks[j].delay)) {

                    let trafficDelayTime = anwbFileInformatieData.roadEntries[i].events.roadWorks[j].delay / 60;

                    if (trafficDelayTime > 5 && trafficDelayTime < 10) {
                      roadWorksToHTML += "<p class=\"dur-2\"> &plusmn; ";
                      roadWorksToHTML += trafficDelayTime + " minuten vertraging ";
                      roadWorksToHTML += "</p>";
                    } else if (trafficDelayTime >= 10 && trafficDelayTime < 20) {
                      roadWorksToHTML += "<p class=\"dur-3\"> &plusmn; ";
                      roadWorksToHTML += trafficDelayTime + " minuten vertraging ";
                      roadWorksToHTML += "</p>";
                    } else if (trafficDelayTime >= 20 && trafficDelayTime < 30) {
                      roadWorksToHTML += "<p class=\"dur-4\"> &plusmn; ";
                      roadWorksToHTML += trafficDelayTime + " minuten vertraging ";
                      roadWorksToHTML += "</p>";
                    } else if (trafficDelayTime >= 30) {
                      roadWorksToHTML += "<p class=\"dur-5\"> &plusmn; ";
                      roadWorksToHTML += trafficDelayTime + " minuten vertraging ";
                      roadWorksToHTML += "</p>";
                    } else {
                      roadWorksToHTML += "<p class=\"dur-1\"> &plusmn; ";
                      roadWorksToHTML += trafficDelayTime + " minuten vertraging ";
                      roadWorksToHTML += "</p>";
                    };

                };
                roadWorksToHTML += "</div>";
              };
            };

            roadWorksToHTML += "</div></div>";

        };

        if (totalRoadWorksAmount > 1) {
          totalRoadWorksAmountToHTML += "Er zijn totaal: <span>";
          totalRoadWorksAmountToHTML += totalRoadWorksAmount;
          totalRoadWorksAmountToHTML += " Wegwerkzaamheden</span>";
        } else {
          totalRoadWorksAmountToHTML += "Er is op dit moment op: <span>";
          totalRoadWorksAmountToHTML += totalRoadWorksAmount;
          totalRoadWorksAmountToHTML += " 1 plaats werk aan de weg.</span>"
        };

        writeToDocument("roadworks-results-output", roadWorksToHTML);
        writeToDocument("totaal-vertragingen-text", totalRoadWorksAmountToHTML);
        writeToDocument("latest-update", timeNow);
    };
};

getFileAnwbData.open("GET", "https://www.anwb.nl/feeds/gethf");
getFileAnwbData.send();

};

window.onload = getTrafficJamInformation();
