function copyToClipboard(index) {
  let selector = "";
  switch (index) {
    case 1:
      selector = "title";
      break;
    case 2:
      selector = "authors";
      break;
    case 3:
      selector = "affiliation";
      break;
    case 4:
      selector = "journal";
      break;
    case 5:
      selector = "year";
      break;
    case 6:
      selector = "month";
      break;
    case 7:
      selector = "abstract";
      break;
  }
  const finalSelector = selector;
  //getting text from and ID
  var copyText = document.getElementById(`${finalSelector}`).innerHTML;
  // creating textarea of html
  var input = document.createElement("textarea");
  //adding p tag text to textarea
  input.value = copyText;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  // removing textarea after copy
  input.remove();
}

//Parse the ID from the URL
function getId(url) {
  if (url.charAt(url.length - 1) == "/") {
    url = url.substring(0, url.length - 1);
  }
  url = url.substring(url.lastIndexOf("/") + 1);
  return url;
}

function getDB(url) {
  console.log("GETDB - URL:  ", url);
  try {
    if (url.includes("pmc")) return "pmc";
  } catch (error) {
    console.log("GET DB - PMC ERR");
  }
  try {
    if (url.includes("pubmed.")) return "pubmed";
  } catch (error) {
    console.log("GET DB - PUBMED ERR");
  }

  return "";
}
/*
function clearTable(result) {
  result.title = "";
  result.authors = "";
  result.affiliation = "";
  result.journal = "";
  result.year = "";
  result.month = "";
  result.abstract = "";
  result.authors = "";
}
*/
//Handle the Async fetch of Pubmed Data
async function api(searchbar) {
  let base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
  let mode = "efetch";
  let db = getDB(searchbar);
  let id = getId(searchbar);
  let type = "xml";
  let request = new Request(
    `${base_url}${mode}.fcgi?db=${db}&id=${id}&rettype=abstract&retmode=${type}`
  );

  return fetch(request).then((results) => {
    // results returns XML. lets cast this to a string, then create
    // a new DOM object out of it!
    return results.text().then((str) => {
      let responseDoc = new DOMParser().parseFromString(str, "application/xml");
      let result = {};
      switch (db) {
        case "pmc":
          try {
            result.title =
              responseDoc.getElementsByTagName("article-title")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            const authors = responseDoc.querySelectorAll("contrib");
            authors.forEach(function (elem) {
              if (elem.querySelector("surname").textContent !== "undefined") {
                result.authors +=
                  elem.querySelector("surname").textContent + " ";
                result.authors +=
                  elem.querySelector("given-names").textContent + " ";
                result.authors +=
                  elem.querySelector("degrees").textContent + "<br><br>";
              }
            });
          } catch (error) {
            console.error(error);
          }
          try {
            const temp = responseDoc.querySelectorAll("aff");
            temp.forEach(function (elem) {
              result.affiliation += elem.textContent + "<br><br>";
            });
          } catch (error) {
            console.error(error);
          }
          try {
            result.journal =
              responseDoc.getElementsByTagName("journal-title")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.year = responseDoc
              .getElementsByTagName("pub-date")[0]
              .getElementsByTagName("year")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.month = responseDoc
              .getElementsByTagName("pub-date")[0]
              .getElementsByTagName("month")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.abstract =
              responseDoc.getElementsByTagName("abstract")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          break;
        case "pubmed":
          try {
            result.title =
              responseDoc.getElementsByTagName("ArticleTitle")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            const authors = responseDoc.querySelectorAll("Author");
            authors.forEach(function (elem) {
              result.authors +=
                elem.querySelector("LastName").textContent +
                " " +
                elem.querySelector("ForeName").textContent +
                ",";
            });
          } catch (error) {
            console.error(error);
          }
          try {
            result.affiliation =
              responseDoc.getElementsByTagName("Affiliation")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.journal =
              responseDoc.getElementsByTagName("Title")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.year = responseDoc
              .getElementsByTagName("PubMedPubDate")[0]
              .getElementsByTagName("Year")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.month = responseDoc
              .getElementsByTagName("PubMedPubDate")[0]
              .getElementsByTagName("Month")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.abstract =
              responseDoc.getElementsByTagName("Abstract")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          break;
      }
      return Promise.resolve(result);
    });
  });
}

function scrape(searchbar) {
  const url = "https://cors-anywhere.herokuapp.com/" + searchbar;
  let db = getDB(searchbar);

  fetch(url)
    .then(function (response) {
      // The API call was successful!
      return response.text();
    })
    .then(function (html) {
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var responseDoc = parser.parseFromString(html, "text/html");
      // Manipulate DOM Objects

      let result = {};
      switch (db) {
        case "pmc":
          try {
            result.title = responseDoc.querySelectorAll(
              'h1[class="content-title"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.authors = responseDoc.querySelectorAll(
              '[class="contrib-group fm-author"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            const temp = responseDoc.querySelectorAll('[class="fm-affl"]');
            temp.forEach(function (elem) {
              result.affiliation += elem.textContent + "<br><br>";
            });
          } catch (error) {
            console.error(error);
          }
          try {
            result.journal = responseDoc.querySelectorAll(
              'li[class="archive"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.year = responseDoc.querySelectorAll(
              'li[class="issue-page"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }

          try {
            result.abstract =
              responseDoc.querySelectorAll('[class="tsec sec"]')[0].textContent;
          } catch (error) {
            console.error(error);
          }
          break;

        case "pubmed":
          try {
            result.title = responseDoc.querySelectorAll(
              '[class="heading-title"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.authors = responseDoc.querySelectorAll(
              '[class="authors-list"]'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.affiliation = responseDoc.querySelectorAll(
              '[class="affiliations"] ul'
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          try {
            result.journal = responseDoc.querySelectorAll(
              "#full-view-journal-trigger"
            )[0].textContent;
          } catch (error) {
            console.error(error);
          }
          /*
                        try {
                           result.year = responseDoc.querySelectorAll('span[class="cit"]')[0].textContent;
                        } catch (error) {
                          console.error(error);
                        }
                        */
          try {
            let yearTry =
              responseDoc.querySelectorAll('span[class="cit"]')[0].textContent;
            result.year = yearTry.split(" ")[0];
          } catch (error) {
            console.error(error);
          }

          try {
            let monthTry =
              responseDoc.querySelectorAll('span[class="cit"]')[0].textContent;
            result.month = monthTry.split(" ")[1];
          } catch (error) {
            console.error(error);
          }

          try {
            result.abstract =
              responseDoc.querySelectorAll("#enc-abstract")[0].textContent;
          } catch (error) {
            console.error(error);
          }
          break;
      }
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}

function generateJSON(result) {
  let json_title = result.title;
  let json_affiliation = result.affiliation;
  let json_authors = result.authors;
  let json_year = result.year;
  let json_month = result.month;
  let json_abstract = result.abstract;
  let json_journal = result.journal;

  const obj = {
    title: json_title.replace('"', "'"),
    authors: json_authors.replace('"', "'"),
    affiliation: json_affiliation.replace('"', "'"),
    journal: json_journal.replace('"', "'"),
    publication_year: json_year.replace('"', "'"),
    publication_month: json_month.replace('"', "'"),
    abstract: json_abstract.replace('"', "'"),
  };

  var json_output = JSON.stringify(obj, null, 2); // TypeError: Converting circular structure to JSON

  // Start file download.
  download("article_" + Date.now() + ".json", json_output);
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function fetchData(url) {
  const result = await api(url);
  return result;
}
export { copyToClipboard, api, scrape, generateJSON, fetchData };
