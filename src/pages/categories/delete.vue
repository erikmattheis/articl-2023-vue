<template>
  <article>
    <h1>Delete Category</h1>

    <p>Really delete "{{ title }}"? This will remove {{ categories.length }} descendent categories from category
      navigation.</p>

    <form>
      <button :aria-busy="buttonDisabled"
        @click.prevent="$router.push({ name: 'TabCategories', params: { slug } })">Cancel</button>
      <button
        v-if="slug"
        :aria-busy="buttonDisabled"
        @click.prevent="deleteCategory()">
        Delete
      </button>
    </form>
  </article>
</template>

<script>
import axiosInstance from "@/services/axiosService";

export default {
  name: "DeleteCategory",
  components: {
  },
  params: {
    slug: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    buttonDisabled: false,
    categories: [],
    title: "",
    slug: "",
    parentSlug: "",
    id: "",
  }),
  async mounted() {
    this.id = this.$route.params.id;
    await this.getCurrentCategory(this.id);
    this.setTitleAndDescriptionMixin({ title: "Delete Category and Descendents" });
  },
  methods: {
    async getCurrentCategory(id) {
      try {
        this.isLoading = true;

        const result = await this.getCategory(id);
        Object.assign(this, result.data);
        this.title = result.data?.category[0]?.title;
        this.parentSlug = result.data?.category[0]?.parentSlug;
        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },
    async getCategory(id) {
      return axiosInstance({
        method: "GET",
        url: `/categories/${id}`,
      });
    },
    async deleteCategory() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$store.dispatch("modals/setSuccessTitle", "Deletion successful.");

        this.$store.dispatch(
          "modals/setSuccessMessage",
          `The category "${this.title}" has been permanently deleted.`,
        );
        if (Number(this.parentSlug) === 0) {
          this.$router.push({ name: "HomePage" });
        } else {
          this.$router.push({ name: "CategoryPage", params: { slug: this.parentSlug } });
        }
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    async submitDelete(id) {
      return axiosInstance({
        method: "DELETE",
        url: "/categories",
        data: {
          id,
        },
      });
    },
  },
};
</script>
