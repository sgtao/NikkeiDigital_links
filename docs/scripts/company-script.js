'use strict';

// sets up the app logic, declares required variables, contains all the other functions
function initialize(companys) {
  // grab the UI elements that we need to manipulate
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');

  // keep a record of what the last category and search term entered were
  let lastCategory = category.value;
  // no search has been made yet
  let lastSearch = '';

  // these contain the results of filtering by category, and search term
  // finalGroup will contain the companys that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a company
  let categoryGroup;
  let finalGroup;

  // Set both to equal an empty array, in time for searches to be run
  categoryGroup = [];
  finalGroup = [];
  
  // To start with, set finalGroup to equal the entire companys database
  // then run updateDisplay(), so ALL companys are displayed initially.
  finalGroup = companys;
  // updateDisplay();
  // filter companies by category at initial
  filter_category(category.value);
  // Run selectcompanys() after the filtering has been done
  selectcompanys();


  // 
  // selectcompanys();
  
  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of companys we want to display
  // searchBtn.onclick = selectCategory;
  searchBtn.addEventListener('click', selectCategory);

  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    // Set these back to empty arrays, to clear out the previous search
    categoryGroup = [];
    finalGroup = [];

    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      console.log('change category');
      // update the record of last category and search term
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();
      // In this case we want to select all companys, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectcompanys()
      if (category.value === 'All') {
        categoryGroup = companys;
        selectcompanys();
        // If a specific category is chosen, we need to filter out the companys not in that
        // category, then put the remaining companys inside categoryGroup, before running
        // selectcompanys()
      } else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // // to lower case before we do a comparison
        // let lowerCaseType = category.value.toLowerCase();
        filter_category(category.value);
        // Run selectcompanys() after the filtering has been done
        selectcompanys();
      }
    }
  }

  function filter_category(category_name) {
    // filter by category 
    let category_value = category_name;
    if (category.value === 'All') {
        categoryGroup = companys;
    } else {
      for (let i = 0; i < companys.length; i++) {
        // If a company's type property is the same as the chosen category, we want to
        // display it, so we push it onto the categoryGroup array
        if (companys[i].category_with_code === category_value) {
          categoryGroup.push(companys[i]);
        }
      }
    }
  }
  // selectcompanys() Takes the group of companys selected by selectCategory(), and further
  // filters them by the tiered search term (if one has been entered)
  function selectcompanys() {
    // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
    // array — we don't want to filter the companys further — then run updateDisplay().
    if (searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      // Make sure the search term is converted to lower case before comparison. We've kept the
      // company names all lower case to keep things simple
      let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      // For each company in categoryGroup, see if the search term is contained inside the company name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the company
      // onto the finalGroup array
      for (let i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      // run updateDisplay() after this second round of filtering has been done
      updateDisplay();
    }

  }

  // start the process of updating the display with the new set of companys
  function updateDisplay() {
    // remove the previous contents of the <main> element
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // if no companys match the search term, display a "No results to display" message
    if (finalGroup.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
      // for each company we want to display, pass its company object to fetchBlob()
    } else {
      for (let i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  // fetchBlob uses fetch to retrieve the image for that company, and then sends the
  // resulting image display URL and company object on to showcompany() to finally
  // display it
  function fetchBlob(company) {
    // construct the URL path to the image file from the company.image property
    let url = company.url;
    // console.log(company);
    showcompany(url, company);
  }

  // Display a company inside the <main> element
  function showcompany(url, company) {
    // create <section>, <h2>, <p>, and <img> elements
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para_cate = document.createElement('p');
    const para_pref = document.createElement('p');
    const link = document.createElement('a');
    // const image = document.createElement('img');

    // give the <section> a classname equal to the company "type" property so it will display the correct icon
    section.setAttribute('class', 'company');

    // Give the <h2> textContent equal to the company "name" property, but with the first character
    // replaced with the uppercase version of the first character
    link.textContent = company.name.replace(company.name.charAt(0), company.name.charAt(0).toUpperCase());
    link.href = (company.company_url !== '--') ? company.company_url : "#";
    link.target = "_blank";
    heading.appendChild(link);

    // Give the <p> textContent equal to the company "category"
    para_cate.textContent = company.category;
    para_pref.textContent = '本社：' + company.head_prefecture;
    // append supplements of paragraph
    const para_suppliments = document.createElement('div');
    // -- need for refactering
    const para_company = document.createElement('a');
    para_company.textContent = "概要";
    para_company.href = "https://www.nikkei.com/nkd/company/gaiyo/?scode=" + company.code;
    para_company.target = "_blank";
    //
    const para_kessan = document.createElement('a');
    para_kessan.textContent = "業績";
    para_kessan.href = "https://www.nikkei.com/nkd/company/kessan/?scode=" + company.code;
    para_kessan.target = "_blank";
    // append news contents
    const para_news = document.createElement('a');
    para_news.textContent = "news";
    para_news.href = "https://www.nikkei.com/nkd/company/news/?scode=" + company.code;
    para_news.target = "_blank";
    // append links to nikkei contents
    para_suppliments.setAttribute('class', 'suppliments');
    para_suppliments.appendChild(para_company);
    para_suppliments.appendChild(para_news);
    para_suppliments.appendChild(para_kessan);
    // append website analysis contents
    if (company.company_url !== '--') {
      const para_siteana = document.createElement('a');
      para_siteana.textContent = "HP分析";
      para_siteana.href = (company.company_url !== '--') ? "https://omotenashi.site/company/" + company.code : "#";
      para_siteana.target = "_blank";
      para_suppliments.appendChild(para_siteana);
    }

    // // Set the src of the <img> element to the ObjectURL, and the alt to the company "name" property
    // image.src = objectURL;
    // image.alt = company.name;

    // append the elements to the DOM as appropriate, to add the company to the UI
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para_cate);
    section.appendChild(para_pref);
    section.appendChild(para_suppliments);
  }
}
