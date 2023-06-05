import store from "@/store";

const setTitle = (titleHtml) => {
  document.title = titleHtml;
};
const setMetaDescription = (metaDescription) => {
  let meta = document.querySelector("meta[name=\"description\"]");

  if (!meta) {
    meta = document.createElement("meta");

    meta.name = "description";

    document
      .getElementsByTagName("head")[0]
      .appendChild(meta)
      .setAttribute("content", metaDescription);
  } else {
    meta.content = metaDescription;
  }
};
const setTitleAndDescription = (category) => {
  try {
    setTitle(category.titleHtml);

    setMetaDescription(category.description);
  
    store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
      titleHtml: category.titleHtml,
      description: category.description,
    });
  }
  catch (error) {
    console.log(error);
  }

};

export {
  setMetaDescription, setTitle, setTitleAndDescription,
};
