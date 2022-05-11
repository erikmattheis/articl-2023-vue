<template>
  <div>
    <input
      type="text"
      autocomplete="off"
      v-model="stringValue"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.enter="hit"
      @keydown.esc="reset"
      @blur="reset"
      @keyup="update"
      ref="input"
    />
    <!-- the list -->
    <ul v-show="hasItems">
      <!-- for vue@1.0 use: ($item, item) -->
      <li
        v-for="(item, $index) in items"
        :class="activeClass($index)"
        @mousedown="hit"
        @mousemove="setActive($index)"
        v-bind:key="$index"
      >
        <span v-text="item"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import { debounce } from "lodash";
export default {
  props: ["src", "query", "inputValue"],
  data() {
    return {
      items: [],
      current: -1,
      loading: false,
      selectFirst: true,
      stringValue: "",
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
    this.setActive = debounce(this.setActive, 10);
    this.up = debounce(this.up, 200);
    this.update = debounce(this.update, 200);
    this.down = debounce(this.down, 200);
    this.stringValue = this.inputValue;
  },
  computed: {
    hasItems() {
      return this.items.length > 0;
    },

    isEmpty() {
      return !this.stringValue;
    },

    isDirty() {
      return !!this.stringValue;
    },
  },
  methods: {
    async update() {
      this.cancel();

      if (!this.stringValue) {
        return this.reset();
      }
      this.loading = true;
      this.hit();
      this.$emit("typeaheadUpdated", {
        field: this.query,
        value: this.stringValue,
      });
      this.fetchData().then((response) => {
        let data = response.data;
        this.items = data.slice(0, 7);
        this.current = -1;
        this.loading = false;
        this.hit();
      });
    },

    async fetchData() {
      const params = { q: this.stringValue };

      let cancel = new Promise((resolve) => (this.cancel = resolve));
      let request = this.$http.get(this.src, { params });

      return Promise.race([cancel, request]);
    },

    cancel() {
      // used to cancel after request made
    },

    reset() {
      this.items = [];
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
      if (this.current !== -1 && this.items && this.items[this.current]) {
        console.log("this.items[this.current]", this.items[this.current]);
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

    onHit(val) {
      this.stringValue = val;
      this.$emit("typeaheadUpdated", { field: this.query, value: val });
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
