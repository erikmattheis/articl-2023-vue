<template>
  <div>
    <!-- optional indicators -->
    <i class="fa fa-spinner fa-spin" v-if="loading"></i>
    <template v-else>
      <i class="fa fa-search" v-show="isEmpty"></i>
      <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
    </template>
    <!-- the input field -->
    <input
      type="text"
      autocomplete="off"
      v-model="queryString"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.enter="hit"
      @keydown.esc="reset"
      @blur="reset"
      @input="update"
      :id="query"
      :name="query"
      ref="input"
    />
    <!-- the list -->
    <ul v-show="hasItems">
      <!-- for vue@1.0 use: ($item, item) -->
      <li
        v-for="(item, $item) in items"
        :class="activeClass($item)"
        @mousedown="hit"
        @mousemove="setActive($item)"
        v-bind:key="item.id"
      >
        <span v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["src", "query"],
  data() {
    return {
      items: [],
      current: -1,
      loading: false,
      selectFirst: true,
      queryParamName: "q",
      queryString: "",
    };
  },
  mounted() {
    this.$refs.input.addEventListener(
      "blur",
      () => {
        // it will work now
      },
      true
    );
  },
  computed: {
    hasItems() {
      return this.items.length > 0;
    },

    isEmpty() {
      return !this.queryString;
    },

    isDirty() {
      return !!this.queryString;
    },
  },
  watch: {
    query() {
      this.queryString = this.query;
    },
  },
  methods: {
    async update() {
      this.cancel();

      if (!this.queryString) {
        return this.reset();
      }

      this.loading = true;

      this.fetchData().then((response) => {
        if (response && this.queryString) {
          let data = response.data;
          this.items = data.slice(0, 7);
          this.current = -1;
          this.loading = false;

          if (this.selectFirst) {
            this.down();
          }
        }
      });
    },

    async fetchData() {
      const src = this.queryParamName ? this.src : this.src + this.queryString;

      const params = this.queryParamName
        ? Object.assign({ [this.queryParamName]: this.queryString }, this.data)
        : this.data;

      let cancel = new Promise((resolve) => (this.cancel = resolve));
      let request = this.$http.get(src, { params });

      return Promise.race([cancel, request]);
    },

    cancel() {
      // used to 'cancel' previous searches
    },

    reset() {
      this.items = [];
      //this.queryString = "";
      this.loading = false;
      this.$emit("updateValue", this.queryString);
    },

    setActive(index) {
      this.current = index;
    },

    activeClass(index) {
      return {
        active: this.current === index,
      };
    },

    hit() {
      if (this.current !== -1) {
        this.onHit(this.items[this.current]);
      }
    },

    up() {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === -1) {
        this.current = this.items.length - 1;
      } else {
        this.current = -1;
      }
    },

    down() {
      if (this.current < this.items.length - 1) {
        this.current++;
      } else {
        this.current = -1;
      }
    },

    onHit(e) {
      this.queryString = e.title;
      //this.$emit("updateValue", e.title);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 0.2rem 0.5rem;
}
.active {
  background-color: #1095c1;
}
</style>
