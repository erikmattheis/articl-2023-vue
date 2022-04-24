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
      placeholder="..."
      autocomplete="off"
      v-model="query"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.enter="hit"
      @keydown.esc="reset"
      @blur="reset"
      @input="update"
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
  props: ["src"],
  data() {
    return {
      items: [],
      query: "",
      current: -1,
      loading: false,
      selectFirst: false,
      queryParamName: "q",
    };
  },

  computed: {
    hasItems() {
      return this.items.length > 0;
    },

    isEmpty() {
      return !this.query;
    },

    isDirty() {
      return !!this.query;
    },
  },

  methods: {
    async update() {
      this.cancel();

      if (!this.query) {
        return this.reset();
      }

      if (this.minChars && this.query.length < this.minChars) {
        return;
      }

      this.loading = true;

      this.fetchData().then((response) => {
        if (response && this.query) {
          let data = response.data;
          data = this.prepareResponseData
            ? this.prepareResponseData(data)
            : data;
          this.items = this.limit ? data.slice(0, this.limit) : data;
          this.current = -1;
          this.loading = false;

          if (this.selectFirst) {
            this.down();
          }
        }
      });
    },

    async fetchData() {
      if (!this.$http) {
        return console.log("You need to provide a HTTP client", this);
      }

      if (!this.src) {
        return console.log("You need to set the `src` property", this);
      }

      const src = this.queryParamName ? this.src : this.src + this.query;

      const params = this.queryParamName
        ? Object.assign({ [this.queryParamName]: this.query }, this.data)
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
      this.query = "";
      this.loading = false;
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
      console.log("onHit", e);
      this.$emit("update", e);
    },
  },
};
</script>
