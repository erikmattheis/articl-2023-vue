<template>
  <h2>Notes</h2>
  notes.length: {{ notes.length }}
</template>

<script>

export default {
  name: "TabNotes",
  props: {
    items: {
      default: () => { return []; },
      type: Array,
    },
  },
  data() {

    return {
      notes: [],
    };

  },
  mounted() {

    this.notes = this.items;

  },
};

</script>
