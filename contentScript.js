(async () => {
  const myTimeout = setTimeout(() => {
    // let t1 = document.getElementsByClassName("card-body");
    // let t2 = t1.item(4);
    // console.log("object");
    // console.log(t2);

    /**
     * Converts Date array into seconds
     * @param a1 pass data in [hh:mm:ss] format as per 24hr clock
     * @returns converted seconds from given date array in number format
     */
    function dateArrToSec(a1) {
      let totalSec = 0;

      totalSec += a1[0] * 60 * 60;
      totalSec += a1[1] * 60;
      totalSec += a1[2];

      return totalSec;
    }

    /**
     * Converts seconds into date array
     * @param totalSec pass seconds in number format
     * @returns converted data array in [hh:mm] format as per 24hr clock
     */
    function secToDateArr(totalSec) {
      let hh = Math.floor(totalSec / 60 / 60);
      let mm = Math.floor(totalSec / 60 - hh * 60);

      return [hh, mm];
    }

    function getDiff(lDate) {
      //Getting Current Time Starts
      const cDate = [];

      cDate.push(new Date().getHours());
      cDate.push(new Date().getMinutes());
      cDate.push(new Date().getSeconds());
      //Getting Current Time Ends

      //Parsing given date String starts
      const time = lDate.pop();
      lDate = lDate.map((r, i) => {
        return i == 0 && time == "PM" ? JSON.parse(r) + 12 : JSON.parse(r);
      });
      //Parsing given date String ends

      const previousSeconds = dateArrToSec(lDate);
      const currentSeconds = dateArrToSec(cDate);
      return secToDateArr(currentSeconds - previousSeconds);
    }

    function add(diffArr, eArr) {
      let mm = diffArr[1] + eArr[1];
      let hh = diffArr[0] + eArr[0];

      while (mm > 60) {
        mm -= 60;
        hh++;
      }
      return `${hh}h:${mm}mm`;
    }

    const cardBody = document.getElementsByClassName("card-body");

    const latestLog = cardBody[cardBody.length - 1]
      .getElementsByClassName("dropdown attendance-logs-row")[0]
      .getElementsByClassName(
        "d-flex align-items-center px-16 py-12 on-hover border-bottom"
      )[0];

    latestLog.click();
    const logData = document
      .getElementsByClassName("open")[1]
      .querySelectorAll("span:not(.icon)");
    const lastClockInString = logData[logData.length - 2].innerText;
    const temp = lastClockInString.split(" ");
    const lastClockInArr = temp[0].split(":");
    lastClockInArr.push(temp[1]);
    const lastEffectiveHourString =
      latestLog.getElementsByTagName("span")[1].innerText;

    const lastEffectiveHourArr = [];
    lastEffectiveHourArr.push(lastEffectiveHourString.split("h")[0]);
    lastEffectiveHourArr.push(
      lastEffectiveHourString.split("m +")[0].split(" ").pop()
    );

    const a1 = [...lastClockInArr];
    let effectiveHours = [...lastEffectiveHourArr];
    const diff = getDiff(a1);
    effectiveHours = effectiveHours.map((m) => JSON.parse(m));
    const finalTime = add(diff, effectiveHours);

    console.log(finalTime);

    const finalTimerDisplayEl = document.createElement("div");
    finalTimerDisplayEl.innerText = finalTime;

    cardBody[2].appendChild(finalTimerDisplayEl);
  }, 5000);
})();
