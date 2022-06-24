<template>
  <div>
    <draggable-items
      v-model="categories"
      tag="ul"
      item-key="id"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues"
    >
      <template #item="{ element }">
        <categories-list-item
          :category="element"
          class="list-item"
        />
      </template>
    </draggable-items>

    <router-view />
  </div>
</template>

<script>
import DraggableItems from "vuedraggable";
import { mapGetters } from "vuex";

import CategoriesListItem from "@/components/layout/CategoriesListItem.vue";

export default {
  name: "TabCategories",
  components: {
    DraggableItems,
    CategoriesListItem,
  },
  data() {

    return {

    };

  },

  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
      categories: "categoryPages/categories",
    }),
  },
  beforeMount() {

    console.log("tab component mounted");

  },
  methods: {
    updateOrderValues() {

      try {

        this.categories.forEach((obj, index) => {

          const objRef = obj;

          objRef.order = index;

        });

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveOrderValues() {

      try {

        const order = this.categories.map((obj) => {

          return {
            id: obj.id,
            order: obj.order,
          };

        });

        await this.saveOrder(order);

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveOrder(order) {

      this.isLoading = true;

      const result = await this.$http({
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
  width:100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap
}

a {
  cursor: pointer;
}
</style>
