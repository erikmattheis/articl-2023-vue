<template>
  <div>
    <draggable-items
      v-model="categoriesLocal"
      tag="ul"
      item-key="id"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues">
      <template #item="{ element }">
        <categories-list-item
          :category="element"
          class="list-item"
          :tree-level="treeLevel"
          :tab-name="TabName" />
      </template>
    </draggable-items>

  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { mapGetters } from "vuex";
import axiosInstance from "@/services/axiosService";

import CategoriesListItem from "@/components/layout/CategoriesListItem.vue";

export default {
  name: "TabCategories",
  components: {
    DraggableItems: VueDraggableNext,
    CategoriesListItem,
  },
  data() {
    return {
      TabName: "",
    };
  },
  computed: {
    categoriesLocal: {
      get() {
        return this.categories.map((a) => a);
      },
      set(newValue) {
        this.$store.dispatch("resources/categories", newValue);
      },
    },
    ...mapGetters({
      categories: "resources/categories",
      treeLevel: "resources/treeLevel",
    }),
  },
  mounted() {
    this.TabName = this.treeLevel > 3 ? "ArticlsList" : "TabCategories";
  },
  methods: {
    updateOrderValues() {
      try {
        this.categories.forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
        this.$store.dispatch("resources/categories", this.categories);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveOrderValues() {
      try {
        const order = this.categories.map((obj) => ({
          id: obj.id,
          order: obj.order,
        }));

        await this.saveOrder(order);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveOrder(order) {
      this.isLoading = true;

      const result = await axiosInstance({
        method: "POST",
        url: "/categories/order",
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;
    },

    onUpdateOrderValues() {
      this.updateOrderValues();

      this.saveOrderValues();
    },

  },
};

</script>

<style scoped>
li {
  overflow-x: hidden;
}

a {
  cursor: pointer;
}
</style>
