import store from "@/store";

const setTitleAndDescription = function (obj) {
  Object.assign({ title: "", description: "" }, obj);
  store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
    documentTitle: obj.title,
    metaDescription: obj.description,
  });
};

export { setTitleAndDescription };
