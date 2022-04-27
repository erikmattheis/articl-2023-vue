<template>
  <ul class="pagination">
    <li class="pagination-item">
      <a
        href="#"
        @click.prevent="onClickFirstPage"
        :class="isInFirstPage ? 'disabled' : ''"
        >First</a
      >
    </li>
    <li class="pagination-item">
      <a
        href="#"
        @click.prevent="onClickPreviousPage"
        :class="isInFirstPage ? 'disabled' : ''"
        >«</a
      >
    </li>
    <li :key="page.id" v-for="page in pages" class="pagination-item">
      <a
        href="#"
        @click.prevent="onClickPage(page.name)"
        :class="{ active: isPageActive(page.name) }"
        >{{ page.name }}</a
      >
    </li>
    <li class="pagination-item">
      <a
        href="#"
        @click.prevent="onClickNextPage"
        :class="isInLastPage ? 'disabled' : ''"
        >»</a
      >
    </li>
    <li class="pagination-item">
      <a
        href="#"
        @click.prevent="onClickLastPage"
        :class="isInLastPage ? 'disabled' : ''"
        >Last</a
      >
    </li>
  </ul>
</template>


<script>
export default {
  name: "ThePagination",
  props: {
    numberOfButtons: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      if (this.totalPages === 0) {
        return true;
      }
      return this.currentPage === this.totalPages;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.totalPages < this.numberOfButtons) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.numberOfButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      if (this.totalPages === 0) {
        return 1;
      }
      if (this.totalPages < this.numberOfButtons) {
        return this.totalPages;
      }
      return Math.min(
        this.startPage + this.numberOfButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  methods: {
    onClickFirstPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  float: right;
  margin: 1rem 0;
  .pagination-item {
    display: inline-block;
    color: #ddd;
    a {
      text-decoration: none;
      margin: 0.5rem;
    }
    a.disabled {
      color: #ccc;
      cursor: default;
    }
    .active {
      background-color: --primary;
      color: #ffffff !important;
      font-weight: bold;
      padding: 3px 8px;
    }
  }
}
</style>