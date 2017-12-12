function getSpeedControllInformation () {

let getFileAnwbData = new XMLHttpRequest();
getFileAnwbData.onreadystatechange = () => {
    if (getFileAnwbData.readyState === 4) {
        let anwbFileInformatieData = JSON.parse(getFileAnwbData.responseText);
        let FlashControllToHTML = "";
        let totalFlashAmount = 0;
        let totalFlashAmountToHTML = "";
        for (let i = 0; i < anwbFileInformatieData.roadEntries.length; i++) {

            /* The if and else statement is checking if there is actualy a traffic jam.
            This to prevent it is adding data without a traffic jam.
            */

            if (anwbFileInformatieData.roadEntries[i].events.radars.length > 0) {
              // Making a place to store the total amount of traffic jam in km

              FlashControllToHTML += "<div id=\"speed-road-";
              FlashControllToHTML += anwbFileInformatieData.roadEntries[i].road.toLowerCase();
              FlashControllToHTML += "\"class=\"file-panel\">";

              if (anwbFileInformatieData.roadEntries[i].roadType === "aWegen") {
                FlashControllToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"snel-weg\">";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].road;
                FlashControllToHTML += "</span></h2>";
              } else if (anwbFileInformatieData.roadEntries[i].roadType === "nWegen") {
                FlashControllToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"prov-weg\">";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].road;
                FlashControllToHTML += "</span></h2>";
              } else {
                FlashControllToHTML += "<div class=\"file-panel-heading\"><h2><span class=\"overig-weg\">";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].road;
                FlashControllToHTML += "</span></h2>";
              };

              /*
              Addded a conditional statement to check the amount of jams. This because of the word that
              is ended after the data from the api.
              */

              if (anwbFileInformatieData.roadEntries[i].events.radars.length === 1) {
                  FlashControllToHTML += "<p>";
                  FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars.length;
                  FlashControllToHTML += " Flitser &dtrif;</p>";
              } else {
                  FlashControllToHTML += "<p>";
                  FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars.length;
                  FlashControllToHTML += " Flitsers &dtrif;</p>";
              };

              FlashControllToHTML += "</div>";
              FlashControllToHTML += "<div class=\"file-panel-content-container\">";

              // Looping through all the traffic jams
              for (let j = 0; j < anwbFileInformatieData.roadEntries[i].events.radars.length; j++) {
                totalFlashAmount++;
                FlashControllToHTML += "<div class=\"file-panel-content\">";
                FlashControllToHTML += "<h3>";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].segStart;
                FlashControllToHTML += " richting ";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].segEnd;
                FlashControllToHTML += "</h3><p>Tussen: ";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].from;
                FlashControllToHTML += " - ";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].to;
                FlashControllToHTML += " ";
                FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].reason;
                FlashControllToHTML += "</p><p>";

                // FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.trafficJams[j].reason;
                // Looping through the events at a traffic jam
                for (let k = 0; k < anwbFileInformatieData.roadEntries[i].events.radars[j].events.length; k++) {

                  FlashControllToHTML += anwbFileInformatieData.roadEntries[i].events.radars[j].events[k].text + ". ";

                };
                FlashControllToHTML += "</p>";

                /* sometimes the data in the api is not a number so we check that in order to make the
                calculation.
                */

                FlashControllToHTML += "</div>";
              };
            };

            FlashControllToHTML += "</div></div>";

        };

        if (totalFlashAmount > 1) {
          totalFlashAmountToHTML += "Er zijn totaal: <span>";
          totalFlashAmountToHTML += totalFlashAmount;
          totalFlashAmountToHTML += " Flitsers</span>";
        } else if (totalFlashAmount < 1) {
          totalFlashAmountToHTML += "Er zijn op dit moment: <span>Geen flitsers</span>";
        } else {
          totalFlashAmountToHTML += "Er is op dit moment: <span>";
          totalFlashAmountToHTML += totalFlashAmount;
          totalFlashAmountToHTML += " Flitser</span>";
        };

        writeToDocument("flash-results-output", FlashControllToHTML);
        writeToDocument("totaal-vertragingen-text", totalFlashAmountToHTML);
        writeToDocument("latest-update", timeNow);
    };
};

getFileAnwbData.open("GET", "https://www.anwb.nl/feeds/gethf");
getFileAnwbData.send();

};
