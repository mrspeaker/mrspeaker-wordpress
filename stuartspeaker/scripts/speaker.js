/* global $ */
$(document).ready(() => {
  function addGitHubLolz() {
    $("<div></div>", { id: "githubble" }).appendTo("body");
    $("<div></div>", { id: "gitcommit" })
      .text("Not on GitHub!")
      .appendTo("#githubble");
  }

  function addYearTotalLolz() {
    let yrTotal = 0;
    let psTotal = 0;
    $("#archives li").each(function() {
      const match = $(this).text().match(/([0-9]+).+\(([^)]*)\)/, "");
      if (match.length != 3) return true;
      yrTotal += parseInt(match[1], 10);
      psTotal += parseInt(match[2], 10);
    });
    $("#arcYear").text(yrTotal);
    $("#arcTot").text(psTotal);
  }

  addYearTotalLolz();
  addGitHubLolz();
  // var socket = io.connect("http://192.241.174.97:8080");
});
